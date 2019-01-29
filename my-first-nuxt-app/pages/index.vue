<template>
  <section class="container">
    <div>

      <form onsubmit="return false;">
        <b-field>
          <b-input v-model="user_input" icon="magnify" placeholder="e.g. nuxt.js"></b-input>
          <p class="control">
            <button class="button is-primary" v-on:click="qiitaSearch">Search</button>
          </p>
        </b-field>
      </form>

      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <h3>{{ user_input }}のタグが付けられた投稿の一覧</h3>
      <ul>
        <li v-for="item in items" :key="item.id">
          <div class="card">

            <div class="card-header">
              <h4>
                <span>{{ item.title }}</span>
                <small>
                  <span>by </span>
                  <nuxt-link :to="`/users/${item.user.id}`">
                    {{ item.user.id }}
                  </nuxt-link>
                </small>
              </h4>
            </div>

            <div class="card-content">
              <div class="content">
                <div>{{ item.body.slice(0, 130) }}....</div>
                <p><a :href="item.url" target="_blank">{{ item.url }}</a></p>
              </div>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      user_input: "",
    }
  },
  async asyncData({ store }) {
    if (store.getters['items'].length) {
      return;
    }
    await store.dispatch('fetchItems', 'nuxt.js');
  },
  computed: {
    ...mapGetters(['items']),
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    qiitaSearch() {
      this.$store.dispatch('fetchItems', this.user_input);
    }
  }
};
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  padding: 16px;
}

h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}

.card {
  margin-bottom: 16px;
  .card-header {
    margin-left: 16px;
    h4 {
      margin-top: 8px;
    }
  }
}

</style>

