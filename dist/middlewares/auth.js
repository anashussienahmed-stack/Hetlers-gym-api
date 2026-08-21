import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ msg: "Not authorized, please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
export const restrictTo = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ msg: "You don't have permission to perform this action" });
        }
        next();
    };
};
