interface BlogcardProps {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}

const BlogCard = ({
  authorName,
  publishedDate,
  title,
  content,
}: BlogcardProps) => {
  return (
    <>
      <div className="flex gap-x-0.5">
        <div className="flex justify-center flex-col">
          <AvatarLogo authorName={authorName} />
        </div>

        <div className="text-xs font-semibold pl-2 mt-1 mr-2 ">
          {authorName}
        </div>
        <div className="pl-1 font-thin text-slate-600">{publishedDate}</div>
      </div>
      <div>{title}</div>
      <div>{content.slice(0, 100) + "....."}</div>
      <div>{`${Math.ceil(content.length / 100)} minutes`}</div>
    </>
  );
};

function AvatarLogo({ authorName }: { authorName: string }) {
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
      <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 text-xs">
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          {initials}
        </span>
      </div>
    </>
  );
}
export default BlogCard;
