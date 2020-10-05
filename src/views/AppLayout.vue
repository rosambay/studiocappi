<template>
  <div>
    <Menu />
    <v-container
      fluid
      class='pa-1'
    >
      <v-layout>
        <v-flex xs12>
          <slot />
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>

import Menu from './Menu.vue'

export default {
  name: 'AppLayout',
  components: {
    Menu
  },
  data: () => ({
    drawer: false
  }),
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }



}
</script>
