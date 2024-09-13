import { computed, UnwrapNestedRefs } from 'vue'
import useVuelidate, { ChildStateLeafs, ValidationArgs } from '@vuelidate/core'
import { get } from 'lodash-es'

export const useFormValidation = (
  state: UnwrapNestedRefs<ChildStateLeafs>,
  rules: ValidationArgs,
) => {
  const validationRules = ref(rules)

  const validationController = useVuelidate(validationRules, state)

  const isFieldsValid = computed(() => !validationController.value.$invalid)

  const isFormValid = (): boolean => {
    validationController.value.$touch()
    return !validationController.value.$invalid
  }

  const getFieldErrorMessage = (fieldPath: string): string => {
    let errorMessage = ''
    if (!validationController.value || !validationController.value.$invalid) {
      errorMessage = ''
    }

    const field = get(validationController.value, fieldPath)

    if (!field || !Object.keys(field).length) {
      throw new Error(
        `getFieldErrorMessage: Cannot find vuelidate field by '${fieldPath}'`,
      )
    }

    if (!field.$dirty) errorMessage = ''

    errorMessage = field.$errors.length
      ? (field.$errors[0].$message as string)
      : ''

    return errorMessage
  }

  const touchField = (fieldPath: string): void => {
    const field = get(validationController.value, fieldPath)
    if (field) {
      field.$touch()
    }
  }

  const resetForm = <T extends Record<string, unknown>>(form: T) => {
    const formKeys = Object.keys(form) as Array<keyof T>

    formKeys.forEach(key => {
      form[key] = '' as T[keyof T]
      const field = get(validationController.value, key)
      field.$reset()
    })
  }

  return {
    isFieldsValid,
    getFieldErrorMessage,
    touchField,
    isFormValid,
    resetForm,
  }
}
