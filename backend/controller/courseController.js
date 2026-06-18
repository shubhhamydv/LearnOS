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
        
    }
}