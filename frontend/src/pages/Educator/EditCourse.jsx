import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function EditCourse() {
  const navigate = useNavigate()
  const [isPublished, setIsPublished] = useState(false)
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top  bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/courses")} />

        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add Detail Information regarding the Course
        </h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded-md'>Go to Lecture page</button>
        </div>

      </div>

      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1' onClick={() => setIsPublished(prev => !prev)}>Click to Publish</button> :
            <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={() => setIsPublished(prev => !prev)}>Click to UnPublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md'>Remove Course</button>
        </div>
 
 <form className='space-y-6'>
  <div>
    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
    <input id='title' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='CourseTitle'/>
  </div>

   <div>
    <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
    <input id='subtitle' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle'/>
  </div>

   <div>
    <label htmlFor="des" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
    <textarea id='des' type="text" className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Course Description'></textarea>
  </div>

  
 </form>
      </div>
    </div>
  )
}

export default EditCourse