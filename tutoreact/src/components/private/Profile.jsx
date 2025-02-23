import React, { useEffect, useState } from 'react';
import style from "./Profile.module.css";
import axios from 'axios';

const ProfileCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        console.log('Retrieved token:', token); // Log the token to verify it is retrieved correctly

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('/api/auth/init', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) { // Changed to 200 for consistency
          setUsername(response.data.data);
          setEmail(response.data.data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure the same token is used
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('/api/users/update', { username, email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('User credentials updated successfully!');
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={style["error-message"]}>{error}</div>;
  }

  return (
    <div className={style["profile-outlet"]}>
      <div className={style["profile-card"]}>
        <div className={style["profile-image-container"]}>
          {/* <img 
            src={avatar || "https://via.placeholder.com/150"} 
            alt="Avatar" 
            className={style["profile-image"]} 
          /> */}
          {/* Invisible file input placed over the image to allow clicking */}
          {/* <input type="file" onChange={handleImageChange} /> */}
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
    </div>
  );
};

export default ProfileCard;

