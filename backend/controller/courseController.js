import uploadOnCloudinary from "../config/cloundinary"

export const createCourse = async (req, res) => {
    try {
        const {title, category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title or Category is required"})
        }
        const course = await Course.create({
            title,
            description,
            creator:req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`updateProfile error &{error}`})
    }
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Courses.find({isPublished:true})

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
        const courses = await Courses.find({creator:userId})
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
      const {title,subtitle,description,category,level,price,thumbnail}= req.body
      const thumbnail
      if(req.file){
        thumbnail = await uploadOnCloudinary(req.file.path)
      }

      let couses = await Course.findById(courseId)
       if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        const updateData =  {title,subtitle,description,category,level,price,thumbnail}

        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({message:`failed to get a  edit courses${error}`})
    }
}

export const getCourseById = async (req,res) => {
    try {
        const {courseId = await Course.findById(courseId)}
         if(!courses){
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
          if(!courses){
            return res.status(400).json({message:"Courses is not found"})
        }
        course = await Course.findById(courseId,updateData,{ne:true})
        return res.status(200).json({message:"course removed "})
    } catch (error) {
        return res.status(500).json({message:`failed to edit course ${error}`})
    }
}