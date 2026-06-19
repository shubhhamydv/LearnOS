import { createSlice } from "@reduxjs/toolkit"


const courseSlice = createSlice({
  name:"course",
  initialState:{
    creatorCourseData:null
  },
  reducers:{
    setcreatorCourseData:(state,action)=>{
        state.creatorCourseData=action.payload
    }
  }
})

export const {setcreatorCourseData} =courseSlice.actions
export default courseSlice.reducer
