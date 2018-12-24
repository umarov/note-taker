<template>
  <v-app>
    <v-toolbar app color="primary" dark v-if="isTopLevel">
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Note Taker</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar app color="primary darken-1" dark v-else-if="toolbarLabel">
      <v-btn icon @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>
        {{toolbarLabel}}
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isTopLevel () {
      return this.$route.meta.topLevel
    },
    toolbarLabel () {
      return this.$route.meta.toolbarLabel
    }
  },
  methods: {
    goBack () {
      window.history.back()
    }
  }
}
</script>
