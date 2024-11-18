import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobs() {
    const {allAppliedJobs} = useSelector(store => store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Caompany</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length && allAppliedJobs.map(appliedJob => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob.createdAt.split('T')[0]}</TableCell>
                                <TableCell>{appliedJob.job.title}</TableCell>
                                <TableCell>{appliedJob.job.company.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedJob.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobs