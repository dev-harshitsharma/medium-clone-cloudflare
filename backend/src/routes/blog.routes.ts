import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { verify } from "hono/jwt";
import { StringBuffer } from "hono/utils/html";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = verify(authHeader, c.env.JWT_SECRET) ;   

  if (user) {
    c.set("userId", user.id);
    next();
  } else {  
    c.status(403);
    c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  try {
    const body = await c.req.json();
    const createdBlog = await prisma.blog.create({
      data: {
        title: body.title,
        authorId: 1,
        content: body.content,
      },
    });

    c.status(201);
    return c.json({
      createdBlog,
      message: "Blog Created Succesfully",
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Invalid Credentials, Please Try again",
    });
  }
});

blogRouter.put("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const createdBlog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        authorId: 1,
        content: body.content,
      },
    });

    c.status(201);
    return c.json({
      createdBlog,
      message: "Blog Updated Succesfully",
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Not Able to Update the blog, Please Try again",
    });
  }
});

blogRouter.get("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
    });

    c.status(200);
    return c.json({
      blog,
      message: "Blog fetched Succesfully",
    });
  } catch (error) {
    c.status(404);
    return c.json({
      message: "Blog with this id does not exist ",
    });
  }
});

blogRouter.get("/api/v1/blog/:id", (c) => {
  return c.text("SignIn Hono!");
});

blogRouter.get("/api/v1/blog/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const DEFAULT_PAGE_SIZE = 10;

  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const skip = (page - 1) * DEFAULT_PAGE_SIZE;
    const take = DEFAULT_PAGE_SIZE;

    const blogs = await prisma.blog.findMany({
      skip,
      take,
    });

    const totalBlogs = await prisma.blog.count();

    c.status(200);
    return c.json({
      blogs,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / DEFAULT_PAGE_SIZE),
      message: "All Blogs",
    });
  } catch (error) {
    console.error(error);
    c.status(404);
    return c.json({
      message: "An error occurred while fetching blogs",
    });
  }
});

export default blogRouter;
