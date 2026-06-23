import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js"

export const createCourse = async (req, res) => {
    try {

        // FIXED: trim use kiya taki empty spaces accept na ho
        const title = req.body.title?.trim()
        const category = req.body.category?.trim()

        // FIXED: proper validation
        if (!title || !category) {
            return res.status(400).json({
                message: "Title and Category are required"
            })
        }

        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })

        return res.status(201).json(course)

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: `Create Course error ${error.message}`
        })
    }
}


export const getPublishedCourses = async (req, res) => {
    try {

        const courses = await Course.find({
            isPublished: true
        }).populate("lectures")

        return res.status(200).json(courses)

    } catch (error) {

        return res.status(500).json({
            message: `failed to find published courses ${error.message}`
        })
    }
}


export const getCreateCourses = async (req, res) => {
    try {

        const userId = req.userId

        const courses = await Course.find({
            creator: userId
        })

        return res.status(200).json(courses)

    } catch (error) {

        return res.status(500).json({
            message: `failed to get creator courses ${error.message}`
        })
    }
}


export const editCourse = async (req, res) => {
    try {

        const { courseId } = req.params

        const {
            title,
            subtitle,
            description,
            category,
            level,
            price
        } = req.body

        let thumbnail

        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        const updateData = {
            title,
            subtitle,
            description,
            category,
            level,
            price
        }

        if (thumbnail) {
            updateData.thumbnail = thumbnail
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true }
        )

        return res.status(200).json(updatedCourse)

    } catch (error) {

        return res.status(500).json({
            message: `failed to edit course ${error.message}`
        })
    }
}


export const getCourseById = async (req, res) => {
    try {

        const { courseId } = req.params

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        return res.status(200).json(course)

    } catch (error) {

        return res.status(500).json({
            message: `failed to get course ${error.message}`
        })
    }
}


export const removeCourse = async (req, res) => {
    try {

        const { courseId } = req.params

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // FIXED: pehle delete nahi ho raha tha
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            message: "Course removed successfully"
        })

    } catch (error) {

        return res.status(500).json({
            message: `failed to remove course ${error.message}`
        })
    }
}


// ------------------ Lecture ------------------

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body
    const { courseId } = req.params

    if (!lectureTitle?.trim() || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required"
      })
    }

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      })
    }

    const lecture = await Lecture.create({
      lectureTitle: lectureTitle.trim()
    })

    course.lectures.push(lecture._id)

    // FIXED: save se pehle old course category fill karo
    if (!course.category) {
      course.category = "General"
    }

    await course.save()

    await course.populate("lectures")

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
      course
    })

  } catch (error) {
    console.log("Create Lecture Error:", error)

    return res.status(500).json({
      success: false,
      message: `Failed to create lecture: ${error.message}`
    })
  }
}
export const getCourseLecture = async (req, res) => {
    try {

        const { courseId } = req.params

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // FIXED: save() ki zarurat nahi thi
        await course.populate("lectures")

        return res.status(200).json(course)

    } catch (error) {

        return res.status(500).json({
            message: `failed to get lectures ${error.message}`
        })
    }
}


export const editLecture = async (req, res) => {
    try {

        const { lectureId } = req.params
        const { isPreviewFree, lectureTitle } = req.body

        const lecture = await Lecture.findById(lectureId)

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found"
            })
        }

        if (req.file) {
            const videoUrl = await uploadOnCloudinary(
                req.file.path
            )

            lecture.videoUrl = videoUrl
        }

        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }

        lecture.isPreviewFree = isPreviewFree

        await lecture.save()

        return res.status(200).json(lecture)

    } catch (error) {

        return res.status(500).json({
            message: `failed to edit lecture ${error.message}`
        })
    }
}


export const removeLecture = async (req, res) => {
    try {

        const { lectureId } = req.params

        const lecture = await Lecture.findByIdAndDelete(
            lectureId
        )

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found"
            })
        }

        await Course.updateOne(
            {
                lectures: lectureId
            },
            {
                $pull: {
                    lectures: lectureId
                }
            }
        )

        return res.status(200).json({
            message: "Lecture removed"
        })

    } catch (error) {

        return res.status(500).json({
            message: `failed to remove lecture ${error.message}`
        })
    }
}

//get creator

export const getCreatorById = async (req,res) => {
    try {
        const {userId} = req.body

        const user = await User.findById(userId).select("-password")

            if(!user){
              return res.status(404).json({message:'user is not found'})
            }
            return res.status(200).json(user)
        
    } catch (error) {
         return res.status(500).json({
            message: `failed to get creator ${error.message}`
        })
    }
}