import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function Courses() {
    const navigate = useNavigate()
  return (
    <div className='flex min-h-screen bg-gray-100'>
        <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
        <div className='flex items-center justify-center gap-3'>
            <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer ' onClick={()=>navigate("/dashboard")}/>
            <h1 className='text-2x1 font-semibold '>All Created Courses</h1>


        </div>
        <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500 ' onClick={()=>navigate("/createcourse")}>Create Course</button>
      </div>
        <div className='hidden md:block bg-white rounded-x1 shadow p-4 overflow-x-auto'>
            {/* for large screen table */}

            <table className='min-w-full text-sm'>
                <thead className=' border-b bg-gray-50'>
                    <tr>
                        <th className='text-left py-3 px-4'>Courses</th>
                        <th className='text-left py-3 px-4'>Price</th>
                        <th className='text-left py-3 px-4'>Status</th>
                        <th className='text-left py-3 px-4'>Action</th>
                    </tr>

                </thead>
            </table>
        </div>
        <div >
             {/* for small screen table */}
        </div>
        </div>
    </div>
  )
}

export default Courses