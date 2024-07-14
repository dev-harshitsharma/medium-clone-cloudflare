import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import NavBar from "../components/NavBar";
import { useAllBlogs } from "../hooks";

const AllBlogs = () => {
  const { loading, blogs } = useAllBlogs();

  return (
    <>
      <div className="">
        <NavBar />
      </div>

      {loading ? (
        "Loading ...."
      ) : (
        <div className="flex justify-center">
          <div className=" flex flex-col justify-center max-w-2xl p-4 space-y-2">
            {blogs.map((blog, index) => {
              return (
                <>
                  <div className="cursor-pointer">
                    <BlogCard
                      id={blog.id}
                      key={index}
                      authorName={blog.author.name}
                      publishedDate={"01-02-2024"}
                      title={blog.title}
                      content={blog.content}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBlogs;
