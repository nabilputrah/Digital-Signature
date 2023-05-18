<template>
  <div>
    <!-- <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      show-expand
      :expanded.sync="expandedItems"
    >
      <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="detail-container">
              <span><strong>ID:</strong> {{ item.id }}</span>
              <br>
              <span><strong>Nama:</strong> {{ item.name }}</span>
              <br>
              <span><strong>Alamat:</strong> {{ item.address }}</span>
              <br>
              <span><strong>Detail:</strong></span>
              <ul>
                <li v-for="detail in item.details" :key="detail.detailId">
                  <strong>ID Detail:</strong> {{ detail.detailId }}
                  <br>
                  <strong>Nama Detail:</strong> {{ detail.detailName }}
                </li>
              </ul>
            </div>
          </td>
      </template>
    </v-data-table> -->

    <div class="drop-area" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dropFile">
      <p v-if="!file" class="placeholder">Drag and drop file here</p>
      <div v-else class="file-info">
        <p class="file-name">{{ file.name }}</p>
        <button class="remove-button" @click="removeFile">Remove</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     headers: [
  //       { text: 'ID', value: 'id' },
  //       { text: 'Nama', value: 'name' },
  //       { text: 'Alamat', value: 'address' },
  //     ],
  //     items: [
  //       {
  //         id: 1,
  //         name: 'Item 1',
  //         address: 'Alamat 1',
  //         details: [
  //           { detailId: 1, detailName: 'Detail 1' },
  //           { detailId: 2, detailName: 'Detail 2' },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: 'Item 2',
  //         address: 'Alamat 2',
  //         details: [
  //           { detailId: 1, detailName: 'Detail 1' },
  //           { detailId: 2, detailName: 'Detail 2' },
  //           { detailId: 3, detailName: 'Detail 3' },
  //         ],
  //       },
  //     ],
  //     expandedItems: [],
  //   };
  // },

  data() {
    return {
      file: null
    };
  },

  methods: {
    dragEnter(e) {
      e.preventDefault();
      e.target.classList.add('highlight');
    },
    dragOver(e) {
      e.preventDefault();
    },
    dragLeave(e) {
      e.preventDefault();
      e.target.classList.remove('highlight');
    },
    dropFile(e) {
      e.preventDefault();
      e.target.classList.remove('highlight');

      const files = e.dataTransfer.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      if (files.length > 0) {
        this.file = files[0];
        console.log(this.file)
      }
    },
    removeFile() {
      this.file = null;
    }
  }

};
</script>

<style scoped>
.detail-container {
  margin: 1% 2%;
}

.drop-area {
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  text-align: center;
  padding: 30px;
  font-size: 20px;
}

.highlight {
  background: lightgray;
}

.placeholder {
  color: #888;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

.file-name {
  margin: 0;
}

.remove-button {
  background-color: #ff5555;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

</style>
