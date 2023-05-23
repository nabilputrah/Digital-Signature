<template>
    <div>
      <button @click="generatePDF">Generate PDF</button>
      <!-- Tambahkan elemen HTML yang ingin Anda konversi menjadi PDF -->
      <div id="myHtmlElement" class="pdf-content">
          <p>Te4st</p>
          <page size="A4">
              <strong>
              <p>PENGEMBANGAN SISTEM <em>MULTI-USER DIGITAL</em></p>
              <p><em>SIGNATURE</em> UNTUK LAPORAN TUGAS AKHIR&nbsp;</p>
              <p>DENGAN <em>METODE SECRET</em></p>
              <p><em>SHARING SCHEME</em></p>
              </strong>
          </page>
      </div>
    </div>
  </template>
      
    <script>
    import html2pdf from 'html2pdf.js'
    
    export default {
      methods: {
      generatePDF() {
          const element = document.getElementById('myHtmlElement') // Ganti 'myHtmlElement' dengan ID elemen HTML Anda
          html2pdf().from(element).save('hasil.pdf') // Nama file PDF yang dihasilkan adalah 'hasil.pdf', bisa diganti sesuai kebutuhan
      }
      }
    };
    </script>
    
  <style>
  .pdf-content {
    page-break-inside: avoid;
    /* width: 150; */
    width: 21cm;
    height: 29.7cm; 
    /* width: 210mm;
    height: 297mm; */
    margin: 4cm 3cm;
  }
  
  .page {
    background: white;
    display: block;
    margin: 0 auto;
    /* margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); */
    font-family: "Times New Roman", Times, serif;
    font-size: 20px;
    text-align: center;
  }
  .page[size="A4"] {  
    width: 21cm;
    height: 29.7cm; 
  }
  
  .content {
    font-family: "Times New Roman", Times, serif;
    font-size: 20px;
    text-align: center;
  }
  
  /* @page {
    size: A4;
    margin: 0;
  } */
  
  @media print {
    html, body {
      width: 21cm;
      height: 29.7cm;
    }
    /* ... the rest of the rules ... */
  }
  </style>