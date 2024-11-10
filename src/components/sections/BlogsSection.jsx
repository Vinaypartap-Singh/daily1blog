import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { Link } from "react-router-dom";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { ArrowUp10, ArrowDown01 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import BlogSkelton from "../Skeleton/BlogSkeleton";
import { toast } from "react-toastify";

export default function BlogsSection({ showHeader = false }) {
  const [blogs, setBlogs] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Reference to your Firestore collection
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, orderBy("timestamp", "desc"));

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
          setBlogs(blogsData);
        } catch (error) {
          console.error("Error fetching blogs: ", error);
        }
      },
      (error) => {
        console.error("Error with onSnapshot: ", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  const deletePost = async (id) => {
    try {
      if (window.confirm("Are you sure about deleting this post ?")) {
        await deleteDoc(doc(db, "blogs", id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upvotePost = async (id) => {
    try {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);
      if (blogSnap.exists()) {
        const blogData = blogSnap.data();
        const votedUsers = blogData.votedUsers || [];

        // Check if the user has already voted
        if (!votedUsers.includes(userId)) {
          // Allow upvote if the user hasn't voted yet
          await updateDoc(blogRef, {
            upVotes: increment(1),
            votedUsers: arrayUnion(userId), // Add user to the votedUsers array
          });
        } else {
          toast("User has already voted.");
        }
      }
    } catch (error) {
      console.log("Error upvoting:", error);
    }
  };

  const downvotePost = async (id) => {
    try {
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);
      if (blogSnap.exists()) {
        const blogData = blogSnap.data();
        const votedUsers = blogData.votedUsers || [];

        // Check if the user has already voted
        if (!votedUsers.includes(userId)) {
          // Allow downvote if the user hasn't voted yet
          await updateDoc(blogRef, {
            downVotes: increment(1),
            votedUsers: arrayUnion(userId), // Add user to the votedUsers array
          });
        } else {
          toast("User has already voted.");
        }
      }
    } catch (error) {
      console.log("Error downvoting:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp?.seconds * 1000); // Convert seconds to milliseconds

    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11) and pad to 2 digits
    const year = date.getFullYear(); // Get full year

    // Return in the format "MM/YYYY"
    return `${month}/${year}`;
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto max-width-content">
          {showHeader && (
            <div className={"flex items-center justify-between"}>
              <h1 className="mb-10 text-3xl font-bold text-black">
                Latest Posts
              </h1>
              <Link
                to={"/blogs"}
                className="mb-10 text-orange-400 text-sm inline-flex items-center"
              >
                View All{" "}
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
            </div>
          )}

          <div className="flex flex-wrap">
            {blogs.length === 0 ? (
              <BlogSkelton />
            ) : (
              blogs.map((data) => {
                {
                  /* Convert Firestore timestamp to data */
                }

                const formattedDate = formatTimestamp(data.timestamp);

                return (
                  <div className="p-4 md:w-1/3 w-full" key={data.id}>
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="h-48 md:h-36 w-full object-cover object-center"
                        src={data.imgURL}
                        alt="blog"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h2 className="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
                          {data.category}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 title">
                          {data.title}
                        </h1>
                        {/* <p
                          dangerouslySetInnerHTML={{ __html: data.description }}
                          className="leading-relaxed mb-3 desc"
                        /> */}
                        <ReactMarkdown className="leading-relaxed mb-3 desc">
                          {data.description}
                        </ReactMarkdown>
                        <p className="text-gray-500 mb-3">{formattedDate}</p>
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
                                <span className="ml-1">
                                  {data.upVotes || 0}
                                </span>
                              </button>

                              <button
                                className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                                onClick={() => downvotePost(data.id)}
                              >
                                <ArrowDown01 className="h-4 w-4 hover:text-red-500" />
                                <span className="ml-1">
                                  {data.downVotes || 0}
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-row items-end">
                              <button className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <ArrowUp10 className="h-4 w-4 hover:text-red-500" />
                                <span className="ml-1">
                                  {data.upVotes || 0}
                                </span>
                              </button>

                              <button className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <ArrowDown01 className="h-4 w-4 hover:text-red-500" />
                                <span className="ml-1">
                                  {data.downVotes || 0}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
