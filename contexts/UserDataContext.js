'use client';
import { createContext, useState } from 'react';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [coursesData, setCoursesData] = useState({
    data: [],
    user: null,
    total: 0,
    loading: false,
    submitLoading: false,
  });

  const login = async (body) => {
    let errMsg = '';
    if (body.email && body.password) {
      setLoginLoading(true);
      try {
        const res = await axios.post('login', body);
        console.log('res.data', res.data);
        if (res.data.success) {
          Cookies.set('access_token', res.data.access_token);
          router.push('/account');
        } else {
          errMsg = res.data.error;
          console.log('errr', res.data.error);
        }
      } catch (err) {
        errMsg = 'An error has occured. Please try again';
        console.log('login error', err);
      } finally {
        setLoginLoading(false);
      }
    }
    return errMsg;
  };

  const getCourses = () => {
    setCoursesData((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get('registered-courses')
      .then((res) => {
        if (res.data.success) {
          let courses = res.data.data;
          setCoursesData((prev) => ({
            ...prev,
            user: res.data.user,
            data: courses,
            total: res.data.total,
          }));
        }
      })
      .catch((err) => {
        console.log('getCourses error', err);
      })
      .finally((f) => {
        setCoursesData((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  const submitCourses = () => {
    setCoursesData((prev) => ({
      ...prev,
      submitLoading: true,
    }));
    axios
      .post('register-courses', { courses: selectedCourses })
      .then((res) => {
        if (res.data.success) {
          getCourses();
        }
      })
      .catch((err) => {
        console.log('submitCourses error', err);
      })
      .finally((f) => {
        setCoursesData((prev) => ({
          ...prev,
          submitLoading: false,
        }));
      });
  };

  const context = {
    state: {
      loginLoading,
      coursesData,
      selectedCourses,
    },
    actions: {
      login,
      getCourses,
      setCoursesData,
      setSelectedCourses,
      submitCourses,
    },
  };

  return (
    <UserDataContext.Provider value={context}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
