<template>
  <td class="cell">
    <input v-model.lazy="newValue" ref="input" type="text" />
  </td>
</template>

<script>
import tableCell from '@/mixins/tablecell'

export default {
  mixins: [tableCell],
}
</script>

<style lang="scss" scoped>
.cell {
  text-align: left;
  border: 1px solid black;
  padding: 10px;
}
</style>
