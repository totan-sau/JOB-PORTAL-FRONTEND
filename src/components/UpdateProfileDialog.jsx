import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/reduxStore/authSlice';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const changeInputHandler = (e) => {
        setInput(prevInput => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }))
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput(prevInput => ({
            ...prevInput,
            file
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setOpen(false);
            setLoading(false);
        }

    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="fullname">Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                className="col-span-3"
                                value={input.fullname}
                                onChange={changeInputHandler}
                                type="text"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                className="col-span-3"
                                value={input.email}
                                onChange={changeInputHandler}
                                type="email"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                className="col-span-3"
                                value={input.phoneNumber}
                                onChange={changeInputHandler}
                                type="number"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="bio">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                className="col-span-3"
                                value={input.bio}
                                onChange={changeInputHandler}
                                type="text"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="skills">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                className="col-span-3"
                                value={input.skills}
                                onChange={changeInputHandler}
                                type="text"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right" htmlFor="file">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading && <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                        }
                        {
                            !loading && (
                                <>
                                    <Button type="submit" className="w-full my-4">Update</Button>
                                </>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog