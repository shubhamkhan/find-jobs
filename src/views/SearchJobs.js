import React, { useState, useEffect, useCallback, memo } from 'react';
import Grid from '@mui/material/Grid';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/SearchJobsService';
import useThrottle from '../hooks/useThrottle';
import FilterJob from '../components/FilterJob';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

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
    verifySalary,
    postedDay,
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
        minExp={minExp}
        maxExp={maxExp}
        minSalary={minSalary}
        maxSalary={maxSalary}
        currencyCode={currencyCode}
        verifySalary={verifySalary}
        postedDay={postedDay}
      />
    );
  }
);

const SearchJobs = () => {
  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState(null);
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
        console.log("Data not loaded");
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

  const handleFilterJob = (jobList) => {
    setDataList(jobList);
  }

  const handleVerifySalary = (minSalary, maxSalary) => {
    if(minSalary && maxSalary) {
      return true;
    } else {
      return false;
    }
  }

  const renderJobs = () => {
    let dt = dataList ? dataList : data;
    return dt.map((job, index) => {
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
            minExp={job.minExp}
            maxExp={job.maxExp}
            minSalary={job.minJdSalary}
            maxSalary={job.maxJdSalary}
            currencyCode={job.salaryCurrencyCode}
            verifySalary={handleVerifySalary(job.minJdSalary, job.maxJdSalary)}
            postedDay={job.minExp}
          />
        </Grid>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden', margin: '2%' }}>
      <Grid container spacing={4}>
        <FilterJob data={data} handleFilterJob={handleFilterJob} />
      </Grid>
      <Grid container spacing={4}>
        {loading && <span style={{position: 'absolute', left: '48%'}}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </span>}
        {renderJobs()}
      </Grid>
    </div>
  );
}

export default SearchJobs;