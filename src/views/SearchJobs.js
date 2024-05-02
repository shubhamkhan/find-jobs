import React, {useState, useEffect} from 'react';
import { getJobs } from '../service/SearchJobsService';

const SearchJobs = () => {
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
    <div>Search Jobs</div>
  )
}

export default SearchJobs