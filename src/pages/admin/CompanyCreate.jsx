import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/reduxStore/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const companyNameRef = useRef();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {        
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {
                companyName: companyNameRef.current.value
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
                toast.success(res.data.message);
              }
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name?</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHut, Google etc."
                    ref={companyNameRef}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate