import { setAllAppliedJobs } from "@/reduxStore/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAplliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {});
                              
                if(res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch(error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs();
    }, []);
}

export default useGetAplliedJobs;