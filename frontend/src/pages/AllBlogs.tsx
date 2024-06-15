import BlogCard from "../components/BlogCard";

const AllBlogs = () => {
  return (
    <div className="border-b border-slate-700 ">
      <BlogCard
        authorName={"Harshit Sharma"}
        publishedDate={"01-02-2024"}
        title={"This is the Title"}
        content={
          "sjdnb jkdnask dkas djknasd askjdnasjd asdjkasndkjnasdjk asjdk nasjkdnasd "
        }
      />
    </div>
  );
};

export default AllBlogs;
