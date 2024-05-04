import React, { useState, useEffect, useCallback, memo } from 'react';
import Grid from '@mui/material/Grid';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/SearchJobsService';
import useThrottle from '../hooks/useThrottle';

const MemoizedCard = memo(
  ({
    companyName,
    link,
    uid,
    details,
    role,
    location,
    logo,
    maxExp,
    maxSalary,
    minExp,
    minSalary,
    currencyCode,
  }) => {
    return (
      <JobCard
        key={uid}
        companyName={companyName}
        link={link}
        uid={uid}
        details={details}
        role={role}
        location={location}
        logo={logo}
        maxExp={maxExp}
        maxSalary={maxSalary}
        minExp={minExp}
        minSalary={minSalary}
        currencyCode={currencyCode}
      />
    );
  }
);

const SearchJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getJobs(6, page);
      if (response.jdList) {
        setData(prev => [...prev, ...response.jdList]);
        setPage(prev => prev + 6);
      } else {
        // Handle error or no data
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
    setLoading(false);
  }, [page]);

  const throttledLoadJobs = useThrottle(loadJobs, 1000);

  useEffect(() => {
    throttledLoadJobs();
  }, []);
  
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
      throttledLoadJobs();
    }
  }, [throttledLoadJobs]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const renderJobs = () => {
    return data.map((job, index) => {
      return (
        <Grid item md={4} sm={12} xs={12} key={job.jdUid}>
          <MemoizedCard
            companyName={job.companyName}
            link={job.jdLink}
            uid={job.jdUid}
            details={job.jobDetailsFromCompany}
            role={job.jobRole}
            location={job.location}
            logo={job.logoUrl}
            maxExp={job.maxExp}
            maxSalary={job.maxJdSalary}
            minExp={job.minExp}
            minSalary={job.minJdSalary}
            currencyCode={job.salaryCurrencyCode}
          />
        </Grid>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden', margin: '2%' }}>
      <Grid container spacing={4}>
        {renderJobs()}
        {loading && <p>Loading...</p>}
      </Grid>
    </div>
  );
}

export default SearchJobs;