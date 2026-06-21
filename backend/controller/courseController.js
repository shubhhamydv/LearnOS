import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"

export const createCourse = async (req, res) => {
    try {
        const {title, category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title or Category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`Create Course error ${error.message}`})
    }
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true})

        if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message:`failed to find isPublished courses${error}`})
    }
}

export const getCreateCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
         if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
         return res.status(500).json({message:`failed to get a  creator courses${error}`})
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params
      const {title,subtitle,description,category,level,price}= req.body
      let thumbnail;
      if(req.file){
        thumbnail = await uploadOnCloudinary(req.file.path)
      }

      let courses = await Course.findById(courseId)
       if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        const updateData =  {title,subtitle,description,category,level,price}
         if (thumbnail) updateData.thumbnail = thumbnail

         const course = await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({message:`failed to get a  edit courses${error}`})
    }
}

export const getCourseById = async (req,res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
         if(!course){
            return res.status(400).json({message:"Courses is not found"})
        }
        return res.status(200).json(course)
        
    } catch (error) {
          return res.status(500).json({message:`failed to get a courses by Id ${error}`})
    }
}

export const removeCourse = async (req,res) => {
    try {
        const {courseId} = req.params
         const course = await Course.findById(courseId)
          if(!course){
            return res.status(400).json({message:"Courses is not found"})
        }
         await Course.findById(courseId)
        return res.status(200).json({message:"course removed "})
    } catch (error) {
        return res.status(500).json({message:`failed to edit course ${error}`})
    }
}