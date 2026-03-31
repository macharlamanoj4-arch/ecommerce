import express, { NextFunction, Request, Response } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../dto/product.dto";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repository/category.repository";

const router = express.Router();

export const categoryService = new CategoryService(new CategoryRepository());

// endpoints
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateCategoryRequest,
        req.body
      );

      if (errors) return res.status(400).json(errors);
      const data = await categoryService.createCategory(input);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateCategoryRequest,
        req.body
      );

      const id : string = req.params.id ;

      if (errors) return res.status(400).json(errors);

      const data = await categoryService.updateCategory({ id, ...input });
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await categoryService.getCategorys();
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return next(err);
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)|| 0;
    try {
      const data = await categoryService.getCategory(id);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)|| 0;
    try {
      const data = await categoryService.deleteCategory(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
);


export default router;
