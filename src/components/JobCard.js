import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2%',
    padding: '15px 20px',
  }
}));

const JobCard = () => {
  const classes = useStyles();

  return (
    <Paper id="jobCard" elevation={3} className={classes.cardContainer}>
      <Grid container spacing={4}>
        <Grid item md={12} sm={12} xs={12}>
          <Button
            // disabled={disabledApplyButton}
            className=''
            variant='contained'
            size='large'
            startIcon={<AccountCircleIcon />}
            style={{borderRadius: 5, width: '100%', backgroundColor: '#4943DA', color: 'white', fontWeight: 'bold'}}
          >
            Ask for referral
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default JobCard