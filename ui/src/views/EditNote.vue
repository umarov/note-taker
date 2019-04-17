<template>
  <v-layout>
    <v-flex xs12>
      <template
        v-if="note.id"
      >
        <v-form @submit.prevent="updateNote">
          <v-text-field
            v-model="note.title"
            label="Title"
            required
          ></v-text-field>
          <v-textarea
            ref="codeTextArea"
            solo
            :rows="textAreaRows"
            name="input-7-4"
            label="Note content"
            @keydown.tab.prevent="onTab"
            v-model="note.content"
          ></v-textarea>

          <div>
            <v-btn
              large
              color="primary"
              @click="updateNote"
            >Save</v-btn>
          </div>
        </v-form>
      </template>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        note: {
          id: null,
          title: null,
          content: ''
        }
      };
    },
    computed: {
      textAreaRows () {
        return this.note.content.split('\n').length
      }
    },
    methods: {
      async updateNote() {
        if (this.note && this.note.id) {
          await fetch(`http://localhost:3000/notes/${this.note.id}`, {
            method: "PUT",
            body: JSON.stringify({ note: this.note }),
            headers: {
              "Content-Type": "application/json"
            }
          });

          this.$router.push(`/notes/${this.$route.params.id}`);
        }
      },
      onTab(event) {
        const textArea = this.$refs.codeTextArea.$el.querySelector('textarea')
        // get caret position/selection
        const val = textArea.value,
            start = textArea.selectionStart,
            end = textArea.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.note.content = val.substring(0, start) + '\t' + val.substring(end);

        requestAnimationFrame(() => {
          // put caret at right position again
          textArea.selectionStart = textArea.selectionEnd = start + 1;
        })

        // prevent the focus lose
        return false;
      },
      onTabBack(event) {
        const textArea = this.$refs.codeTextArea

      }
    },
    async created() {

      this.note = await fetch(
        `http://localhost:3000/notes/${this.$route.params.id}`
      ).then(res => res.json());
    }
  });
</script>

