import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

function LatestJobs() {
    const { allJobs } = useSelector(store => store.job);
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl fon-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length ? allJobs.slice(0, 6).map(item => <LatestJobCards key={item._id} job={item} />) : <span>No Job Available!</span>
                }
            </div>
        </div>
    )
}

export default LatestJobs