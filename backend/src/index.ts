import { Hono } from "hono";
import {userRouter} from "../src/routes/user.routes";
import {blogRouter} from "../src/routes/blog.routes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/users",userRouter)
app.route("/api/v1/blogs",blogRouter)

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
