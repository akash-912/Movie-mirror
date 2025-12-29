import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { setCredentials } from '../../redux/feature/auth/authSlice';
import { useProfileMutation } from '../../redux/api/users';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const {userInfo} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);

  },[userInfo.email, userInfo.username]);
  return (
    <div>
      <div className="container mx-auto p-4 mt-[10rem]">
        <div className='flex justify-center align-center md:flex md:space-x-4 '>
          <div className='md:w-1/3'>
            <h2 className='text-2xl font-semibold  mb-4'>
              User Profile
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile