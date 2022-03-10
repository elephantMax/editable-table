import { createStore } from 'vuex'

export default createStore({
  state: {
    table: {
      keys: [
        {
          id: 1,
          text: 'Name',
        },
      ],
      values: [
        {
          1: 'Name',
        },
      ],
    },
  },
  mutations: {
    addKey(state, payload) {
      const key = {
        id: Date.now(),
        text: payload,
      }
      state.table.keys.push(key)
    },
    updateKey(state, { id, value }) {
      const key = state.table.keys.find(key => key.id === id)
      key.text = value
    },
    removeKey(state, payload) {
      state.table.keys = state.table.keys.filter(key => key.id !== payload)
    },
    updateValue(state, { row, col, value }) {
      state.table.values[row][col] = value
    },
    addRow(state) {
      const row = state.table.keys.reduce((acc, key) => {
        acc[key.id] = ''
        return acc
      }, {})
      state.table.values.push(row)
    },
    removeRow(state, index) {
      state.table.values.splice(index, 1)
    },
  },
  actions: {
    save({ state }) {
      const data = state.table
      console.log(data)
    },
  },
  getters: {
    table: s => s.table,
  },
})
