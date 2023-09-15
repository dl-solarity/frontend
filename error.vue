<script lang="ts" setup>
import { navigateTo } from '#imports'
import { ROUTE_PATH } from '@/constants'
navigateTo(ROUTE_PATH.app, { redirectCode: 301 })
</script>
