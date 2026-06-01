import jwt from "jsonwebtoken";


function Authenticate(req, res, next) {

const JWT_SECRET=process.env.JWT_SECRET;

    try {

        const token =req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decodedToken = jwt.verify(
            token,
            JWT_SECRET
        );

        if(!decodedToken){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        req.user = decodedToken;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export default Authenticate;