import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { ClipLoader } from 'react-spinners'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'

function CreateLecture() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [lectureTitle, setLectureTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const lectureState = useSelector((state) => state.lecture)
  const lectureData = lectureState?.lectureData || []

  const handleCreateLecture = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Please enter lecture title")
      return
    }

    setLoading(true)

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      )

      console.log(result.data)

      dispatch(
        setLectureData([...lectureData, result.data.lecture])
      )

      toast.success("Lecture Added")
      setLectureTitle("")
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        )

        console.log(result.data)

        dispatch(setLectureData(result.data.lectures || []))
      } catch (error) {
        console.log(error)
      }
    }

    getCourseLecture()
  }, [courseId, dispatch])

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              Let's Add a Lecture
            </h1>

            <p className="text-sm text-gray-500">
              Enter the title of your lecture to enhance your course content.
            </p>
          </div>

          {/* Input */}
          <input
            type="text"
            className="w-full border border-gray-300 focus:ring-2 rounded-md p-3 text-sm focus:outline-none focus:ring-blue-400 mb-4"
            placeholder="e.g Introduction to MERN Stack"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
              onClick={() => navigate(`/editcourse/${courseId}`)}
            >
              <FaArrowLeftLong />
              Back to Course
            </button>

            <button
              className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-700 transition-all text-sm font-medium shadow"
              disabled={loading}
              onClick={handleCreateLecture}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "+ Create Lecture"
              )}
            </button>
          </div>

          {/* Lecture List */}
          <div className="space-y-2">
            {lectureData?.length > 0 ? (
              lectureData.map((lecture, index) => (
                <div
                  key={lecture._id || index}
                  className="bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700"
                >
                  <span>
                    Lecture - {index + 1}: {lecture.lectureTitle}
                  </span>

                  <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No lectures added yet.
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateLecture