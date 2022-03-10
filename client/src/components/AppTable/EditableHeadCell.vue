<template>
  <td class="cell" @dblclick.stop="openForm">
    <span v-if="!isEditVisible"> {{ value }} </span>
    <form v-else @submit.prevent="submitHandler">
      <input v-model="newValue" type="text" @blur="submitHandler" />
      <button>Save</button>
      <button type="button" @click="removeCol">Remove</button>
    </form>
  </td>
</template>

<script>
export default {
  props: {
    row: Number,
    col: Number,
    value: null,
  },
  data() {
    return {
      isEditVisible: false,
      newValue: '',
    }
  },
  methods: {
    openForm() {
      this.newValue = this.value
      this.isEditVisible = true
    },
    submitHandler() {
      this.isEditVisible = false
      this.$emit('change', this.row, this.col, this.newValue)
    },
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
</style>
