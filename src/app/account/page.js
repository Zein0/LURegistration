'use client';
import './account.css';
import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../../../contexts/UserDataContext';
import CoursesTable from '../../../components/CoursesTable/CoursesTable';
import { Box, Button, CircularProgress } from '@mui/material';
import Header from '../../../components/Header/Header';

const page = () => {
  const {
    state: { coursesData },
    actions: { getCourses, submitCourses },
  } = useContext(UserDataContext);

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div
      className={`${
        coursesData.loading ? 'account-container-empty' : ''
      } account-container`}
    >
      {coursesData.loading ? (
        <Box className='account-loading-container'>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Header />
          <div className='account-table-courses-container'>
            {coursesData.data.map((data, key) => {
              return <CoursesTable key={key} data={data} />;
            })}
          </div>
          <div className='account-btn-container'>
            <Button
              variant='contained'
              className='account-btn'
              onClick={submitCourses}
              disabled={coursesData.submitLoading}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
