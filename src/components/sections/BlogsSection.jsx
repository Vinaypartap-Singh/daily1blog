import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const blogsRef = collection(db, "blogs");

    const q = query(blogsRef);

    onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(blogsData);
    });
  }, []);

  const deletePost = async (id) => {
    try {
      window.confirm("Are you sure about deleting this post ?");
      await deleteDoc(doc(db, "blogs", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto max-width-content">
          <div className={"flex items-center justify-between"}>
            <h1 className="mb-10 text-3xl font-bold text-black">
              Latest Posts
            </h1>
            <a
              href={"/blogs"}
              className="mb-10 text-orange-400 text-black text-sm inline-flex items-center"
            >
              View All{" "}
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap -m-4">
            {blogs.length === 0 ? (
              <div className={"text-center w-full"}>
                <h1 className={"text-center text-red-500 tracking-wider"}>
                  {" "}
                  Loading........{" "}
                </h1>
              </div>
            ) : (
              blogs.map((data) => {
                return (
                  <div className="p-4 md:w-1/3" key={data.id}>
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
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
                        <p
                          dangerouslySetInnerHTML={{ __html: data.description }}
                          className="leading-relaxed mb-3 desc"
                        />
                        <div className="flex items-center flex-wrap ">
                          <Link
                            to={`/blog/${data.id}`}
                            className="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0"
                          >
                            Read Post
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
                                className="w-4 h-4 mr-1"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Delete Post
                            </button>
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
