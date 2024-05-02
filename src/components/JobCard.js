import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningIcon from '@mui/icons-material/Warning';

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
  const [open, setOpen] = useState(false);
  
  const easyApply = (link, uid) => {
    window.location.href = link + '/weekdayUid=' + uid;
  }
  const handleShowMore = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper id="jobCard" elevation={3} style={{display: 'flex', flexWrap: 'wrap', margin: '2%', padding: '15px 20px'}}>
      <Grid container spacing={4}>
        <Grid item md={12} sm={12} xs={12}>
          {role} Developer
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {location}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <span>Estimated Salary: </span>{currencyCode} {minSalary} LPA - {currencyCode} {maxSalary} LPA <Tooltip title="Estimated by Weekday. Not provided by employer" placement="top">
            <WarningIcon fontSize="small" style={{color: '#ffc400', marginBottom: "-4px"}} />
          </Tooltip>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <span style={{fontSize: '1rem', lineHeight: '1.5', fontWeight: '500'}}>About Company:</span>
          <div style={{position: 'relative', overflow: 'hidden'}}>
            <div style={{maskImage: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))', whiteSpace: 'pre-wrap', fontSize: '14px'}}>
              {details.substring(0, 500)}
            </div>
          </div>
          <span style={{display: 'flex', justifyContent: 'center', margin: '-20px 0px -40px 0px'}}>
            <Button onClick={handleShowMore} color="primary">
              Show more
            </Button>
          </span>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{textAlign: 'center', fontSize: '1.25rem', lineHeight: '1.6', fontWeight: '600'}}>Job Description</DialogTitle>
            <DialogContent>
              <p style={{fontSize: '1rem', lineHeight: '1.5', fontWeight: '500'}}>About Company:</p>
              <span style={{fontSize: '14px'}}>{details}</span>
            </DialogContent>
          </Dialog>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <p>Experience:</p>
          <span>{minExp} - {maxExp} years </span>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
      <Button
        // disabled={disabledApplyButton}
        className=''
        variant='contained'
        size='large'
        startIcon={<ElectricBoltIcon />}
        style={{borderRadius: 5, width: '100%', backgroundColor: '#55EFC4', color: 'black', fontWeight: 'bold'}}
        onClick={() => easyApply(link, uid)}
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