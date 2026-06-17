

import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

export const getCurrentUser = () => {

    const dispatch =useDispatch()
 useEffect(()=>{
   const fetchUser = async () => {
    try {
        const result = await axios.get(serverUrl+"/api/user/getcurrentuser",{withCredentials:true})

        dispatch(setUserData(result.data))

    } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
    }
   }
   fetchUser()
 },[])
}

export default getCurrentUser
