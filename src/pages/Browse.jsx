import Job from '@/components/Job';
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setBrowseJob } from '@/reduxStore/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Browse() {
    useGetAllJobs();
    const {allJobs} = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setBrowseJob(""));
        }
    }, []);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map(job => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse