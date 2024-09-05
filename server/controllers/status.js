import Status from "../models/Status.js";

export const addStatus = async (req, res, next) => {
  try {
    const newStatus = new Status({...req.body});
    newStatus.save()
    res.status(200).send("created a new Status")
  } catch (error) {
    next(error)
  }
}

export const getAllStatus = async (req, res, next) => {
    try {
        const allStatus = await Status.find({}).sort({arrivalTime: -1})
        res.status(200).json(allStatus)
    } catch (error) {
        next(error)
    }
} 