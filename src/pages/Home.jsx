import CategoryCarousel from '@/components/CategoryCarousel'
import HeroSection from '@/components/HeroSection'
import LatestJobs from '@/components/LatestJobs'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home