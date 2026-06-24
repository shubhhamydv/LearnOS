import React from 'react'
import about from '../assets/about.jpg'
import video from '../assets/vieo.mp4'
import {TfiLayoutLineSolid} from 'react-icons/tfi'
import { BsFillPatchCheckFill } from 'react-icons/bs'

function About() {
  return (
    <div className='w-full lg:h-[70vh] min-h-[50vh] flex flex-col items-center justify-center gap-2 mb-8'>
        {/* for image */}
        <div className='lg:w-2/5 md:w-4/5 w-full h-full flex items-center justify-center relative'>
            <img src={about} alt="" className='w-4/5 h-auto rounded-lg' />
          <div className='max-w-sm mx-auto p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <video src={video} className='w-full rounded-xl shadow-lg border-2 border-white' controls autoPlay loop/>
          </div>
        </div>

        {/* for about info */}
        <div className='lg:w-1/2 md:w-3/4 w-full h-full flex items-start justify-center flex-col px-8 md:px-20'>

            <div className='flex text-lg items-center justify-center gap-5'>About Us <TfiLayoutLineSolid className='w-10 h-10'/> </div>
            <div className='md:text-4xl text-3xl font-semibold'>We Are Maximize Your Learning Growth</div>
            <div className='text-sm'>We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently</div>

           <div className='w-full lg:w-3/5'>
            <div className='flex items-center justify-between mt-10'>
                <div className='flex items-center justify-center gap-2.5'><BsFillPatchCheckFill className='w-5 h-5'/>Simplified Learning</div>
                  <div className='flex items-center justify-center gap-2.5'><BsFillPatchCheckFill className='w-5 h-5'/> Expert Trainer</div>
                  </div>
                  <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center justify-center gap-2.5'><BsFillPatchCheckFill className='w-5 h-5'/>Big Experience </div>
                      <div className='flex items-center justify-center gap-2.5'><BsFillPatchCheckFill className='w-5 h-5'/>LifeTime Access</div>

            </div>
           </div>
        </div>

    </div>
  )
}

export default About