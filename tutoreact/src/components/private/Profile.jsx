import React, { useEffect, useState } from 'react';
import style from "./Profile.module.css";
import axios from 'axios';
import { API } from '../../environment';
import { toast } from 'react-toastify';

const ProfileCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found');
        }

        // First, decode the token to get initial user data
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const userData = tokenData.user;
        
        // Set initial values from token
        if (userData) {
          setUsername(userData.username || '');
          setEmail(userData.email || '');
        }

        // Then fetch fresh data from server
        const response = await axios.get(`${API.BASE_URL}/api/auth/init`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.data) {
          const freshUserData = response.data.data;
          setUsername(freshUserData.username || userData.username || '');
          setEmail(freshUserData.email || userData.email || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to fetch user data. Please try again later.');
        toast.error('Error loading profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`${API.BASE_URL}/api/users/update`, 
        { username, email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update profile. Please try again.');
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
