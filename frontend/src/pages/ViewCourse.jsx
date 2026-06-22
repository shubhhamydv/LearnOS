import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../redux/courseSlice'
import { useEffect } from 'react'
import img from "../assets/empty.jpg"

function ViewCourse() {
  const navigate = useNavigate()
  const {courseId} =useParams()
  const {courseData} = useSelector(state=>state.course)
  const { selectedCourse } = useSelector(state=>state.course)
  const dispatch = useDispatch()

  const fetchCourseData =async()=>{
    courseData.map((course)=>{
      if(course._id === courseId){
        dispatch(setSelectedCourse(course))
        console.log(selectedCourse)
        return null
      }
    })
  }
  useEffect(()=>{
    fetchCourseData()
  },[courseData,courseId])

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
        {/*top section */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* thumbnail*/}

          <div className='w-full md:w-1/2'>
         < FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer ' onClick={()=>Navigate("/")}/>
         { selectedCourse?.<img src={selectedCourse?.thumbnail} alt="" className= "rounded-xl w-full object-cover" /> :
         <img src={ img} alt="" className= "rounded-xl w-full object-cover"  />
         }
          </div>

          {/* courseInfo */}
          <div className='flex-1 space-y-2 mt--[20px]  '>
            <h2 className='text-2xl font-bold'>
              {selectedCourse?.title}
            </h2>
            <p className='text-gray-600'>
              {selectedCourse?.subTitle}
            </p>
            <div className='flex items-start flex-col'>

            </div>

          </div>


            </div>


      </div>

    </div>
  )
}

export default ViewCourse