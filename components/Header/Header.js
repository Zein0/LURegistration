import React, { useContext, useState } from 'react';
import './header.css';
import { UserDataContext } from '../../contexts/UserDataContext';
import { BiUserCircle } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const {
    state: { coursesData },
  } = useContext(UserDataContext);

  const logout = () => {
    Cookies.remove('access_token');
    setShowPopup(false);
    router.push('/login');
  };

  return (
    <div className='header-container'>
      <div>
        <h1>Hello {coursesData.user?.full_name}</h1>
        <p>Total Credits: {coursesData.total}</p>
      </div>
      <div className='header-icon-container'>
        <BiUserCircle
          size={40}
          className='header-icon'
          onClick={() => setShowPopup(true)}
        />
        {showPopup && (
          <p className='header-icon-p' onClick={logout}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
