<template>
  <table class="table">
    <thead class="table__head">
      <tr>
        <th class="table__cell table__cell--number">#</th>
        <editable-head-cell
          v-for="key in keys"
          :key="key.id"
          :col="key.id"
          :value="key.text"
          @change="changeHeadCellHandler"
        />
      </tr>
    </thead>

    <tbody>
      <tr v-for="(value, rowIndex) in values" :key="rowIndex">
        <td class="table__cell" @dblclick="removeRow(rowIndex)">
          {{ rowIndex + 1 }}
        </td>
        <editable-cell
          v-for="key in keys"
          :key="key.id"
          :row="rowIndex"
          :col="key.id"
          :value="values[rowIndex][key.id]"
          @change="changeCellHandler"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import EditableCell from './AppTable/EditableCell.vue'
import EditableHeadCell from './AppTable/EditableHeadCell.vue'

export default {
  components: {
    EditableCell,
    EditableHeadCell,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      selectedRow: null,
    }
  },
  computed: {
    keys() {
      return this.data.keys
    },
    values() {
      return this.data.values
    },
  },
  methods: {
    changeCellHandler(row, col, value) {
      if (!col) return
      this.$store.commit('updateValue', { row, col, value })
    },
    changeHeadCellHandler(_, col, value) {
      if (!col) return
      this.$store.commit('updateKey', { id: col, value })
    },
    removeRow(index) {
      this.$store.commit('removeRow', index)
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  &__head {
    background-color: #505050;
    color: #fff;
  }

  &__cell {
    text-align: left;
    border: 1px solid black;
    padding: 10px;
    position: relative;
  }
}
</style>
