<template>
  <v-layout>
    <v-flex xs12>
      <v-form @submit.prevent="create">
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
            @click="create"
          >Save</v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        note: {
          title: '',
          content: ''
        }
      };
    },
    methods: {
      async create() {
        await fetch('http://localhost:3000/notes', {
          method: "POST",
          body: JSON.stringify({ note: this.note }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        this.$router.push('/');
      }
    }
  });
</script>

