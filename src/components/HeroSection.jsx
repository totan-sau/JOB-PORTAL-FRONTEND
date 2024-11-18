import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setBrowseJob } from '@/reduxStore/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const browseJobHandler = () => {
        dispatch(setBrowseJob(query));
        navigate('/browse-jobs');
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 JOb Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat asperiores distinctio, porro quibusdam rerum et autem soluta, corrupti ea vero incidunt, animi perspiciatis ex quia excepturi maxime voluptate hic amet?</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input 
                        type='text'
                        placeholder='Find your dream Jobs'
                        className='outline-none border-none w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={browseJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection