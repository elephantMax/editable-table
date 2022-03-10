<template>
  <div class="container">
    <app-table :data="table" />

    <div class="buttons">
      <button class="btn" @click="addRow">Add row</button>
      <button class="btn" @click="addCol">Add col</button>
    </div>
  </div>
</template>

<script>
import AppTable from '@/components/AppTable'

export default {
  name: 'App',
  components: {
    AppTable,
  },
  data() {
    return {
      selectedRow: null,
    }
  },
  computed: {
    isRemoveButtonActive() {
      return typeof this.selectedRow === 'number'
    },
    table() {
      return this.$store.getters.table
    },
  },
  methods: {
    addRow() {
      this.$store.commit('addRow')
    },
    addCol() {
      this.$store.commit('addKey', 'New key')
    },
  },
  watch: {
    table: {
      handler() {
        this.$store.dispatch('save')
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    padding: 10px;
    flex: 1;
  }
}
</style>
