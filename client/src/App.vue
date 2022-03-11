<template>
  <div class="container">
    <h1>Table</h1>
    <div class="info">
      <span class="info__text">
        Строка удаляется двойным кликом по ячейке с номером строки
      </span>
      <span class="info__text">
        Столбец удаляется при клике на кнопку, которая появляется при клике на
        текст в ячейке в head
      </span>
    </div>
    <app-table :data="table" />

    <div class="buttons">
      <button class="btn" @click="addRow">Добавить строку</button>
      <button class="btn" @click="addCol">Добавить столбец</button>
    </div>
  </div>
</template>

<script>
import AppTable from '@/components/AppTable'

import { socket } from '@/socket'

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
  async mounted() {
    await this.$store.dispatch('fetchTable')

    socket.on('update', async () => {
      await this.$store.dispatch('fetchTable')
    })
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    padding: 10px;
    flex: 1;
  }
}

.info {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__text {
    font-weight: bold;
  }
}
</style>
