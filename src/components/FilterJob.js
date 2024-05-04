import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const FilterJob = ({ data, handleFilterJob }) => {
  const [filters, setFilters] = useState({
    role: [],
    minExp: '',
    remote: '',
    location: '',
    minBasePay: '',
    companyName: '',
  });
  
  useEffect(() => {
    handleFilterJob(data);
    filterJobs();
  }, [filters, data])

  const handleFilterChange = (event, key) => {
    setFilters({
      ...filters,
      [key]: event.target ? event.target.value : event,
    });
  };

  const filterJobs = () => {
    const filteredJobs = data.filter(job => {
      return (
        (job.minExp >= parseInt(filters.minExp) || !filters.minExp) &&
          (
            (filters.remote?.toLowerCase() === 'remote') ?
              (job.location?.toLowerCase() === filters.remote?.toLowerCase() || !filters.remote)
            :
              (job.location?.toLowerCase() !== 'remote' || !filters.remote)
          ) &&
        (job.location?.toLowerCase() === filters.location?.toLowerCase() || !filters.location) &&
        ((job.minJdSalary && job.minJdSalary >= parseInt(filters.minBasePay?.replace('L', ''))) || !filters.minBasePay) &&
        (job.companyName?.toLowerCase().includes(filters.companyName?.toLowerCase()) || !filters.companyName) &&
        (filters.role.length === 0 || filters.role.some(selectedRole => selectedRole.toLowerCase() === job.jobRole?.toLowerCase()))
      );
    });
    handleFilterJob(filteredJobs);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '40px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            multiple
            fullWidth
            limitTags={1}
            id="role-filter"
            size="small"
            options={Array.from(new Set(data?.map(job => job.jobRole?.charAt(0).toUpperCase() + job.jobRole?.slice(1))))}
            value={filters.role}
            onChange={(event, newValue) => handleFilterChange(newValue, 'role')}
            renderInput={(params) => <TextField {...params} label="Role" size="small" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            id="min-experience-filter"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            fullWidth
            value={filters.minExp}
            onChange={(event, newValue) => setFilters({ ...filters, minExp: newValue })}
            renderInput={(params) => <TextField {...params} label="Experience" size="small" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            id="remote-on-office-filter"
            options={['Remote', 'Hybrid', 'On-office']}
            fullWidth
            value={filters.remote}
            onChange={(event, newValue) => {
              if(newValue === 'Remote') {
                setFilters({ ...filters, remote: newValue, location: ''});
              } else {
                setFilters({ ...filters, remote: newValue});
              }
            }}
            renderInput={(params) => <TextField {...params} label="Remote/On-office" size="small" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              disabled={filters.remote === 'Remote'}
              label="Location"
              size="small"
              value={filters.location}
              onChange={(event) => handleFilterChange(event, 'location')}
            />
            {filters.location && (
              <IconButton
                aria-label="clear text"
                style={{ position: 'absolute', right: 8, top: 4, height: '30px', width: '30px' }}
                onClick={(event) => {handleFilterChange({ target: { value: '' } }, 'location')}}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            id="min-base-pay-filter"
            options={['0L', '10L', '20L', '30L', '40L', '50L', '60L', '70L']}
            fullWidth
            value={filters.minBasePay}
            onChange={(event, newValue) => setFilters({ ...filters, minBasePay: newValue })}
            renderInput={(params) => <TextField {...params} label="Min Base Pay" size="small" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              label="Company Name"
              value={filters.companyName}
              size="small"
              onChange={(event) => handleFilterChange(event, 'companyName')}
            />
            {filters.companyName && (
              <IconButton
                aria-label="clear text"
                style={{ position: 'absolute', right: 8, top: 4, height: '30px', width: '30px' }}
                onClick={(event) => {handleFilterChange({ target: { value: '' } }, 'companyName')}}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterJob;