import FilterCard from '@/components/FilterCard'
import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Jobs() {
    const { allJobs, browseJob } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (browseJob) {
            const filteredJobs = allJobs.filter(job => {
                return job.title.toLowerCase().includes(browseJob.toLowerCase()) || job.description.toLowerCase().includes(browseJob.toLowerCase()) || job.location.toLowerCase().includes(browseJob.toLowerCase())
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, browseJob])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        !filterJobs.length ? <span>Job Not Found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }} className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map(item => (
                                            <Job key={item?._id} job={item} />
                                        ))
                                    }
                                </motion.div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs