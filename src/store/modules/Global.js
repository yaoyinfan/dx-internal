const state = {
  loading: 0,
  sidemenuCollapse: false,
  containerHeight: 800
}

const mutations = {
  DECREMENT_LOADING(state) {
    state.loading--
  },
  INCREMENT_LOADING(state) {
    state.loading++
  },
  TRIGGER_SIDEMENU(state) {
    state.sidemenuCollapse = !state.sidemenuCollapse
  },
  UPDATE_CONTAINER_HEIGHT(state, value) {
    state.containerHeight = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
