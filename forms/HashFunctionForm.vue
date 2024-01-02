<template>
  <form class="hash-function-form">
    <div class="hash-function-form__input">
      <div class="hash-function-form__title-wrp">
        <h3 class="hash-function-form__title">
          {{ $t('hash-function-form.input-title', { type: title }) }}
        </h3>
        <radio-button-field
          v-model="form.type"
          class="hash-function-form__radio-button-field"
          :options="decodeOptions"
        />
      </div>
      <textarea-field
        v-model="form.text"
        :label="$t('hash-function-form.text-title')"
        :error-message="getFieldErrorMessage('text')"
        @blur="touchField('text')"
      />
    </div>
    <div class="hash-function-form__divider" />
    <div class="hash-function-form__output">
      <h3>{{ $t('hash-function-form.output-title') }}</h3>
      <div>
        <p class="hash-function-form__output-item-label">
          {{ $t('hash-function-form.decoded-hash-label') }}
        </p>
        <app-copy :value="decodedHash">
          <p class="hash-function-form__output-item-value">
            {{ decodedHash || '-' }}
          </p>
        </app-copy>
      </div>
    </div>
    <div class="hash-function-form__share-btn-wrp">
      <app-button
        modification="text"
        :text="
          !isUrlCopied
            ? $t('hash-function-form.share-btn')
            : $t('hash-function-form.share-btn--copied')
        "
        :icon-right="isUrlCopied ? $icons.checkDouble : ''"
        @click="onShareBtnClick"
      />
    </div>
    <div v-if="isInitializing" class="hash-function-form__loader-wrp">
      <app-loader />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useRouter } from '#app'
import { AppButton, AppCopy, AppLoader } from '#components'
import { useFormValidation } from '@/composables'
import { COPIED_DURING_MS } from '@/constants'
import { runtimeErrors } from '@/errors'
import { RadioButtonField, TextareaField } from '@/fields'
import {
  copyToClipboard,
  ErrorHandler,
  hexadecimal,
  required,
  sleep,
} from '@/helpers'
import { linkShortener } from '@/services'
import { type DecodeType, type FieldOption, type HashFunction } from '@/types'
import { onMounted, reactive, ref, watch } from 'vue'
import { i18n } from '~/plugins/localization'

const props = defineProps<{
  title: string
  decode: HashFunction
}>()

const { t } = i18n.global

const decodeOptions = computed<FieldOption[]>(() => [
  { title: t('hash-function-form.select-option-text'), value: 'text' },
  { title: t('hash-function-form.select-option-hex'), value: 'hex' },
])

const form = reactive({
  type: decodeOptions.value[0].value as DecodeType,
  text: '',
})
const rules = computed(() => ({
  type: { required },
  text: {
    ...(form.type === 'hex' && { required, hexadecimal }),
  },
}))

const routePathOfHashTool = computed<string>(() => {
  if (!router.currentRoute.value.name) return ''

  const { path } = router.resolve({
    name: router.currentRoute.value.name,
  })

  return path
})

const { isFormValid, getFieldErrorMessage, touchField } = useFormValidation(
  form,
  rules,
)

const decodedHash = ref(props.decode(form.text, form.type))

const router = useRouter()
const isUrlCopied = ref(false)

const onShareBtnClick = async (): Promise<void> => {
  try {
    const { id } = await linkShortener.createLink(
      {
        type: form.type,
        text: form.text,
      },
      routePathOfHashTool.value,
    )

    history.replaceState(null, '', `${routePathOfHashTool.value}/${id}`)

    await copyToClipboard(window.location.href)
    isUrlCopied.value = true
    await sleep(COPIED_DURING_MS)
    isUrlCopied.value = false
  } catch (error) {
    ErrorHandler.process(error)
  }
}

watch(form, () => {
  if (!isFormValid()) {
    decodedHash.value = ''
    return
  }

  try {
    decodedHash.value = props.decode(form.text, form.type)
  } catch (error) {
    decodedHash.value = ''
    ErrorHandler.process(error)
  }
})

const isInitializing = ref(Boolean(router.currentRoute.value.params.id))
const init = async (): Promise<void> => {
  isInitializing.value = true

  try {
    const { id } = router.currentRoute.value.params
    if (id && typeof id === 'string') {
      const { attributes } = await linkShortener.getDataByLink(id)

      if (attributes.path !== routePathOfHashTool.value)
        throw new runtimeErrors.IncompatibleDataReceivedError()

      Object.assign(form, {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        type: attributes.value?.type,
        // @ts-ignore
        text: attributes.value?.text,
        /* eslint-enable @typescript-eslint/ban-ts-comment */
      })
    }
  } catch (error) {
    ErrorHandler.process(error)
    await router.replace(routePathOfHashTool.value)
  } finally {
    isInitializing.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.hash-function-form {
  @include solidity-tools-form;
}

.hash-function-form__output,
.hash-function-form__input {
  @include solidity-tools-form-part;
}

.hash-function-form__divider {
  @include solidity-tools-form-divider;
}

.hash-function-form__title-wrp {
  display: flex;
  align-items: baseline;
  gap: inherit;
  flex-wrap: wrap;
}

.hash-function-form__title {
  margin-right: auto;
  min-width: max-content;
}

.hash-function-form .hash-function-form__radio-button-field {
  @include respond-to(small) {
    width: 100%;
  }
}

.hash-function-form__output-item-label {
  @include field-label;
}

.hash-function-form__output-item-value {
  @include text-ellipsis;
}

.hash-function-form__share-btn-wrp {
  @include solidity-tools-form-share-btn-wrp;
}

.hash-function-form__loader-wrp {
  @include solidity-tools-page-content-loader-wrp;
}
</style>
