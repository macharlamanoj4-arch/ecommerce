
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const verifyUser = async (req: any, res: any, next: any)=>{
    try {
    let token: string
    if (req && req.headers.authorization) token = req.headers.authorization;
    else token = req && req.cookie && req.cookie.authenticate ? req.cookie.authenticate : undefined;

    let url = process.env.SSO_VERIFY_URL || "http://localhost:8001/verify";
    const response = await axios.get(`${url}?token=${token}`);
    if (response.status == 200) next()
    else throw new Error('unauthorized access')    
    } catch (error) {
        let err = new Error('unauthorized access')
        return next(err)
    }
}

    export const generateToken= (id:string) => {
        try {
            let secret: string = process.env.JWT_SECRET_KEY || "sdfghdshsdfhdfhndfhd";
            return jwt.sign({"id":id}, secret, {
                expiresIn: 60 * 60,
            });
        } catch (error) {
            throw error;
        }
    }

    export const authenticate = async(req, res, next) => {
        try {
            let token
            if (req && req.headers.authorization) token = req.headers.authorization;
            else token = req && req.cookie && req.cookie.authenticate ? req.cookie.authenticate : undefined;
            let validate = false;
            // if (process.env.SSO_VALIDATE === "true") {
            //     validate = true
            // }
            if (req && req.originalUrl == "/login") {
                if (token) {
                    res.cookie("Authorization", token);
                    return res.json({
                        status: 'success',
                        token,
                    });
                } else next();
            }
            else {
                if (!validate) next();
                else if (token) {
                    var error=[];
                    let secret = process.env.JWT_SECRET_KEY || "sdfghdshsdfhdfhndfhd";
                    jwt.verify(token, secret, function (err, decoded) {
                        if (err && validate) {
                            next(err)
                        }
                        else {
                            req.userId = decoded && decoded.id ? decoded.id : null;
                        }
                    });
                    next()
                }
                else {
                    let err = new Error("Unauthorized");
                    return next(err);
                }
            }
        } catch (error) {
            throw error;
        }
    }