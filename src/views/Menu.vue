<template>
  <div>
    <v-app-bar
      app
      fixed
      color="grey lighten-5"
    >
      <v-app-bar-nav-icon @click.stop="value = !value">
      </v-app-bar-nav-icon>

      <h3>
        {{titulo}}
      </h3>

      <v-spacer />

    </v-app-bar>

    <v-navigation-drawer
      v-model="value"
      :mini-variant="mini"
      absolute
      temporary
      @input="$emit('input', $event)"
    >
      <v-list
        @click.stop="mini = !mini"
        class="pt-0"
        dense
      >
        <v-list-item @click.stop="mini = !mini">
          <v-icon
            color="#F8D94A"
            v-if="mini"
          >mdi-chevron-right</v-icon>
          <v-list-item-title>Menu</v-list-item-title>
          <v-btn
            icon
            color="#F8D94A"
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

        </v-list-item>
      </v-list>
      <v-list
        class="pt-0"
        dense
      >
        <v-divider light></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          :exact="item.exact"
          @click.stop="clickTitulo(item.title)"
        >
          <v-list-item-action>
            <v-icon color="#F8D94A">{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', url: '/dashboard', exact: true },
      { title: 'Clientes', icon: 'mdi-account-circle', url: '/dashboard/clientes', exact: true },
      { title: 'Serviços', icon: 'mdi-clipboard-text-multiple-outline', url: '/dashboard/servicos', exact: true },
      { title: 'Relatórios', icon: 'mdi-file-document', url: '/dashboard/reports', exact: true }
    ],

    mini: false,
    user: {},
    value: false
  }),
  computed: {
    ...mapState(['titulo'])
  },
  methods: {
    clickTitulo (titulo) {
      this.$store.state.titulo = titulo
      this.value = false

    }

  }

}
</script>
