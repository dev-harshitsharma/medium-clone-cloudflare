import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface AllBlog {
  id: number;
  content: string;
  title: string;
  author: {
    name: string;
  };
}

interface Blog {
  id: number;
  authorId: number;
  title: string;
  content: string;
}
export const useblog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log("resp", resp);
        setBlog(resp.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error fetching blogs:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  console.log("blogs", blog);
  return {
    loading,
    blog,
  };
};

export const useAllBlogs = () => {
  const [blogs, setBlogs] = useState<AllBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    axios
      .get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setBlogs(resp.data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error fetching blogs:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  console.log("blogs", blogs);
  return {
    loading,
    blogs,
  };
};
