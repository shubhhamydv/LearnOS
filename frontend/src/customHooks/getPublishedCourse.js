import React from 'react'
import { useEffect } from 'react'

const getPublishedCourse = () => {
   useEffect(()=>{
    const getCourseData = async() =>{
        try{
            const result = await axios.get(serverUrl + "/api/course/getpublished", {withCredentials:true})
            dispatchEvent(setCourseData(result.data))
            console.log(result.data)
        } catch(error){
            console.log(error)
        }
    }
    getCourseData()
   },[])
}

export default getPublishedCourse
