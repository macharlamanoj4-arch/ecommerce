import express, { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service"
import { RequestValidator } from "../utils/requestValidator";
import { generateToken } from "../utils/auth";
import { UserRepository } from "../repository/user.repository";
// import { ProfileService } from "../services/profile.service";
// import { ProfileRepository } from "../repository/profile.repository";
import { CreateProfileRequest, LoginRequest } from "../dto/profile.dto";
import { TokenService } from "../services/token.service";
import { TokenRepository } from "../repository/token.repository";
import { link } from "fs";
// import { verifyToken } from "../utils/token";
import { sendResetPasswordEmail } from "../services/emai.service";
const jwt = require('jsonwebtoken');

const router = express.Router();

export const userservice = new UserService(new UserRepository())
export const tokenservice = new TokenService(new TokenRepository())
// export const profileservice = new ProfileService( new ProfileRepository())

// endpoints
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProfileRequest,
        req.body
      );

      if (errors) return res.status(400).json(errors);
      const user = await userservice.createUser(input)

      return res.status(201).json([user]);
    } catch (error) {
      const err = error as Error;
      return next(err);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        LoginRequest,
        req.body
      );

      if (errors) return res.status(400).json(errors);
      const user = await userservice.getUser(input.email, input.password)
      // console.log(user)

      // const token: any = ""//generateToken(user.id)
      const token = await tokenservice.createToken({userId: user.id, type: "auth", expires: Math.floor(Date.now() + 3600000 / 1000)});

      res.cookie("Authorization", token, {
        httpOnly: true,    // Prevent frontend JS from reading the cookie (Security!)
        secure: false,      // Only sent over HTTPS (use false for local dev without SSL)
        sameSite: 'lax',   // Helps prevent CSRF attacks
        maxAge: 3600000,   // Cookie expiration in milliseconds (1 hour)
        path: '/',         // Available across the entire site
      });

      return res.status(201).json({
        status: 'success',
        "token": token,
        profile: {
          "id":user.id,
          "username":user.username,
          "profile":user.profile
        },
        ok: true
      });
    } catch (error) {
      const err = error as Error;
      return next(err);
    }
  }
);

router.get("/resetpassword", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userservice.getUser(req.body.email || "");
    const token = await tokenservice.createToken({userId: user.id, type: "reset_password", expires: Math.floor(Date.now() + 3600000 / 1000)});
    let rest_link = process.env.RESET_PASSWORD_LINK + token.token;
    await sendResetPasswordEmail(user.email, token.token);
    return res.status(200).json({ rest_link});
  } catch (error) {
    const err = error as Error;
    return next(err);
  }
});

router.post("/resetpassword/:token", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.params.token;
    // TODO: Verify token and reset password
    const data = await verifyToken(token, "reset_password");
    const user = userservice.updateUser({id: data.userId, email: req.body.email, password: req.body.password });
    return res.status(200).json( user );
  } catch (error) {
    const err = error as Error;
    return next(err);
  }
});

 const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const tokenDoc = await tokenservice.getToken(payload.id,type);
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

router.get("/verify", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let err: Error = new Error('Unathorized user.');
    const token = req.query.token as string;
    if (!token) {
      return res.status(405).json(err)
    }
    const data = await verifyToken(token, "auth");
    if (!data) {
      return res.status(405).json(err)
    }
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(405).json({"message":err.message});
  }
});

// router.patch(
//   "/user/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { errors, input } = await RequestValidator(
//         UpdateProductRequest,
//         req.body
//       );

//       const id = parseInt(req.params.id) || 0;

//       if (errors) return res.status(400).json(errors);

//       const data = await userservice.updateUser({ id, ...input });
//       return res.status(200).json(data);
//     } catch (error) {
//       const err = error as Error;
//       return res.status(500).json(err.message);
//     }
//   }
// );

// router.get(
//   "/products",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const limit = Number(req.query["limit"]);
//     const offset = Number(req.query["offset"]);
//     try {
//       const data = await catalogService.getProducts(limit, offset);
//       return res.status(200).json(data);
//     } catch (error) {
//       const err = error as Error;
//       return res.status(500).json(err.message);
//     }
//   }
// );

// router.get(
//   "/products/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const id = parseInt(req.params.id) || 0;
//     try {
//       const data = await catalogService.getProduct(id);
//       return res.status(200).json(data);
//     } catch (error) {
//       return next(error);
//     }
//   }
// );

// router.delete(
//   "/products/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const id = parseInt(req.params.id) || 0;
//     try {
//       const data = await catalogService.deleteProduct(id);
//       return res.status(200).json(data);
//     } catch (error) {
//       const err = error as Error;
//       return res.status(500).json(err.message);
//     }
//   }
// );

// router.post("/products/stock", async (req: Request, res: Response) => {
//   try {
//     const data = await catalogService.getProductStock(req.body.ids);
//     return res.status(200).json(data);
//   } catch (error) {
//     const err = error as Error;
//     return res.status(500).json(err.message);
//   }
// });

export default router;
