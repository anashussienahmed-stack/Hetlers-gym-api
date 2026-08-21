import {Request , Response } from "express"
import {ClassSession} from "../models/ClassSession"
import { Booking } from "../models/Booking";
import { User } from "../models/user";  

export const createClass = async (req : Request , res : Response ) => {
    try {
        const {title , timeSlot , capacity} = req.body
        const trainerId = req.user.id

        const classSession = await ClassSession.create({
            title,
            timeSlot,
            capacity,
            trainer : trainerId,
        })

        return res.status(201).json({
            message : "Class created successfully",
            classSession
        })
    }catch(error){
        return res.status(500).json({
            message : "Server error"
        })
    }
}

export const updateClass = async ( req : Request , res : Response ) => {
    try{
        const {id} = req.params
        const {title , timeSlot , capacity} = req.body
        const trainerId = req.user.id

        const classSession = await ClassSession.findById(id)

        if (!classSession){
            return res.status(404).json({
                message : "Class not found"
            })
        }

        if (classSession.trainer.toString() !== trainerId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this class",
            })
        }

        classSession.title = title
        classSession.timeSlot = timeSlot
        classSession.capacity = capacity

        await classSession.save()
        
        return res.status(200).json({
            message : "Class updated successfully",
            classSession
        })
    }catch(error){
        return res.status(500).json({
            message : "Server error"
        })
    }
}

export const deleteClass = async (req : Request , res : Response ) => {
    try{
        const {id} = req.params
        const trainerId = req.user.id

        const classSession = await ClassSession.findById(id)

        if (!classSession){
            return res.status(404).json({
                message : "Class not found"
            })
        }

        if (classSession.trainer.toString() !== trainerId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this class",
            })
        }

        const existingBooking = await Booking.findOne({
            session: id,
            status: "booked",
        })

        if (existingBooking){
            return res.status(409).json({
                message : "Cannot delete a class with active bookings"
            })
        }
        await ClassSession.findByIdAndDelete(id)

        return res.status(200).json({
            message : "Class deleted successfully",
        })

    }catch(error){
        return res.status(500).json({
            message : "Server error"
        })
    }

} 

export const getClasses = async ( req : Request , res : Response ) => {
  try {
    const {title , trainer , date , available} = req.query

    const filter : any = {}

    if (title){
        filter.title = {
            $regex: title,
            $options: "i"
        }
    }

    if (trainer) {
      const user = await User.findOne({
        fullname: { $regex: trainer as string, $options: "i" }
      })

      if (user) {
        filter.trainer = user._id
      }else{
        return res.status(200).json({classes : [] })
      }
    }

    if (date) {
      const startOfDay = new Date(`${date}T00:00:00`)
      const endOfDay = new Date(`${date}T23:59:59`)

      filter.timeSlot = {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }

    const classes = await ClassSession.find(filter).populate(
        "trainer",
        "fullname"
    )


    if (available === "true") {
        const availableClasses = []

        for (const classSession of classes) {
            const bookings = await Booking.countDocuments({
            session: classSession._id,
            status: "booked"
            })

            if (bookings < classSession.capacity) {
                availableClasses.push(classSession);
            }
        }

        return res.status(200).json({
            classes: availableClasses
        });
    }

    return res.status(200).json({
      classes,
    })
  } catch (error) {
    return res.status(500).json({
            message : "Server error"
        })
  }
}

export const getClassById = async (req : Request , res : Response) => {
    try{
        const {id} = req.params

        const classSession = await ClassSession.findById(id).populate(
            "trainer",
            "fullname"
        )

        if (!classSession){
            return res.status(404).json({
                message : "Class not found "
            })
        }

        return res.status(200).json(classSession)
    }catch(error){
        return res.status(500).json({
            message : "Server error"
        })
    }
}

