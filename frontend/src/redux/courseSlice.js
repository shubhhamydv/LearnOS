import { createSlice } from "@reduxjs/toolkit"


const courseSlice = createSlice({
  name:"course",
  initialState:{
    creatorCourseData:[],
    courseData:[]
  },
  reducers:{
    setcreatorCourseData:(state,action)=>{
        state.creatorCourseData=action.payload
    },
    setCourseData:(state,action)=>{
      state.courseData = action .payload
    }
  }
})

export const {setcreatorCourseData} =courseSlice.actions
export const {setCourseData} = courseSlice.actions
export default courseSlice.reducer
