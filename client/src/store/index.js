import { createStore } from 'vuex'
import { socket } from '@/socket'

import createSocketIoPlugin from './plugins/socket'
import { socketMutatuins } from './socket/mutations'

const socketPlugin = createSocketIoPlugin(socket)

export default createStore({
  state: {
    table: {},
  },
  mutations: {
    setTable(state, payload) {
      state.table = payload
    },
    ...socketMutatuins,
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
  plugins: [socketPlugin],
})
