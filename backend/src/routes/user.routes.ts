import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signUpInput, signinInput } from "@harshitsharma1912/medium-common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  console.log(success);
  if (!success) {
    c.status(411);
    return c.text("Invalid Inputs, Please try again");
  }
  try {
    const user = await prisma.user.create({
      data: {
        userName: body.userName,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({
      message: "User Created Succesfully",
      jwt,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("User already exists with this email");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);

  if (!success) {
    c.status(411);
    c.text("Invalid Inputs, Please try again");
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: body.userName,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect Credentials",
      });
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "User Logged in Successfully",
      jwt,
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.text("An error occurred while signing in");
  }
});
