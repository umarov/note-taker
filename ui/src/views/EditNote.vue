<template>
  <v-layout>
    <template
      v-if="note.id"
      @submit.prevent
    >
      <v-form v-model="valid">
        <v-text-field
          v-model="note.title"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          solo
          name="input-7-4"
          label="Note content"
          v-model="note.content"
        ></v-textarea>

        <div>
          <v-btn
            depressed
            large
            color="primary"
            @click="updateNote"
          >Save</v-btn>
        </div>
      </v-form>
    </template>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        note: null
      };
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
          this.$router.push("/");
        }
      }
    },
    async created() {
      this.note = await fetch(
        `http://localhost:3000/notes/${this.$route.params.id}`
      ).then(res => res.json());
    }
  });
</script>

