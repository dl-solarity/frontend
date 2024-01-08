<template>
  <hash-function-form title="Ripemd160" :decode="ripemd160" />
</template>

<script lang="ts" setup>
import { HashFunctionForm } from '@/forms'
import { ripemd160 } from '@/helpers'
</script>
