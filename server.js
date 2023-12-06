// Api documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

//packages imports
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// routes imports
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

//security packages
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";

//config
dotenv.config();

//mongodb connection
connectDB();

//swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Express Job Portal Application",
    },
    servers: [
      {
        url: "https://job-portal-7xun.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();

//middlewares function
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//security middlewares
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
//port
const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

//homerout root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`The server is running port ${PORT}`.bgCyan.white);
});
