<template>
  <div>
    <button @click="openDialog">Gambar TTD</button>
    <dialog :open="dialogOpen">
      <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="finishDrawing"></canvas>
      <button @click="clearSignature">Clear Signature</button>
      <button @click="saveSignature">Save Signature</button>
    </dialog>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';

export default {
  data() {
    return {
      dialogOpen: false,
      signaturePad: null,
    };
  },
  mounted() {
    this.signaturePad = new SignaturePad(this.$refs.canvas, {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Mengatur latar belakang transparan
    });
  },
  methods: {
    openDialog() {
      this.dialogOpen = true; // Membuka dialog
    },
    startDrawing() {
      this.signaturePad.clear(); // Bersihkan tanda tangan saat mulai menggambar
    },
    draw(event) {
      if (event.buttons === 1) {
        var point = {
          x: event.clientX,
          y: event.clientY,
        };
        this.signaturePad.addPoint(point);
      }
    },
    finishDrawing() {
      this.signaturePad.removeBlanks(); // Menghapus latar belakang kosong
    },
    clearSignature() {
      this.signaturePad.clear(); // Membersihkan tanda tangan
    },
    saveSignature() {
      const signatureData = this.signaturePad.toDataURL(); // Mendapatkan data gambar tanda tangan
      this.downloadImage(signatureData, 'signature.png'); // Mengunduh gambar tanda tangan
      this.dialogOpen = false; // Menutup dialog setelah menyimpan tanda tangan
    },
    // saveSignature() {
    //   if (!this.signaturePad._isEmpty){
    //     console.log(this.signaturePad._isEmpty)
    //     const signatureData = this.signaturePad.toDataURL(); // Mendapatkan data gambar tanda tangan
        
    //     // Membuat elemen gambar sementara untuk merender ulang gambar dengan ukuran yang diinginkan
    //     const tempImage = new Image();
    //     tempImage.src = signatureData;

    //     tempImage.onload = () => {
    //       // Membuat elemen canvas baru dengan ukuran 160x110 pixel
    //       const canvas = document.createElement('canvas');
    //       canvas.width = 160;
    //       canvas.height = 110;
        
    //       // Menggambar gambar tanda tangan pada canvas dengan ukuran yang diinginkan
    //       const context = canvas.getContext('2d');
    //       context.drawImage(tempImage, 0, 0, 160, 110);
        
    //       // Mendapatkan data URL gambar dengan ukuran yang diinginkan
    //       const resizedSignatureData = canvas.toDataURL();
        
    //       // Mengunduh gambar tanda tangan dengan ukuran yang diinginkan
    //       this.downloadImage(resizedSignatureData, 'signature.png');
    //     };

    //     this.dialogOpen = false; // Menutup dialog setelah menyimpan tanda tangan
    //   } else {
    //     console.log("TTD ga ada")
    //   }
    // },

    downloadImage(dataURL, filename) {
      // Membuat elemen tautan (link) sementara
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;

      // Men-trigger klik pada tautan dan menghapus elemen tautan
      link.click();
      link.remove();
    },
  },
};
</script>
