import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/reduxStore/companySlice'

function Companies() {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(searchText));
    }, [searchText]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies