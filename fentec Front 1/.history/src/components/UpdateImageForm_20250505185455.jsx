import React, { useContext, useState } from 'react';
import './UpdateImageForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import useExRequest from '../customHooks/ExternalRequestHook';
import { authContext } from '../customContexts/AuthContext';

const UpdateImageForm = ({cancel}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const {currentUser,setCurrentUser} = useContext(authContext);
  const {setSuccess
    setError}
  const {sendExRequest} = useExRequest();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
        let file_link = URL.createObjectURL(file)
      setPreview(file_link);
    }
  };
  const handleImageChangeResp = (data) => {
    if (data.success){
        if (data?.user){

            let updatedUser = currentUser
            updatedUser.picture = data?.user?.picture ;
            setCurrentUser(updatedUser);
        }
    cancel(false)
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image first.');
      return;
    }
    let data = new FormData()
    data.append('new_profile_pic', image)
    // Here you'd usually send the image to your server
    let url = '/authuser/update-pic/'
    sendExRequest(url,'PUT',data,handleImageChangeResp,true);

  };

  return (
    <form className="update-image-form " onSubmit={handleSubmit}>
        <div className='relative'>
            <FontAwesomeIcon icon={faMultiply} className='cancel-icon2' onClick={() => {cancel(false)}}/>
        </div>

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
