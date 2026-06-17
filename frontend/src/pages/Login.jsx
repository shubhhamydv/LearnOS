import React from 'react'
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { IoEyeOutline } from "react-icons/io5"
import { IoEye } from "react-icons/io5"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase'

function Login() {
  const [show, setShow] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handleLogin = async (params) => {
    setLoading(true)
    try {
        const result = await axios.post(serverUrl+"/api/auth/login" ,{email,password},{withCredentials:true})
        dispatch(setUserData(result.data))
        setLoading(false)
         toast.success("Login Successfully")
         navigate("/")
    } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error(error.response.data.message)
    }
  }

    const googleLogin = async ()=>{
        try {
            const response = await signInWithPopup(auth,provider)
            let user = response.user
            let name = user.displayName
            let email = user.email
            let role = ""

            const result = await axios.post(serverUrl +"/api/auth/googleauth",{name,email,role},
                {withCredentials:true})
                dispatch(setUserData(result.data))
                navigate("/")
                toast.success("Signup Successfully")



        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center gap-3'>
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'onSubmit={(e)=>e.preventDefault}>
        
        {/* Left div */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
          <div>
            <h1 className='font-semibold text-[black] text-2xl'>Welcome Back,</h1>
            <h2 className='text-[#999797] text-[18px]'>Login in your account</h2>
          </div>

          {/* <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input
              id='name'
              type="text"
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='Your name'
            />
          </div> */}

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              id='email'
              type="email"
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input
              id='password'
              type={show ? "text" : "password"}
              className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
              placeholder='Your password'onChange={(e)=>setPassword(e.target.value)} value={password}
            />

            {!show ? (
              <IoEyeOutline
                className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'
                onClick={() => setShow(prev => !prev)}
              />
            ) : (
              <IoEye
                className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'
                onClick={() => setShow(prev => !prev)}
              />
            )}
          </div>

          {/* 
          <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
            <span className='px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Student</span>
            <span className='px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Educator</span>
          </div>
          */}

          <button className='w-[80%] h-[40px] bg-black text-white flex items-center justify-center rounded-[5px] cursor-pointer' disabled={loading} onClick={handleLogin}>
            {loading ?  <ClipLoader size={30} color='white' />: Login}
          </button>

          <span className='text-[13px] cursor-pointer text-[#585757]' onClick={()=>navigate("/forget")}>
            Forget your password ?
          </span>

          <div className='w-[80%] flex items-center gap-2'>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>
              Or continue
            </div>
            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>

          <div className='w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center'onClick={googleLogin}>
            <img src={google} className='w-[25px]' alt="" />
            <span className='text-[18px] text-gray-500'>Google</span>
          </div>

          <div className='text-[#6f6f6f]'>
            Create new account
            <span
              className='underline underline-offset-1 text-[black] cursor-pointer'
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </div>
        </div>

        {/* Right div */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className='w-30 shadow-2xl' />
          <span className='text-2xl text-white'>LearnOS</span>
        </div>
      </form>
    </div>
  )
}

export default Login