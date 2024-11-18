import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function CompanySetup() {
  const [loading, setLoading] = useState(false);
  const params = useParams();  
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector(store => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const changeInputHandler = (e) => {
    setInput(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }))
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput(prevInput => ({
      ...prevInput,
      file
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/admin/companies")
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: singleCompany.file || null
    })
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                className="my-2"
                placeholder="JobHut, Google etc."
                onChange={changeInputHandler}
                name="name"
                value={input.name}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                className="my-2"
                placeholder="Description"
                onChange={changeInputHandler}
                name="description"
                value={input.description}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                className="my-2"
                placeholder="Website"
                onChange={changeInputHandler}
                name="website"
                value={input.website}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                className="my-2"
                placeholder="Location"
                onChange={changeInputHandler}
                name="location"
                value={input.location}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                className="my-2"
                onChange={changeFileHandler}
                accept="image/*"
              />
            </div>
          </div>
          {
            loading && <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
          }
          {
            !loading && (
              <Button type="submit" className="w-full my-8">Update</Button>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default CompanySetup