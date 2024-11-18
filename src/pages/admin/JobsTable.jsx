import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function JobsTable() {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length > 0 && allAdminJobs.filter(job => {
            if(!searchJobByText) {
                return true;
            }

            return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title.toLowerCase().includes(searchJobByText.toLowerCase());
        });

        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>List of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !filterJobs?.length ? <span>No Job yet!</span> : (
                            filterJobs?.map(job => {
                                return (
                                    <TableRow key={job?._id}>
                                        <TableCell>
                                            {job?.company?.name}
                                        </TableCell>
                                        <TableCell>
                                            {job?.title}
                                        </TableCell>
                                        <TableCell>
                                        {job?.createdAt.split("T")[0]}
                                        </TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                                                        <Eye className='w-4' />
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default JobsTable