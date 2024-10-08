<template>
  <form class="poseidon-form">
    <div class="poseidon-form__input">
      <div class="poseidon-form__title-wrp">
        <h3 class="poseidon-form__title">
          {{ $t('poseidon-form.input-title') }}
        </h3>
      </div>
      <div v-for="(arg, idx) in form.fields" :key="arg.id">
        <div class="poseidon-form__input-wrp">
          <app-button
            class="poseidon-form__arg-add-btn"
            scheme="none"
            modification="none"
            color="none"
            :disabled="isAddButtonDisabled"
            :icon-left="$icons.plus"
            @click="addArg(idx)"
          />
          <input-field
            v-model="arg.value"
            :label="$t('poseidon-form.arg-label', { idx: idx + 1 })"
            :placeholder="$t('poseidon-form.arg-placeholder')"
            :error-message="getFieldErrorMessage(`fields[${idx}].value`)"
            @blur="touchField(`fields[${idx}].value`)"
          >
            <template #nodeRight>
              <button
                v-if="form.fields.length > 1"
                class="poseidon-form__field-btn"
                @click="removeArg(arg.id)"
              >
                <app-icon
                  :class="[
                    'poseidon-form__field-btn-icon',
                    'poseidon-form__field-btn-icon--x-mark',
                  ]"
                  :name="$icons.x"
                />
              </button>
            </template>
          </input-field>
        </div>
      </div>

      <app-button
        scheme="none"
        :disabled="isAddButtonDisabled"
        :text="
          isAddButtonDisabled
            ? $t('poseidon-form.add-arg-btn--max')
            : $t('poseidon-form.add-arg-btn')
        "
        :icon-left="$icons.plus"
        @click="addArg(form.fields.length)"
      />
    </div>
    <div class="poseidon-form__divider" />
    <div class="poseidon-form__output">
      <h3>{{ $t('poseidon-form.output-title') }}</h3>
      <div>
        <p class="poseidon-form__output-item-label">
          {{ $t('poseidon-form.hash-label') }}
        </p>
        <app-copy :value="result">
          <p class="poseidon-form__output-item-value">
            {{ result || '–' }}
          </p>
        </app-copy>
      </div>
    </div>
    <div class="poseidon-form__share-btn-wrp">
      <app-button
        modification="text"
        :text="
          isUrlCopied
            ? $t('poseidon-form.share-btn--copied')
            : $t('poseidon-form.share-btn')
        "
        :icon-right="isUrlCopied ? $icons.checkDouble : ''"
        @click="onShareBtnClick"
      />
    </div>
    <div v-if="isInitializing" class="poseidon-form__loader-wrp">
      <app-loader />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { InputField } from '@/fields'
import { Poseidon, useNotifications } from '@/composables'
import { i18n } from '~/plugins/localization'
import { useFormValidation } from '@/composables'
import {
  required,
  ErrorHandler,
  isNumericOrHexadecimal,
  copyToClipboard,
  maxBn128Value,
  sleep,
} from '@/helpers'
import { hexlify } from 'ethers'
import { ROUTE_NAMES } from '@/enums'
import { linkShortener } from '@/services'
import { COPIED_DURING_MS } from '@/constants'
import { runtimeErrors } from '@/errors'
import { usePoseidon } from '@/composables'

const { showToast } = useNotifications()
const { t } = i18n.global

type FormField = {
  id: string
  value: string
  label: string
}

const poseidonHash = ref<Poseidon>()
const isInitializing = ref(true)
const isUrlCopied = ref(false)

onBeforeMount(() => {
  init()
})

const MAX_FIELDS_QUANTITY = 6

const form = reactive({
  fields: [
    {
      label: '',
      value: '',
      id: uuidv4(),
    },
  ] as FormField[],
})

const result = ref('')

const rules = computed(() => ({
  fields: Array(form.fields.length).fill({
    value: { required, isNumericOrHexadecimal, maxBn128Value },
  }),
}))

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  rules,
)

const router = useRouter()

const routePathOfEncoder = computed<string>(() => {
  const { path } = router.resolve({
    name: ROUTE_NAMES.hashFunctionPoseidon6Id,
  })

  return path
})

const isAddButtonDisabled = computed(
  () => form.fields.length === MAX_FIELDS_QUANTITY,
)

