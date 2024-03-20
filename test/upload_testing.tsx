"use client"
import React, { useState } from 'react';
import { insertRow, upload } from "@/utils/firebaseHelper";

const YourComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("aaa"); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    console.log(address)
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!file) {
        throw new Error('No image selected')
      }

      
      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}`, file)

      await insertRow('videos', [key], {
        id: key,
        address: address || '',
        sourceUrl: url,
        description: `${address}-Avatar_video`,
      });

      console.log('File uploaded successfully.');

    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSaveClick}>上传文件</button>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default YourComponent;