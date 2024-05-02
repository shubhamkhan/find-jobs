import React from 'react';
import { Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2%',
    padding: '15px 20px',
  }
}));

const JobCard = ({
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
  const classes = useStyles();

  return (
    <Paper id="jobCard" elevation={3} className={classes.cardContainer}>
      <Grid container spacing={4}>
        <Grid item md={12} sm={12} xs={12}>
          {role} Developer
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {location}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {currencyCode} {minSalary} LPA - {currencyCode} {maxSalary} LPA 
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {details}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {minExp} - {maxExp} years
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Button
            // disabled={disabledApplyButton}
            className=''
            variant='contained'
            size='large'
            startIcon={<ElectricBoltIcon />}
            style={{borderRadius: 5, width: '100%', backgroundColor: '#55EFC4', color: 'black', fontWeight: 'bold'}}
            // onClick={() => easyApply()}
          >
            Easy Apply
          </Button>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            <Button
            // disabled={disabledAskReferralButton}
            className=''
            variant='contained'
            size='large'
            startIcon={<AccountCircleIcon />}
            style={{borderRadius: 5, width: '100%', backgroundColor: '#4943DA', color: 'white', fontWeight: 'bold'}}
            // onClick={() => askReferral()}
          >
            Ask for referral
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default JobCard