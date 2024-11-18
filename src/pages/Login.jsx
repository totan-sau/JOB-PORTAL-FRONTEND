import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { setLoading, setUser } from '@/reduxStore/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeInputHandler = (e) => {
    setInput(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if(res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if(user) {
      navigate("/");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-grey-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='text'
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeInputHandler}
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeInputHandler}
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                  id="role1"
                  checked={input.role === 'student'}
                  onChange={changeInputHandler}
                />
                <Label htmlFor="role1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="cursor-pointer"
                  id="role2"
                  checked={input.role === 'recruiter'}
                  onChange={changeInputHandler}
                />
                <Label htmlFor="role2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading && <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
          }
          {
            !loading && (
              <>
                <Button type="submit" className="w-full my-4">Login</Button>
                <span className='text-sm'>Don't have an account? <Link className="text-blue-600" to="/signup">Signup</Link></span>
              </>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default Login