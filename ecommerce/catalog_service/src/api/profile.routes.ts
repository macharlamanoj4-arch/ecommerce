import express, { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service"
import { RequestValidator } from "../utils/requestValidator";
import { UserRepository } from "../repository/user.repository";
// import { ProfileService } from "../services/profile.service";
// import { ProfileRepository } from "../repository/profile.repository";
import { CreateProfileRequest } from "../dto/profile.dto";

const router = express.Router();

export const userservice = new UserService( new UserRepository())
// export const profileservice = new ProfileService( new ProfileRepository())

// endpoints
router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProfileRequest,
        req.body
      );

      if (errors) return res.status(400).json(errors);
      const user = await userservice.createUser( input)
      
      return res.status(201).json([user]);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
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
