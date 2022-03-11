import { socketMutatuinTypes } from '../socket/mutations'

const createSocketIoPlugin = socket => {
  const arrayOfTypes = Object.values(socketMutatuinTypes)
  return store => {
    store.subscribe((mutation, state) => {
      if (arrayOfTypes.includes(mutation.type)) {
        socket.emit('update', state.table)
      }
    })
  }
}

export default createSocketIoPlugin
