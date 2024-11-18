import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import JobsTable from './JobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/reduxStore/jobSlice'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

function Jobs() {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(searchText));
    }, [searchText]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name or role"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} className>New Job</Button>
                </div>
                <JobsTable />
            </div>
        </div>
    )
}

export default Jobs