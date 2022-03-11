<template>
  <td class="cell">
    <input
      v-model.lazy="newValue"
      ref="input"
      type="text"
      class="input"
      @focus="isEditVisible = true"
      @blur="isEditVisible = false"
    />
    <button v-if="isEditVisible" class="button" @mousedown="removeCol">
      Remove
    </button>
  </td>
</template>

<script>
import tableCell from '@/mixins/tablecell'

export default {
  mixins: [tableCell],
  methods: {
    removeCol() {
      this.$store.commit('removeKey', this.col)
    },
  },
}
</script>

<style lang="scss" scoped>
.cell {
  text-align: left;
  border: 1px solid black;
  padding: 10px;
}

.input {
  color: #fff;
}

.button {
  width: 100%;
}
</style>
