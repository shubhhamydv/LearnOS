import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import img from "../../assets/empty.jpg"
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditCourse() {
  const navigate = useNavigate()
  const {courseId} = useParams()
  const thumb = useRef()
  const [isPublished, setIsPublished] = useState(false)
const [selectCourse,setSelectCourse] = useState(null)
const [title,setTitle] = useState("")
const [subTitle,setSubTitle] = useState("")
const [Description,setDescribtion] = useState("")
const [category,setCategory ] = useState("")
const [level,setLevel] = useState("")
const [frontendImage,setFrontendImage] = useState(img)
const [backendImage,setBackendImage] = useState("")
const [price ,setPrice] = useState("")
const [loading,setLoading] = useState(false)
const [loading1,setLoading1] = useState(false)


const handleThumbnail = (e)=>{
  const file = e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))

}


const getCourseById = async (req,res) => {
  try {
    const result = await axios.get(serverUrl+`/api/course/getcourse/${courseId}`,{withCredentials:true})
    setSelectCourse(result.data)
    console.log(result.data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  if(selectCourse){
    setTitle(selectCourse.title || "")
    setSubTitle(selectCourse.subTitle || "")
    setDescribtion(selectCourse.description || "")
    setLevel(selectCourse.level || "")
    setPrice(selectCourse.price || "")
    setFrontendImage(selectCourse.thumbnail || "")
    setIsPublished(selectCourse?.isPublished )
   
  }
},[selectCourse])

useEffect(()=>{
  getCourseById()
},[])


const handleEditCourse = async (req,res) => {
  setLoading(true)
 const formData = new formData()
 formData.append('title' ,title)
 formData.append('subTitle', subTitle)
 formData.append('description',description)
 formData.append('category',category)
 formData.append('level',level)
 formData.append('price',price)
 formData.append(thumbnail,backendImage)
 formData.append('isPublished',isPublished)
  try {
    const result = await axios.post(serverUrl+`/api/course/editcourse/${courseId},`,formData,{withCredentials:true})
    console.log(result.data)
    setLoading(false)
    navigate("/courses")
    toast.success("course Updated")
  } catch (error) {
    console.log(error)
    setLoading(flase)
    toast.error(error.response.data.message)
  }
}
    const handleRemoveCourse = async()=>{
       setLoading1(true)
      try {
        const result = await axiios.delete(serverUrl + `/api/course/remove/${courseId}`, {withCredentials:true})
        console.log(result.data)
        setLoading1(false)
        toast.success("Course Removed")
        navigate("/courses")
       
      } catch (error) {
        console.log(error)
        setLoading1(false)
        toast.error(error.response.data.message)
        
      }
    }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong
          className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer'
          onClick={() => navigate("/courses")}
        />

        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add Detail Information regarding the Course
        </h2>

        <div className='space-x-2 space-y-2'>
          <button
            type="button"
            className='bg-black text-white px-4 py-2 rounded-md'
          >
            Go to Lecture page
          </button>
        </div>
      </div>

      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>
          Basic Course Information
        </h2>

        <div className='space-x-2 space-y-2'>
          {!isPublished ? (
            <button
              type="button"
              className='bg-green-100 text-green-600 px-4 py-2 rounded-md border'
              onClick={() => setIsPublished(prev => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              type="button"
              className='bg-red-100 text-red-600 px-4 py-2 rounded-md border'
              onClick={() => setIsPublished(prev => !prev)}
            >
              Click to UnPublish
            </button>
          )}

          <button
            type="button"
            className='bg-red-600 text-white px-4 py-2 rounded-md'
            onClick={handleRemoveCourse}
          >
            Remove Course
          </button>
        </div>

        <form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label
              htmlFor="title"
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Title
            </label>

            <input
              id='title'
              type="text"
              className='w-full border px-4 py-2 rounded-md'
              placeholder='Course Title' onChange={(e)=>setTitle(e.target.value)} value={title}
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className='block text-sm font-medium text-gray-700 mb-1'onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}
            >
              Subtitle
            </label>

            <input
              id='subtitle'
              type="text"
              className='w-full border px-4 py-2 rounded-md'
              placeholder='Course Subtitle'
            />
          </div>

          <div>
            <label
              htmlFor="des"
              className='block text-sm font-medium text-gray-700 mb-1'onChange={(e)=>setDescribtion(e.target.value)} value={description}
            >
              Description
            </label>

            <textarea
              id='des'
              className='w-full border px-4 py-2 rounded-md h-24 resize-none'
              placeholder='Course Description'
            ></textarea>
          </div>

          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* category */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'> onChange={(e)=>setCategoryc(e.target.value)} value={category}
                Course Category
              </label>

              <select className='w-full border px-4 py-2 rounded-md bg-white'>
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* level */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'onChange={(e)=>setLevel(e.target.value)} value={level}>
                Course Level
              </label>

              <select className='w-full border px-4 py-2 rounded-md bg-white'>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* price */}
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Course Price (INR)
              </label>

              <input
                type="text"
                id='price'
                className='w-full border px-4 py-2 rounded-md'
                placeholder='₹' onChange={(e)=>setPrice(e.target.value)} value={price}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Course Thumbnail
              </label>

              <input
                type="file"
                hidden
                ref={thumb}
                accept='image/*'
              onChange={handleThumbnail}/>
            </div>
          </div>

          <div className='relative w-[300px] h-[170px]'>
            <img
              src={frontendImage}
              alt="thumbnail"
              className="w-full h-full border border-black rounded-[5px] cursor-pointer"
              onClick={() => thumb.current.click()}
            />

            <FaEdit
              className='w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer'
              onClick={() => thumb.current.click()}
            />
          </div>

          <div className='flex items-center justify-start gap-[15px]'>
            <button
              type="button"
              className='bg-[#e9e8e8] hover:bg-red-200 text-black border cursor-pointer px-7 py-2 rounded-md'
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer'onClick={handleEditCourse}
            >
             { loading ? <ClipLoader size={30} color='white'/>: Save}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCourse