import { useParams } from "react-router-dom";
import posts from "../posts";
import NavForBlog from "../Components/NavForBlog";

export default function PostPage() {
  const { id } = useParams();
  const Post = posts[id];

  if (!Post) {
    return (
      <div className="flex justify-center items-center h-screen text-center px-4">
        <div className="max-w-2lg">
          <h1 className="text-3xl font-bold mb-4">⚠️ Post Not Found</h1>
          <p className="text-default-500">Post you're looking for doesn't exist or was moved.</p>
          <p className="text-default-500">Fool can't hack a hacker 😏</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center">
      <NavForBlog to="/blog" />
      <div className="post-container prose prose-code:text-inherit dark:prose-invert blog-markdown max-w-4xl w-full px-6 pb-10">
        <Post />
      </div>
    </div>
  );
}
