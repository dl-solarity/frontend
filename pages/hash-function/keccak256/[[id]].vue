<template>
  <hash-function-form title="Keccak256" :decode="keccak256" />
</template>

<script lang="ts" setup>
import { HashFunctionForm } from '@/forms'
import { keccak256 } from '@/helpers'
</script>
