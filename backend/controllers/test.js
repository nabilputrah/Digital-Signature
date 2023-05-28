newExample(){
    const fileBuffer = fs.readFileSync('./pdf/laporantaku.pdf');
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);

    const hex = hashSum.digest('hex');

    console.log('ini nilai hash  =' + hex)


     // Generate a new RSA key pair with a 2048-bit modulus
     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },  
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });

  
    const text = hex;
  

    // Encrypt the data using the public key
      const encrypted = crypto.publicEncrypt(publicKey,text)

      console.log('Encrypted data:', encrypted.toString('base64'))

      const secret = Buffer.from(privateKey)
      const shares = sss.split(secret, { shares: 5, threshold: 2 })

      const newArray = [shares[0],shares[1]]
      const recovered = sss.combine(newArray)

      console.log(recovered.toString())

      const decrypted = crypto.privateDecrypt(recovered,encrypted)
      console.log('ini data decrypted: ' + decrypted.toString())

      console.log(text==decrypted)
    // const decrypted = key.decrypt(encrypted, 'utf8');
    // console.log('decrypted: ', decrypted);

   
// console.log('Private key: ', privateKey);
},