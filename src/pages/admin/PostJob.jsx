import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PostJob() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const { companies } = useSelector(store => store.company);

    const changeInputHandler = (e) => {
        setInput(prevInput => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }))
    }

    const changeSelectHandler = (value) => {
        const selectedCompany = companies.find(company => company.name === value);

        setInput(prevInput => ({
            ...prevInput,
            companyId: selectedCompany._id
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                navigate("/admin/jobs")
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
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.title}
                                name="title"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.description}
                                name="description"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.requirements}
                                name="requirements"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.salary}
                                name="salary"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.location}
                                name="location"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.jobType}
                                name="jobType"
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.experience}
                                name="experience"
                            />
                        </div>
                        <div>
                            <Label>No. of Position</Label>
                            <Input
                                type="number"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                onChange={changeInputHandler}
                                value={input.position}
                                name="position"
                            />
                        </div>
                        {
                            companies.length && (
                                <Select onValueChange={changeSelectHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map(company => (
                                                    <SelectItem key={company._id} value={company.name}>{company.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            )
                        }
                    </div>

                    {
                        loading && <Button className="w-full mt-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                    }
                    {
                        !loading && (
                            <>
                                <Button type="submit" className="w-full mt-4">Post New Job</Button>
                                {
                                    !companies.length && <p className="text-sm text-red-600 font-bold">Please register a company first</p>
                                }
                            </>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob