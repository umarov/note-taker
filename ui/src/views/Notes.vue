<template>
  <v-container>
    <v-layout
      row
      wrap>
      <v-flex
        xs12>
        <v-card>
          <v-toolbar
            color="primary darken-1"
            dark>
            <v-toolbar-title>Your notes</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="goToNewNote()">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list
            three-line
            v-if="notes.length > 0">
            <template v-for="(note, index) in notes">

              <v-divider
                v-if="index !== 0"
                :key="`divider${note.id}`"
              ></v-divider>

              <v-list-tile
                :key="note.id"
                avatar>
                <v-list-tile-avatar @click="goToShow(note.id)">
                  <img :src="`https://picsum.photos/200/200/?image=${note.id}`">
                </v-list-tile-avatar>

                <v-list-tile-content @click="goToShow(note.id)">
                  <v-list-tile-title>{{note.title}}</v-list-tile-title>
                  <v-list-tile-sub-title><strong>{{ formatTime(note.updatedAt) }} ago</strong></v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{note.content}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-menu
                  bottom
                  left
                >
                  <v-btn
                    slot="activator"
                    icon
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>

                  <v-list>
                    <v-list-tile @click="removeNote(note.id)">
                      <v-list-tile-title>Remove Note</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile>
            </template>
          </v-list>

          <v-list two-line v-else>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>No notes have been created yet.</v-list-tile-title>
                <v-list-tile-sub-title><strong>Click the + icon above to create one</strong></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { formatDistance, subDays, subHours } from 'date-fns'

  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        notes: []
      };
    },
    methods: {
      async fetchNotes () {
        try {
          this.notes = await fetch("http://localhost:3000/notes").then(res =>
            res.json()
          );
        } catch (err) {
          console.warn(err);
        }
      },
      formatTime (updatedAt: Date) {
        return formatDistance(subHours(new Date(updatedAt), 0), new Date())
      },
      goToShow(id: number) {
        this.$router.push(`/notes/${id}`);
      },
      goToNewNote() {
        this.$router.push("/new");
      },
      async removeNote(id: number) {
        await fetch(`http://localhost:3000/notes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });

        this.fetchNotes()
      }
    },
    created() {
      this.fetchNotes()
    }
  });
</script>
