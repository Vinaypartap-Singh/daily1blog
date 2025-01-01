import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Album, ArrowDown01, ArrowUp10 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../Firebase";
import BlogSkelton from "../Skeleton/BlogSkeleton";

export default function CategoryItem() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  console.log(id);

  useEffect(() => {
    setLoading(true);
    // Reference to your Firestore collection
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("category", "==", id));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const blogsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Set blogs without sorting
          console.log(blogsData);
          setBlogs(blogsData);
        } catch (error) {
          console.error("Error fetching blogs: ", error);
        }
      },
      (error) => {
        console.error("Error with onSnapshot: ", error);
      }
    );

    setLoading(false);

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);
  return (
    <div className="max-width-content mx-auto container px-5 py-12">
      <h2 className="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
        {id}
      </h2>

      <div className="flex flex-wrap my-6">
        {loading ? (
          <BlogSkelton />
        ) : blogs.length === 0 ? (
          <div className="p-6">
            <h2 className="text-start text-lg font-semibold text-gray-700 mb-4">
              <span className="inline-block text-orange-400">
                <Album className="size-4" />
              </span>{" "}
              No Blog Posts Yet!
            </h2>
            <p className="text-gray-500">
              Looks like there's nothing here right now, but stay tuned—new
              posts will be coming soon.
            </p>
          </div>
        ) : (
          blogs.map((data) => (
            <div className="p-4 md:w-1/3 w-full" key={data.id}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="h-48 md:h-36 w-full object-cover object-center"
                  src={data.imgURL}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
                    {data.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3 title">
                    {data.title}
                  </h1>
                  <ReactMarkdown className="leading-relaxed mb-3 desc">
                    {data.description}
                  </ReactMarkdown>
                  <div className="flex items-center flex-wrap justify-between">
                    <Link
                      to={`/blog/${data.id}`}
                      className="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Read Post
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>

                    {userId === data.authorID && (
                      <button
                        className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                        onClick={() => deletePost(data.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2 h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </button>
                    )}

                    {userId ? (
                      <div>
                        <button
                          className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                          onClick={() => upvotePost(data.id)}
                        >
                          <ArrowUp10 className="h-4 w-4 hover:text-red-500" />
                          <span className="ml-1">{data.upVotes || 0}</span>
                        </button>

                        <button
                          className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                          onClick={() => downvotePost(data.id)}
                        >
                          <ArrowDown01 className="h-4 w-4 hover:text-red-500" />
                          <span className="ml-1">{data.downVotes || 0}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row items-end">
                        <button className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <ArrowUp10 className="h-4 w-4 hover:text-red-500" />
                          <span className="ml-1">{data.upVotes || 0}</span>
                        </button>

                        <button className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <ArrowDown01 className="h-4 w-4 hover:text-red-500" />
                          <span className="ml-1">{data.downVotes || 0}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
