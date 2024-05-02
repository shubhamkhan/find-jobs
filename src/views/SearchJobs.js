import React, {useState, useEffect, memo} from 'react';
import Grid from '@mui/material/Grid';
import JobCard from '../components/JobCard';
import { getJobs } from '../service/SearchJobsService';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    jobCardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        margin: '2%',
    }
}));

const MemoizedCard = memo(
    ({uid}) => {
        return (
            <JobCard
                key={uid}
            />
        );
    }
);

const SearchJobs = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        getJobList(6,0);
    }, []);

  const getJobList = async (limit, offset) => {
    await getJobs(limit, offset).then((response) => {
        if(response.jdList) {
            console.log("responce>>", response.jdList)
            setData(response.jdList);
        } else {
            // Data not avalable
        }
    }).catch((error) => {
        // Unhandel Error
        console.error(error);
    })
  }
    
  return (
    <div className={classes.jobCardContainer}>
      <Grid container spacing={4}>
        {data.length ? (
            <>
            {data.map((job, index) => {
                return (
                    <Grid item md={4} sm={12} xs={12}>
                        <MemoizedCard key={job.jdUid} />
                    </Grid>
                );
            })}
            </>
        ) : (
            null
            // add Skeleton
        )}
      </Grid>
    </div>
  )
}

export default SearchJobs