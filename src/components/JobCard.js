import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const JobCard = ({
    companyName,
    link,
    uid,
    details,
    role,
    location,
    logo,
    minExp,
    maxExp,
    minSalary,
    maxSalary,
    currencyCode,
    verifySalary,
    postedDay,
}) => {
  const [open, setOpen] = useState(false);
  
  const easyApply = (link, uid) => {
    window.open(link + '/weekdayUid=' + uid, '_blank');
  }

  const askReferral = (email) => {
    window.location.href = `mailto:${email}?subject=Application for Software Engineer Position at weekday.works`;
  }

  const handleShowMore = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleEstimatedSalary = (currencyCode, minSalary, maxSalary) => {
    let ctc = 'Estimated Salary: ₹';
    if (minSalary) {
      ctc += `${minSalary} LPA`;
      if (maxSalary) {
        ctc += ` - ${maxSalary} LPA`;
      }
    } else if (maxSalary) {
      ctc += `${maxSalary} LPA`;
    }
    return ctc;
  }

  const handleExp = (minExp, maxExp) => {
    if (minExp && maxExp) {
      return minExp === maxExp ? `${minExp} years` : `${minExp} - ${maxExp} years`;
    } else if (minExp) {
      return `${minExp} years`;
    } else if (maxExp) {
      return `${maxExp} years`;
    }
    return '';
  }

  return (
    <Paper id="jobCard" elevation={3} style={{display: 'flex', flexWrap: 'wrap', borderRadius: '25px', margin: '2%', padding: '15px 20px'}}>
      <Grid container spacing={4}>
        <Grid md={12} sm={12} xs={12} style={{padding: '32px 10px 5px 32px'}}>
          <Stack direction="row" spacing={1}>
            <Chip avatar={<HourglassTopIcon fontSize="small" style={{color: '#58322B'}} />} size="small" label={postedDay > 1 ? ('Posted ' + postedDay + ' day ago') : ('Posted a day ago')} style={{fontSize: '10px', backgroundColor: 'white', border: '1px solid rgb(230, 230, 230)' ,boxShadow: 'rgba(6, 6, 6, 0.05) 0px 2px 6px 0px'}} />
          </Stack>
        </Grid>
        <Grid md={12} sm={12} xs={12} style={{padding: '10px 32px 5px 32px'}}>
          <span style={{display: 'flex', alignItems: 'center'}}>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Company Name" src={logo} /> 
            </Stack>
            <span style={{display: 'grid', marginLeft: 10}}>
              <span style={{fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px', color: '#8b8b8b'}}>{companyName}</span>
              <span style={{textTransform: 'capitalize', fontSize: '14px', lineHeight: '1.5'}}>{role} engineer</span>
              <span style={{textTransform: 'capitalize', fontSize: '11px', fontWeight: '500', marginTop: '5px'}}>{location}</span>
            </span>
          </span>
        </Grid>
        <Grid md={12} sm={12} xs={12} style={{padding: '5px 32px 5px 32px'}}>
          <span style={{fontSize: '14px', fontWeight: 400, lineHeight: '1.43', color: '#4d596a'}}>
            {handleEstimatedSalary(currencyCode, minSalary, maxSalary)}
            {
              verifySalary ? (
                <Tooltip title="Offered salary range" placement="top">
                  <CheckBoxIcon fontSize="small" style={{color: '#16C60C', marginBottom: '-4px', marginLeft: '5px'}} />
                </Tooltip>
              ) : (
                <Tooltip title="Estimated by Weekday. Not provided by employer" placement="top">
                  <WarningIcon fontSize="small" style={{color: '#FADF00', marginBottom: '-4px', marginLeft: '5px'}} />
                </Tooltip>
              )           
            }
          </span>
        </Grid>
        <Grid md={12} sm={12} xs={12} style={{padding: '10px 32px 5px 32px'}}>
          <span style={{fontSize: '1rem', lineHeight: '1.5', fontWeight: '500'}}>About Company:</span>
          <div style={{fontSize: '.80rem', lineHeight: '1', fontWeight: 'bolder', padding: '5px 0px'}}>About us</div>
          <div style={{position: 'relative', overflow: 'hidden'}}>
            <div style={{maskImage: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))', whiteSpace: 'pre-wrap', fontSize: '14px'}}>
              {details.substring(0, 500)}
            </div>
          </div>
          <span style={{display: 'flex', justifyContent: 'center', margin: '-20px 0px -40px 0px'}}>
            <Button onClick={handleShowMore} color="primary" style={{backgroundColor: 'transparent', textTransform: 'none'}}>
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
        <Grid md={12} sm={12} xs={12} style={{padding: '25px 32px 5px 32px', height: '85px'}}>
          {
            handleExp(minExp, maxExp) !== '' ? (
              <>
                <p style={{fontSize: '13px', fontWeight: 600, letterSpacing: '1px', marginBottom: '3px', color: '#8b8b8b'}}>Experience:</p>
                <span style={{fontSize: '14px', lineHeight: '1.5',}}>{handleExp(minExp, maxExp)}</span>
              </>
            ) : null
          }
        </Grid>
        <Grid md={12} sm={12} xs={12} style={{padding: '5px 0px 5px 32px'}}>
          <Button
            // disabled={disabledApplyButton}
            className=''
            variant='contained'
            size='large'
            target="_blank"
            startIcon={<ElectricBoltIcon style={{color: '#ffc400'}} />}
            style={{borderRadius: 5, width: '100%', backgroundColor: '#55EFC4', color: 'black', fontWeight: 'bold', textTransform: 'none'}}
            onClick={() => easyApply(link, uid)}
          >
            Easy Apply
          </Button>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            <Button
            // disabled={disabledAskReferralButton}
            target="_blank"
            className=''
            variant='contained'
            size='large'
            startIcon={<AccountCircleIcon />}
            style={{borderRadius: 5, width: '100%', backgroundColor: '#4943DA', color: 'white', fontWeight: 'bold', textTransform: 'none', marginTop: '-20px'}}
            onClick={() => askReferral('weekday@works.com')}
          >
            Ask for referral
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default JobCard