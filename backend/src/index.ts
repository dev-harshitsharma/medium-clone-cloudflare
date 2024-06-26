import { Hono } from "hono";
import {userRouter} from "../src/routes/user.routes";
import {blogRouter} from "../src/routes/blog.routes";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use('/*',cors());
app.route("/api/v1/users",userRouter)
app.route("/api/v1/blogs",blogRouter)

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
