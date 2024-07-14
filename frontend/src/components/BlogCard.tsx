import { Link } from "react-router-dom";

interface BlogcardProps {
  id: number;
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}

const BlogCard = ({
  id,
  authorName,
  publishedDate,
  title,
  content,
}: BlogcardProps) => {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="border-black shadow-md border-b-2 ">
          <div className="flex gap-x-0.5 align-middle items-center p-1">
            <div className="flex justify-center flex-col pt-1">
              <AvatarLogo authorName={authorName} />
            </div>
            <div className="text-sm font-bold pl-1 pt-1">{authorName}</div>
            <div className="text-xs pt-1">&#9679;</div>
            <div className="pt-1 font-thin text-slate-600">{publishedDate}</div>
          </div>
          <div className="p-1">
            <div className="font-semibold text-xl">{title}</div>
            <div className="font-thin text-md">
              {content.slice(0, 100) + "....."}
            </div>
            <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(
              content.length / 100
            )} minutes`}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export function AvatarLogo({ authorName }: { authorName: string }) {
  const getInitials = (name: string) => {
    let words = name.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };
  const initials = getInitials(authorName);
  return (
    <>
      <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 text-xs">
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          {initials}
        </span>
      </div>
    </>
  );
}
export default BlogCard;
