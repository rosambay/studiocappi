<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>

import AppLayout from './AppLayout.vue'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    AppLayout
  },
  computed: {
    ...mapState(['titulo'])
  },
  mounted () {
    this.$store.state.titulo = "Dashboard"
  },

  created () {
    this.$store.state.titulo = "Dashboard"
  },

}
</script>