<template>
    <!-- Main Content Area -->
    <v-main>
      <v-container>
        <v-text-field
          v-model="fileName"
          label="Drop PDF File Here"
          outlined
          readonly
        ></v-text-field>
        <input
          ref="fileInput"
          type="file"
          accept="application/pdf"
          @change="handleFileUpload"
          style="display: none"
        />
      </v-container>
    </v-main>
</template>

<script>
export default {
  data: () => ({
    fileName: '',
  }),

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.fileName = file.name;
        // Lakukan sesuatu dengan file PDF yang diunggah, misalnya memprosesnya atau mengirimkannya ke server
        // Di sini, Anda dapat menambahkan logika untuk memproses file PDF yang diunggah sesuai kebutuhan aplikasi Anda.
        console.log('File PDF yang diunggah:', file);
      } else {
        this.fileName = '';
        console.error('File yang diunggah harus berupa file PDF');
      }
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    }
  }
}
</script>

<style>
/* Add your custom styles here */
</style>
