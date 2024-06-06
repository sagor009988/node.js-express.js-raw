import { log } from "console";
import express, { NextFunction, Request, Response, Router } from "express";

const app = express();
const port = 3000;

//set cors to support data type
app.use(express.json());
app.use(express.text());

const middlewaree = (req: Request, res: Response, next: NewableFunction) => {
  console.log(req.url, req.method);
  res.send("hrllo");
  next();
};

const userRouter = Router();
const courseRouter = Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/crate-user", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    succeess: true,
    data: req.body,
  });
});
courseRouter.post("/create/courses", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "message success",
  });
});

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(jjjj);
  } catch (error) {
    next(error);
  }
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.send("got data from res.send");
});
//route error handle
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Api is not Found",
  });
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
  next();
});

export default app;
