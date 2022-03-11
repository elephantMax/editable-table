import { createStore } from 'vuex'
import { socket } from '@/socket'

export default createStore({
  state: {
    table: {},
  },
  mutations: {
    setTable(state, payload) {
      state.table = payload
    },
    addKey(state, payload) {
      const key = {
        id: Date.now() + '',
        text: payload,
      }
      state.table.keys.push(key)
      socket.emit('update', state.table)
    },
    updateKey(state, { id, value }) {
      const key = state.table.keys.find(key => key.id === id)
      key.text = value
      socket.emit('update', state.table)
    },
    removeKey(state, payload) {
      state.table.keys = state.table.keys.filter(key => key.id !== payload)
      state.table.values = state.table.values.map(row => {
        return Object.entries(row).reduce((acc, [key, value]) => {
          if (key !== payload) {
            acc[key] = value
          }
          return acc
        }, {})
      })
      state.table.values = state.table.values.filter(
        row => Object.keys(row).length > 0,
      )
      socket.emit('update', state.table)
    },
    updateValue(state, { row, col, value }) {
      state.table.values[row][col] = value
      socket.emit('update', state.table)
    },
    addRow(state) {
      const row = state.table.keys.reduce((acc, key) => {
        acc[key.id] = ''
        return acc
      }, {})
      state.table.values.push(row)
      socket.emit('update', state.table)
    },
    removeRow(state, index) {
      state.table.values.splice(index, 1)
      socket.emit('update', state.table)
    },
  },
  actions: {
    async fetchTable({ commit }) {
      try {
        const response = await fetch('http://localhost:8000/table')
        const data = await response.json()
        commit('setTable', data)
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    table: s => s.table,
  },
})
