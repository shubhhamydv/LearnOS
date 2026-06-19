import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcreatorCourseData } from '../redux/courseSlice'
import { serverUrl } from '../App'

function getCreatorCourse() {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
  return (
    useEffect(()=>{
        const creatorCourses = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/course/getcreator",{withCredentials:true})
                console.log(result.data)
                dispatch(setcreatorCourseData(result.data))


            } catch (error) {
                console.log(error)
                
            }

        }
        creatorCourses()
    },[userData])
  )
}

export default getCreatorCourse