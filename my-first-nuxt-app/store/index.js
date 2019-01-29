import Vuex from 'vuex';

const store = {
  state: {
    items: [],
    users: {},
    userItems: {},
    loading: false
  },
  getters: {
    items: state => state.items,
    users: state => state.users,
    userItems: state => state.userItems,
    isLoading: state => state.loading,
  },
  mutations: {
    setItems(state, { items }) {
      state.items = items;
    },
    setUser(state, { user }) {
      state.users[user.id] = user;
    },
    setUserItems(state, { user, items }) {
      state.userItems[user.id] = items;
    },
    setLoading(state, flag) {
      state.loading = flag;
    }
  },
  actions: {
    async fetchItems({ commit }, user_input) {
      commit('setLoading', true);
      const items = await this.$axios.$get(
        `https://qiita.com/api/v2/items?query=tag:${ user_input }`
      );
      commit('setItems', { items });
      commit('setLoading', false);
    },
    async fetchUserInfo({ commit }, { id }) {
      const [user, items] = await Promise.all([
        this.$axios.$get(`https://qiita.com/api/v2/users/${id}`),
        this.$axios.$get(`https://qiita.com/api/v2/items?query=user:${id}`)
      ]);
      commit('setUser', { user });
      commit('setUserItems', { user, items });
    }
  }
};

export default () => new Vuex.Store(store);