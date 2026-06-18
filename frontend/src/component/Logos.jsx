import React from 'react'
import { MdCastForEducation, MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from 'react-icons/si';
import {FaSackDollar} from 'react-icons/fa6'
import {BiSupport} from 'react-icons/bi'
import { FaUser } from 'react-icons/fa6';

function Logos() {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:-[50px]'>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer '>
            <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]'/>
            20K+ online Courses</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer '>
            <SiOpenaccess className='w-[35px] h-[35px] fill-[#03394b]'/>
            Lifetime Access</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer '>
            <FaSackDollar className='w-[35px] h-[35px] fill-[#03394b]'/>
            Value for money</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer '>
            <BiSupport className='w-[35px] h-[35px] fill-[#03394b]'/>
            Lifetime support</div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer '>
            <FaUser className='w-[35px] h-[35px] fill-[#03394b]'/>
            Community Support</div>

        
    </div>
  )
}

export default Logos