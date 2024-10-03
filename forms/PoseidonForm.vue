<template>
  <form class="poseidon-form">
    <div class="poseidon-form__input">
      <div class="poseidon-form__title-wrp">
        <h3 class="poseidon-form__title">
          {{ $t('poseidon-form.input-title') }}
        </h3>
        <!-- <textarea-field
        v-model="form.text"
        :label="$t('poseidon-form.text-title')"
        :error-message="getFieldErrorMessage('text')"
        @blur="touchField('text')"
      /> -->
      </div>
      <div v-for="(arg, idx) in form.args" :key="arg.id">
        <input-field
          v-model="arg.value"
          type="number"
          :label="$t('poseidon-form.arg-label', { idx: idx + 1 })"
          :placeholder="$t('poseidon-form.arg-placeholder')"
          :error-message="getFieldErrorMessage(`args[${idx}].value`)"
          @blur="touchField(`args[${idx}].value`)"
        >
          <template #nodeRight>
            <button
              v-if="form.args.length > 1"
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

      <app-button
        scheme="none"
        :text="$t('poseidon-form.add-arg-btn')"
        :icon-left="$icons.plus"
        @click="addArg(form.args.length)"
      />
    </div>
    <div class="poseidon-form__divider" />
    <div class="poseidon-form__output">
      <h3>{{ $t('poseidon-form.output-title') }}</h3>
      <div>
        <p class="poseidon-form__output-item-label">
          {{ $t('poseidon-form.decoded-hash-label') }}
        </p>
        <app-copy :value="result">
          <p class="poseidon-form__output-item-value">
            {{ result || '–' }}
          </p>
        </app-copy>
      </div>
    </div>
    <!-- <div class="poseidon-form__share-btn-wrp">
      <app-button
        modification="text"
        :text="
          !isUrlCopied
            ? $t('poseidon-form.share-btn')
            : $t('poseidon-form.share-btn--copied')
        "
        :icon-right="isUrlCopied ? $icons.checkDouble : ''"
        @click="onShareBtnClick"
      />
    </div> -->
    <!-- <div v-if="isInitializing" class="poseidon-form__loader-wrp">
      <app-loader />
    </div> -->
  </form>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { InputField } from '@/fields'
import { useNotifications } from '@/composables'
import { i18n } from '~/plugins/localization'
import { buildPoseidonOpt } from 'circomlibjs'
// import { hexlify } from 'ethers'
import { useFormValidation } from '@/composables'
import { required, numeric } from '@/helpers'

const poseidonHash = await buildPoseidonOpt()

const { showToast } = useNotifications()
const { t } = i18n.global

type FuncArg = {
  id: string
  value: string
  label: string
}

const MAX_FIELDS_QUANTITY = 16

const form = reactive({
  args: [
    {
      label: '',
      value: '',
      id: uuidv4(),
    },
  ] as FuncArg[],
})

const result = ref('')

const rules = computed(() => ({
  args: Array(form.args.length).fill({ value: { required, numeric } }),
}))

const { getFieldErrorMessage, isFormValid, touchField } = useFormValidation(
  form,
  rules,
)

const addArg = (idxTo: number) => {
  if (idxTo > MAX_FIELDS_QUANTITY - 1) {
    showToast(
      'error',
      t('poseidon-form.cannot-hash-more', { max: MAX_FIELDS_QUANTITY }),
    )
    return
  }
  form.args.splice(idxTo, 0, { id: uuidv4(), value: '', label: '' })
  touchField(`args[${idxTo}].value`)
}

const removeArg = (id: FuncArg['id']) => {
  form.args = form.args.filter(arg => arg.id !== id)
}

watch(form, async () => {
  if (!isFormValid()) {
    result.value = ''
    return
  }

  const inputs = form.args.reduce((accumulator, currentValue) => {
    return [...accumulator, Number(currentValue.value)]
  }, [] as number[])

  // console.log(poseidonHash(inputs))
  result.value = Buffer.from(poseidonHash(inputs)).toString('hex')
})
</script>

<!-- TODO: recheck styles -->
<style lang="scss" scoped>
.poseidon-form {
  @include solidity-tools-form;
}

.poseidon-form__output,
.poseidon-form__input {
  @include solidity-tools-form-part;
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
