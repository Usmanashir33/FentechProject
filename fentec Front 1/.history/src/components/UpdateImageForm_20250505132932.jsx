import React, { useState } from 'react';
import './UpdateImageForm.css';

const UpdateImageForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
        let file_link = URL.createObjectURL(file)
      setPreview(file_link);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image first.');
      return;
    }
    // Here you'd usually send the image to your server
    alert('Image submitted!');
  };

  return (
    <form className="update-image-form" onSubmit={handleSubmit}>
      <h2>Update Profile Image</h2>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UpdateImageForm;
