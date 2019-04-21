<template>
  <v-layout>
    <v-flex xs12>
      <template v-if="note.id">
        <v-card>
          <v-card-title>
            <h3>{{ note.title }}</h3>
          </v-card-title>

          <v-card-text>
            <markdown-container :markdown-value="note.content" />
          </v-card-text>
        </v-card>
        <v-btn large color="primary" @click="editNote">Edit</v-btn>
      </template>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {
    MarkdownContainer: () => import('../components/MarkdownContainer/MarkdownContainer.vue')
  },
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
    const note = await fetch(
      `http://localhost:3000/notes/${this.$route.params.id}`
    ).then(res => res.json());

    while(note.content.includes('\t')) {
      note.content = note.content.replace(/\t/, '  ')
    }

    this.note = {
      ...note
    };
  }
});
</script>


