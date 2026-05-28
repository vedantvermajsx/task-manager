import jwt from "jsonwebtoken";


const JWT_SECRET=process.env.JWT_SECRET;

function Authenticate(req, res, next) {

    try {

        const token =req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decodedToken = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decodedToken;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export default Authenticate;