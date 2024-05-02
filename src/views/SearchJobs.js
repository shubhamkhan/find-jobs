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
    ({
        link,
        uid,
        details,
        role,
        location,
        maxExp,
        maxSalary,
        minExp,
        minSalary,
        currencyCode,
    }) => {
        return (
            <JobCard
                key={uid}
                link={link}
                uid={uid}
                details={details}
                role={role}
                location={location}
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

  const cardSkeleton = () => {
    return null;
  }
    
  return (
    <div className={classes.jobCardContainer}>
      <Grid container spacing={4}>
        {data.length ? (
            <>
            {data.map((job, index) => {
                return (
                    <Grid item md={4} sm={12} xs={12}>
                        <MemoizedCard
                            key={job.jdUid}
                            link={job.jdLink}
                            uid={job.jdUid}
                            details={job.jobDetailsFromCompany}
                            role={job.jobRole}
                            location={job.location}
                            maxExp={job.maxExp}
                            maxSalary={job.maxJdSalary}
                            minExp={job.minExp}
                            minSalary={job.minJdSalary}
                            currencyCode={job.salaryCurrencyCode}
                        />
                    </Grid>
                );
            })}
            </>
        ) : (
            cardSkeleton()
        )}
      </Grid>
    </div>
  )
}

export default SearchJobs