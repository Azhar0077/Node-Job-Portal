import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

// Ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

//router object

const router = express.Router();

// route

/**
 * @swagger
 *  components:
 *   schemas:
 *     User:
 *       type: Object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user collection
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User last Name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password should be greater then 6 character
 *         location:
 *           type: string
 *           description: User location city or country
 *       example:
 *         id: BGHUNOMOPLOE
 *         name: alain
 *         lastName: ali
 *         email: alainali007@gmail.com
 *         password: alain007
 *         location: kanpur
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 *  /api/v1/register:
 *     post:
 *       summary: register new user
 *       tags: [Auth]
 *       requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *       responses:
 *          200:
 *           description: user created successfully
 *           content:
 *              application/json:
 *                schema:
 *                   $ref: '#/components/schemas/User'
 *           500:
 *            description: internal server error
 */

//routes
router.post("/register", limiter, registerController);

/**
 *  @swagger
 *  /api/v1/auth/login:
 *   post:
 *     summary: login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *        200:
 *         description: login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *        500:
 *          description: internal server error
 */

router.post("/login", limiter, loginController);

//export

export default router;
