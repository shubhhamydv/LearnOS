import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

function MyEnrolledCourses() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    return (
        <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
            <FaArrowLeftLong
                className='absolute top-[3%] md:top-[6%] left-[5%] w-[22%] cursor-pointer'
                onClick={() => navigate("/")}
            />

            <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>
                My enrolled Courses
            </h1>

            {
                userData?.enrolledCourses?.length === 0 ? (
                    <p className='text-gray-500 text-center w-full'>
                        You haven't enrolled in any courses yet.
                    </p>
                ) : (
                    userData?.enrolledCourses?.map((course, index) => (
                        <div key={index} className='bg-white rounded-2x1 shadow-md overflow-hidden border'>
                            <img src={course?.thumbnail} alt=""  className='w-full h-40 object-cover '/>
                            <div className='p-4'>
                                <h2 className='text-lg font-semibold text-gray-800 '>{course?.title}</h2>
                                <p className='text-sm text-gray-600 mb-2 '>{course?.category} </p>
                                <p className='text-sm text-gray-600 mb-2'>{course?.level}</p>
                                <h1 className='px-[10px] text-center  py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px]  font-light flex items-center justify-center gap-2 cursor-pointer mt-[10px] hover:bg-gra-60 'onClick={()=>navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default MyEnrolledCourses