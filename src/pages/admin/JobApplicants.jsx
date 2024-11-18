import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import JobApplicantsTable from './JobApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/reduxStore/applicationSlice'
import { toast } from 'sonner'

function JobApplicants() {
    const params = useParams();
    const dispatch = useDispatch();
    const { allApplicants } = useSelector(store => store.application)
    useEffect(() => {
        
        const fetchAllApplicants = async () => {
            try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                withCredentials: true
              });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
              toast.error(error.response.data.message);
            }
        }
        fetchAllApplicants();
        
    }, []);
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({allApplicants.applications.length})</h1>
            <JobApplicantsTable />
        </div>
    </div>
  )
}

export default JobApplicants