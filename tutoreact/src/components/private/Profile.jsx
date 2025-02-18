import React, { useState } from 'react';
import style from "./Profile.module.css";

const ProfileCard = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("john@example.com");
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Create a temporary URL for the selected image file
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = () => {
    // Here you would typically send the updated credentials to your backend
    alert('User credentials updated!');
  };

  return (
    <div className={style["profile-card"]}>
      <div className={style["profile-image-container"]}>
        <img 
          src={avatar || "https://via.placeholder.com/150"} 
          alt="Avatar" 
          className={style["profile-image"]} 
        />
        {/* Invisible file input placed over the image to allow clicking */}
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className={style["profile-info"]}>
        <div className={style["profile-field"]}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className={style["profile-field"]}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      </div>
      <button className={style["update-button"]} onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default ProfileCard;