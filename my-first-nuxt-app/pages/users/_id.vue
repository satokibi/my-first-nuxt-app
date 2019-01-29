<template>
  <section class="container">
    <div>
      <h3>{{ user.id }}</h3>
      <img :src="user.profile_image_url" width="120" alt="">
      <p>{{ user.description || 'No description' }}</p>
      <p>
        <nuxt-link to="/">
          <small><b>トップへ戻る</b></small>
        </nuxt-link>
      </p>
      <h3>{{ user.id }}さんの投稿一覧</h3>

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
  head() {
    return {
      title: this.user.id
    }
  },
  async asyncData({ route, store, redirect }) {
    if (store.getters['users'][route.params.id]) {
      return;
    }
    try {
      await store.dispatch('fetchUserInfo', { id: route.params.id });
    } catch (e) {
      redirect('/');
    }
  },
  computed: {
    user() {
      return this.users[this.$route.params.id];
    },
    items() {
      return this.userItems[this.$route.params.id] || [];
    },
    ...mapGetters(['users', 'userItems'])
  }
};
</script>


<style scoped>
.container {
  min-height: 100vh;
  padding: 16px;
}

h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>