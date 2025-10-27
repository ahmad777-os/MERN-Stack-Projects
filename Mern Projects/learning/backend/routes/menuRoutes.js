import express from "express";
import {
  getMenu,
  addMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

const router = express.Router();

router.route("/")
  .get(getMenu)  
  .post(addMenu); 

router.route("/:id")
  .get(getMenuById)    
  .put(updateMenu)     
  .delete(deleteMenu); 

export default router;
