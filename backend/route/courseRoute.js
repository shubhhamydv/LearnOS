

import express from "express"
import {createCourse, editCourse, getCourseById, getCreateCourses, getPublishedCourses, removeCourse } from "../controller/courseController.js"
import isAuth from '../middleware/isAuth.js'
import upload from "../model/multer.js"

const courseRouter = express.Router()

courseRouter.post("/create" ,isAuth, createCourse)
courseRouter.get("/getpublished" , getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreateCourses)
courseRouter.post("/editcourse/:courseId" ,isAuth,upload.single ("thumbnail"),editCourse)
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId" ,isAuth,removeCourse)

export default courseRouter