
import jwt from 'jsonwebtoken';

// export const generateToken = (id: string) => {
//     try {
//         let secret: string = process.env.JWT_SECRET_KEY || "sdfghdshsdfhdfhndfhd";
//         return jwt.sign({ "id": id }, secret, {
//             expiresIn: 60 * 60,
//         });
//     } catch (error) {
//         throw error;
//     }
// }

export const generateToken = (userId: string, expires: any, type: string, secret: string) => {
    try {
        secret = secret ? secret : process.env.JWT_SECRET_KEY || "sdfghdshsdfhdfhndfhd";
        const payload = {
            sub: userId,
            // iat: moment().unix(),
            exp: expires.unix(),
            type,
        };
        return jwt.sign(payload, secret);
    } catch (error) {
        throw error;
    }
};

export const authenticate = async (req, res, next) => {
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
                var error = [];
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
// export const verify_token = async function (token: string, type: string) {
//     try {
//         let secret =  process.env.JWT_SECRET_KEY || "sdfghdshsdfhdfhndfhd";
//         const payload = jwt.verify(token, secret);
//         const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
//         if (!tokenDoc) {
//             throw new Error('Token not found');
//         }
//         return tokenDoc;
//     } catch (error) {
        
//     }
// }