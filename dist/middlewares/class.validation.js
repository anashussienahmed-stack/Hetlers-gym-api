export const validateCreateClass = (req, res, next) => {
    const { title, timeSlot, capacity } = req.body;
    if (!title || !timeSlot || !capacity) {
        return res.status(400).json({
            message: "Title, timeSlot, and capacity are required",
        });
    }
    if (typeof capacity !== "number" || capacity <= 0) {
        return res.status(400).json({
            message: "Capacity must be a positive number",
        });
    }
    const classDate = new Date(timeSlot);
    if (classDate <= new Date()) {
        return res.status(400).json({
            message: "Class timeSlot must be in the future",
        });
    }
    next();
};
export const validateUpdateClass = (req, res, next) => {
    const { title, timeSlot, capacity } = req.body;
    if (!title && !timeSlot && !capacity) {
        return res.status(400).json({
            message: "At least one field (title, timeSlot, or capacity) is required to update",
        });
    }
    if (capacity !== undefined && (typeof capacity !== "number" || capacity <= 0)) {
        return res.status(400).json({
            message: "Capacity must be a positive number",
        });
    }
    if (timeSlot !== undefined) {
        const classDate = new Date(timeSlot);
        if (classDate <= new Date()) {
            return res.status(400).json({
                message: "Class timeSlot must be in the future",
            });
        }
    }
    next();
};
