import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompanies = companies.length > 0 && companies.filter(company => {
            if(!searchCompanyByText) {
                return true;
            }

            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });

        setFilterCompany(filteredCompanies)
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>List of your companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !filterCompany?.length ? <span>No Company yet!</span> : (
                            filterCompany?.map(company => {
                                return (
                                    <TableRow key={company?._id}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={company?.logo} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            {company?.name}
                                        </TableCell>
                                        <TableCell>
                                        {company?.createdAt.split("T")[0]}
                                        </TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
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

export default CompaniesTable