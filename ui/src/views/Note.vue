<template>
  <v-layout>
    <v-flex xs12>
      <template v-if="note.id">
        <v-card>
          <v-card-title>
            <h3>{{ note.title }}</h3>
          </v-card-title>

          <v-card-text>
            <p v-html="note.content"></p>
          </v-card-text>
        </v-card>
        <v-btn large color="primary" @click="editNote">Edit</v-btn>
      </template>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import "highlight.js/styles/dracula.css";
export default Vue.extend({
  data() {
    return {
      note: {
        id: null,
        title: null,
        content: null
      }
    };
  },
  methods: {
    editNote() {
      this.$router.push(`/notes/edit/${this.$route.params.id}`);
    }
  },
  async created() {
    const [{ default: MarkdownIt }, { default: hljs }] = await Promise.all([
      import("markdown-it"),
      import("highlight.js")
    ]);

    // @ts-ignore
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
      highlight: function(str, lang) {

        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) {}
        }

        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      }
    });

    const note = await fetch(
      `http://localhost:3000/notes/${this.$route.params.id}`
    ).then(res => res.json());

    while(note.content.includes('\t')) {
      note.content = note.content.replace(/\t/, '  ')
    }

    this.note = {
      ...note,
      content: md.render(note.content)
    };
  }
});
</script>

<style lang="scss">
code {
  padding: 1rem;
  box-shadow: none;
  width: 100%;
  background: none;
}

code:before {
  content: none;
}
</style>


