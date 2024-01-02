<template>
  <hash-function-form title="Sha256" :decode="sha256" />
</template>

<script lang="ts" setup>
import { HashFunctionForm } from '@/forms'
import { sha256 } from '@/helpers'
</script>
