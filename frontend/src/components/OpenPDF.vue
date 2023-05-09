<template>
  <div>
    <v-btn color="primary" @click="openDialog">
      <v-icon>mdi-file-pdf</v-icon>
      Open PDF
    </v-btn>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-text>
          <embed :src="pdfSrc" type="application/pdf" width="100%" height="600px">
          <!-- <embed src="../assets/LaporanTA.pdf#zoom=100&toolbar=1" type="application/pdf" width="100%"/> -->
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      pdfSrc: '../assets/LaporanTA.pdf',
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
  },
}
</script>