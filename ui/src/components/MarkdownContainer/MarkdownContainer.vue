<template>
  <div v-html="renderedMarkdown" />
</template>


<script lang="ts">
import "highlight.js/styles/dracula.css";
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      md: null,
      renderedMarkdown: ''
    }
  },
  props: {
    markdownValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    renderMarkdown() {
      if (this.md) {
        this.renderedMarkdown = this.md.render(this.markdownValue)
      }
    }
  },
  async created () {
    const { md } = await import('./markdownIt')

    this.md = md;

    this.renderMarkdown()
  }
})
</script>

<style>
pre.hljs {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

code {
  padding: 0.5rem;
  box-shadow: none;
  width: 100%;
  background: none;
}

code:before, code:after {
  content: none;
}
</style>
