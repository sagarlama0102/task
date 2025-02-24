import React, { useEffect, useState } from 'react';
import style from "./Profile.module.css";
import axios from 'axios';
import { API } from '../../environment';
import { toast } from 'react-toastify';

const ProfileCard = () => {
  const [userId, setUserId] = useState(""); // Add userId state
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
          setUserId(userData.userId); // Set userId
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
          setUserId(freshUserData.userId); // Set userId
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
              readOnly // Make the input read-only
            />
          </div>
          <div className={style["profile-field"]}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              readOnly // Make the input read-only
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;