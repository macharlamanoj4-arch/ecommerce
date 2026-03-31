import express, { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service"
import { RequestValidator } from "../utils/requestValidator";
import { generateToken } from "../utils/auth";
import { UserRepository } from "../repository/user.repository";
// import { ProfileService } from "../services/profile.service";
// import { ProfileRepository } from "../repository/profile.repository";
import { CreateProfileRequest, LoginRequest } from "../dto/profile.dto";

const router = express.Router();

export const userservice = new UserService(new UserRepository())
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
      return res.status(500).json(err.message);
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
      const user = await userservice.getUser(input.username, input.password)
      // console.log(user)

      const token: any = generateToken(user.id)

      res.cookie("Authorization", token, {
        httpOnly: true,    // Prevent frontend JS from reading the cookie (Security!)
        secure: true,      // Only sent over HTTPS (use false for local dev without SSL)
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
// router.patch(
//   "/products/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { errors, input } = await RequestValidator(
//         UpdateProductRequest,
//         req.body
//       );

//       const id = parseInt(req.params.id) || 0;

//       if (errors) return res.status(400).json(errors);

//       const data = await catalogService.updateProduct({ id, ...input });
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
