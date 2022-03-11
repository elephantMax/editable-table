export const socketMutatuinTypes = {
  ADD_KEY: 'addKey',
  UPDATE_KEY: 'updateKey',
  REMOVE_KEY: 'removeKey',
  UPDATE_VALUE: 'updateValue',
  ADD_ROW: 'addRow',
  REMOVE_ROW: 'removeRow',
}

export const socketMutatuins = {
  [socketMutatuinTypes.ADD_KEY](state, payload) {
    const key = {
      id: Date.now() + '',
      text: payload,
    }
    state.table.keys.push(key)
  },
  [socketMutatuinTypes.UPDATE_KEY](state, { id, value }) {
    const key = state.table.keys.find(key => key.id === id)
    key.text = value
  },
  [socketMutatuinTypes.REMOVE_KEY](state, payload) {
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
  },
  [socketMutatuinTypes.UPDATE_VALUE](state, { row, col, value }) {
    state.table.values[row][col] = value
  },
  [socketMutatuinTypes.ADD_ROW](state) {
    const row = state.table.keys.reduce((acc, key) => {
      acc[key.id] = ''
      return acc
    }, {})
    state.table.values.push(row)
  },
  [socketMutatuinTypes.REMOVE_ROW](state, index) {
    state.table.values.splice(index, 1)
  },
}
