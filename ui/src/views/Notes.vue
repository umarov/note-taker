<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-flex xs8>
        <v-card
          color="orange darken-2"
          class="white--text"
          v-for="note in notes"
          :key="note.id"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ note.title }}</div>
              <span>{{ note.content }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              flat
              dark
              @click="goToEdit(note.id)"
            >Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        notes: []
      };
    },
    methods: {
      goToEdit(id: number) {
        this.$router.push(`edit/${id}`)
      }
    },
    async created() {
      try {
        this.notes = await fetch("http://localhost:3000/notes").then(res =>
          res.json()
        );
      } catch (err) {
        console.warn(err);
      }
    }
  });
</script>