const onShareBtnClick = async (): Promise<void> => {
  try {
    const { id } = await linkShortener.createLink(
      {
        args: form.fields,
      },
      routePathOfEncoder.value,
    )

    history.replaceState(null, '', `${routePathOfEncoder.value}/${id}`)

    await copyToClipboard(window.location.href)
    isUrlCopied.value = true
    await sleep(COPIED_DURING_MS)
    isUrlCopied.value = false
  } catch (error) {
    ErrorHandler.process(error)
  }
}

const addArg = (idxTo: number) => {
  if (idxTo > MAX_FIELDS_QUANTITY - 1) {
    showToast(
      'error',
      t('poseidon-form.cannot-hash-more', { max: MAX_FIELDS_QUANTITY }),
    )
    return
  }
  form.fields.splice(idxTo, 0, { id: uuidv4(), value: '', label: '' })
  touchField(`fields[${idxTo}].value`)
}

const removeArg = (id: FormField['id']) => {
  form.fields = form.fields.filter(field => field.id !== id)
}

const init = async (): Promise<void> => {
  isInitializing.value = true

  if (!poseidonHash.value) {
    poseidonHash.value = await usePoseidon()
  }

  try {
    const id = router.currentRoute.value.params.id
    if (id && typeof id === 'string') {
      const { attributes } = await linkShortener.getDataByLink(id)

      if (attributes.path !== routePathOfEncoder.value)
        throw new runtimeErrors.IncompatibleDataReceivedError()

      Object.assign(form, {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        fields: attributes.value?.args,
      })
    }
  } catch (error) {
    ErrorHandler.process(error)
    await router.replace({ name: ROUTE_NAMES.hashFunctionPoseidon6Id })
  } finally {
    isInitializing.value = false
  }
}

watch(form, async () => {
  if (!isFormValid() || !poseidonHash.value) {
    result.value = ''
    return
  }

  const inputs = form.fields.reduce((accumulator, currentValue) => {
    accumulator.push(BigInt(currentValue.value))
    return accumulator
  }, [] as bigint[])

  result.value = hexlify(poseidonHash.value(inputs))
})
</script>

<style lang="scss" scoped>
.poseidon-form {
  @include solidity-tools-form;
}

.poseidon-form__output,
.poseidon-form__input {
  @include solidity-tools-form-part;
}

.poseidon-form__input-wrp {
  display: flex;
  gap: toRem(16);
  width: 100%;

  @include respond-to(small) {
    gap: toRem(8);
  }
}

.poseidon-form .poseidon-form__arg-add-btn {
  margin-top: calc(
    var(--field-label-line-height) + var(--field-label-margin-bottom)
  );
  height: toRem(48);
  width: toRem(48);
  background: var(--field-bg-primary);
  border: toRem(1) solid var(--field-border);
  border-radius: var(--field-border-radius);
  color: var(--primary-main);

  &:not([disabled]):hover {
    background: var(--field-bg-primary);
    border: toRem(1) solid var(--field-border-hover);
    color: var(--primary-main);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    background: var(--field-bg-primary);
    border: toRem(1) solid var(--field-border-focus);
    color: var(--primary-main);
  }
}

.poseidon-form__field-btn {
  color: var(--field-placeholder);
  transition: color var(--transition-duration-fast)
    var(--transition-timing-default);

  &:disabled {
    color: var(--disable-primary-main);
  }

  &:not([disabled]):hover {
    color: var(--primary-light);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    color: var(--primary-main);
  }
}

.poseidon-form .poseidon-form__field-btn-icon {
  height: toRem(24);
  width: toRem(24);
  margin-right: toRem(-1);

  &--x-mark {
    margin-right: toRem(-5);
  }
}

.poseidon-form__divider {
  @include solidity-tools-form-divider;
}

.poseidon-form__title-wrp {
  display: flex;
  align-items: baseline;
  gap: inherit;
  flex-wrap: wrap;
}

.poseidon-form__title {
  margin-right: auto;
  min-width: max-content;
}

.poseidon-form__output-item-label {
  @include field-label;
}

.poseidon-form__output-item-value {
  @include text-ellipsis;
}

.poseidon-form__share-btn-wrp {
  @include solidity-tools-form-share-btn-wrp;
}

.poseidon-form__loader-wrp {
  @include solidity-tools-page-content-loader-wrp;
}
</style>
