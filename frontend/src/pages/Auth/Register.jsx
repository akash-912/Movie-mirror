import React, { use } from 'react'
// import { useState } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../component/Loader.jsx';
import { setCredentials } from '../../redux/feature/auth/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/users.js';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const {userInfo} = useSelector((state)=> state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

      
  return (
    <div className='pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className="text-2xl font-semibold mb-4">
          Register
        </h1>
      </div>
    </div>
  )
}

export default Register;