"use client"
import React, { useState } from 'react';
import { insertRow, upload } from "@/utils/firebaseHelper";

const YourComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("bbb"); 
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const ImageSaveClick = async () => {
    setLoading(true);
    console.log(address)
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!image1) {
        throw new Error('No Image 1 found')
      }
      if (!image2) {
        throw new Error('No Image 2 found')
      }

      const key = `${address}-${+new Date()}`;
      const url_1 = await upload(`${key}-image1`, image1);
      const url_2 = await upload(`${key}-image2`, image2);

      console.log(url_1);
      console.log(url_2);

      console.log('Images uploaded successfully.');
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const SaveVideoClick = async () => {
    setLoading(true);
    console.log(address)
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!file) {
        throw new Error('No Video selected')
      }

      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}`, file);

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
      <button onClick={SaveVideoClick}>Upload Video</button>
      <br />
      <input type="file" onChange={handleImage1Change} />
      <input type="file" onChange={handleImage2Change} />
      <button onClick={ImageSaveClick}>Upload Images</button>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default YourComponent;
