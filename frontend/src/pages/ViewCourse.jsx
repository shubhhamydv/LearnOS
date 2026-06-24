import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux' // FIXED: useDispatch import missing tha
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../redux/courseSlice'
import { useEffect } from 'react'
import img from "../assets/empty.jpg"
import { FaStar } from "react-icons/fa6";
import { FaPlayCircle } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa6'
import axios from 'axios'
import { serverUrl } from '../App'
import Card from '../component/Card'
import { toast } from 'react-toastify'
 

function ViewCourse() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const { courseData } = useSelector(state => state.course)
  const { selectedCourse } = useSelector(state => state.course)
  const { userData } = useSelector(state => state.course)
  const dispatch = useDispatch()
  const [seletedlecture, setSelectedLecture] = useState(null)

  const [creatorData, setCreatorData] = useState(null)
  const [creaotrCourses, setCreatorCourses] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    const handleCreator = async () => {
      try {
        if(selectedCourse?.creator){
       const result  = await axios.post(serverUrl +"/api/course/creator " ,{userId:selectedCourse?.creator},{withCredentials:true}
       )
       console.log(result.data)
       setCreatorData(result.data)
    }
      } catch (error) {
        console.log(error)
      }
    }
    handleCreator()
  }, [selectedCourse])

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(c =>
      (typeof c === 'string' ? c : c._id).toString() ===
      courseId?.toString()
    )
    if (verify) {
      setIsEnrolled(true)
    }
  }


  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course))
        console.log(selectedCourse)
        return null
      }
    })
  }
  useEffect(() => {
    fetchCourseData()
    checkEnrollment()
  }, [courseData, courseId, userData])

  useEffect(()=>{
    if(creatorData?.id && courseData.lecture > 0){
      const creatorCourse = courseData.filter((course)=>course.creator === creatorData?._id && course._id !== courseId)
    }
    setCreatorCourses(creaotrCourse)
  },[creatorData,courseData])

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
        {/*top section */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* thumbnail*/}

          <div className='w-full md:w-1/2'>
         < FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer ' onClick={()=>Navigate("/")}/>
         {
  selectedCourse?.thumbnail ? (
    <img
      src={selectedCourse.thumbnail}
      alt=""
      className="rounded-xl w-full object-cover"
    />
  ) : (
    <img
      src={img}
      alt=""
      className="rounded-xl w-full object-cover"
    />
  )
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
            <div className='flex items-start flex-col justify-between'>

              <div className='text-yellow-500 font-medium flex gap-2'>

                <span className='flex items-center justify-start gap-1'><FaStar />{" "}5</span>
                <span className='text-gray-400'>(1,200 Reviews)</span>
              </div>
              <div className='text-x1 font-semibold text-black'>
                <span>{selectedCourse?.price}</span>{" "}
                <span className='line-through text-sm text-gray-400 '>₹599</span>
              </div>

              <ul className='text-sm text-gray-700 space-y-1 pt-2'>

                <li>✅ 10+ hours of video content </li>
                <li>✅ Lifetime access to course materials</li>
              </ul>

              {!isEnrolled ? <button className='bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer' onClick={() => handleEnroll(userData._id, courseId)}>Enroll Now</button> :
                <button className='bg-green-100 text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer' onClick={() => navigate(`/viewlecture/${courseId}`)}>Watch Now</button>}

            </div>

          </div>




        </div>

        <div >
          <h2 className='text-x1 font-semibold mb-2'>What You'll Learn</h2>
          <ul className='list-disc pl-6 text-gray-700 space-y-1'>
            <li>learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        <div>
          <h2 className='text-x1 font-semibold mb-2'>Who This Course is For</h2>
          <p className='text-gray-700'>Beginners, aspiring developers, and professionals looking to updrage skills.</p>
        </div>
        <div className=' flex flex-col md:flex-row gap-6'>
          <div className='bg-white w-full md:w-2/5 p-6 rounded-2x1
      shadow-lg border border-gray-200'>
        <h2 className='text-x1 font-bold mb-4'>Course Curriculum</h2>
        <p className='text-sm text-gray-500 mb-4'>{selectedCourse?.lectures?.length} Leatures</p>

        <div className=' flex flex-col gap-3'>
          {selectedCourse?.lectures?.map((lecture,index)=>(
            <button key={index} onClick={()=>{
              if(!lecture.isPreviewFree){
                setSelectedLecture(lecture)
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture.isPreviewFree? "hover:bg-gray-100 cursor-pointer border-gray-300":" cursor-not-allowed opacity-60 border-gray-200"} ${seletedlecture?.lectureTitle ===lecture?.lectureTitle ? " bg-gray-100 border-gray-400":""}` } >
              <span className='text-lg text-gray-700'>{lecture.isPreviewFree? <FaPlayCircle/>:<FaLock/>}</span>
              <span className='text-sm font-medium text-gray-800
              '>{lecture.lectureTitle}</span>
                </button>
              ))}
            </div>
          </div>

          <div className='bg-white w-full md:w-3/5 p-6 rounded-2x1 shadow-lg border border-gray-200 '>
            <div className='aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center'>{
              seletedlecture?.videoUrl ? <video className='w-full h-full object-cover' src={seletedlecture?.videoUrl} controls /> :
                <span className='text-white text-sm'>Select a preview lecture to watch</span>}</div>

          </div>
        </div>

     <div className='mt-8 border-t pt-6'>
      <h2 className='text-x1 font-semibold mb-2'>Write a Reviews</h2>
      <div className='mb-4'>
        <div className='flex gap-1 mb-2'>
           {
            [1,2,3,4,5].map((star)=>{
              <FaStar key={star}className='fill-gray-300'/>
            })
           }
        </div>
        <textarea name="" id=""className='w-full border border-gray-300 rounded-lg p-2' placeholder=' Write your review here...'
         row={3}
        />
        <button className='bg-black text-white mt-3 px-4 py-2 hover:bg-gray-800 '>Submit Review</button>
        
      </div>
     </div>
    
      {/* for creator info */}

        <div className='flex items-center gap-4 pt-4 border-t'>
          {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} className='border-1 border-gray-200 w-16 h-16 rounded-full object-cover' /> : <img src={img} className=' border-1 border-gray-200 w-16 h-16 rounded-full object-cover' />}

          <div >
            <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
            <p className='md:text-sm text-gray-600 text-[10px] '>{creatorData?.description}</p>
            <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>
          </div>
        </div>
        <div>
          <p className='text-x1 font-semibold mb-2 '>Other Published Courses bt the Educator -</p>
        </div>
        <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>

          {
            creaotrCourses?.map((course,index)=>(
              <Card thumbnail={course.thumbnail} id={course._id} price={course.price} category={course.category}/>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default ViewCourse