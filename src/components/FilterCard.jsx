import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setBrowseJob } from '@/reduxStore/jobSlice';

const filterData = [
    {
        type: "Location",
        area: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        type: "Industry",
        area: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        type: "Salary",
        area: ["0-40k", "42k-1lakh", "1lakh-51lakh"]
    }
];
function FilterCard() {
    const [filterValue, setFilterValue] = useState("");
    const dispatch = useDispatch();
    const handleFilterChnage = (value) => {
        setFilterValue(value);
    }

    useEffect(() => {
        dispatch(setBrowseJob(filterValue));
    }, [filterValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={filterValue} onValueChange={handleFilterChnage}>
                {
                    filterData.map((item, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{item.type}</h1>
                            {
                                item.area.map((item1, index1) => {
                                    const uniqueId = `id${index}-${index1}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={index1}>
                                            <RadioGroupItem key={index1} value={item1} id={uniqueId} />
                                            <Label htmlFor={uniqueId}>{item1}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard