import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  SetUserUpdate} from '../../redux/usersSlice';
import { message } from 'antd';
import { UpdateUserProfile } from '../../apicalls/users';

function UProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
  });

  const { firstName, lastName, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateUserProfile(formData);
      if (response.success) {
        // Update the user data in the Redux store
        dispatch(SetUserUpdate(response.data));
        message.success('Profile updated successfully.');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UProfile;
