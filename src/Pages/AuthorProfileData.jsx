import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../Firebase";

export default function AuthorProfileData() {
  const { id } = useParams();

  const userId = localStorage.getItem("userId");

  const [authorProfile, setAuthorProfile] = useState({});
  const [authorPosts, setAuthorPosts] = useState([]);
  const [fetchBlogAuthorName, setFetchBlogAuthorName] = useState("");

  const getAuthorBlogs = async () => {
    const dataRef = collection(db, "blogs");
    const q = query(
      dataRef,
      where("authorName", "==", `${fetchBlogAuthorName}`)
    );

    const dataSnapshot = await getDocs(q);
    let finalData = [];

    dataSnapshot.forEach((doc) => {
      finalData.push(doc.data());
      setAuthorPosts(finalData);
    });
  };

  const getAuthorData = async () => {
    const getDocData = doc(db, "authors", `${id}`);

    const docSnap = await getDoc(getDocData);

    if (docSnap.exists()) {
      setAuthorProfile(docSnap.data());
      setFetchBlogAuthorName(docSnap.data().AuthorEmail);
    } else {
      toast("Profile Not Found");
    }
  };

  useMemo(() => {
    getAuthorData();
  }, [setAuthorProfile]);

  useMemo(() => {
    getAuthorBlogs();
  }, [setAuthorPosts]);

  useMemo(() => {
    getAuthorBlogs();
  }, [setFetchBlogAuthorName]);

  const authorBlogBtnClick = () => {
    toast("Loading Data. Loading depend on internet speed.");
    getAuthorBlogs();
  };

  return (
    <div>
      {Object.keys(authorProfile).length === 0 ? (
        <div className="container px-5 py-24 mx-auto max-width-content text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Loading
          </h1>
        </div>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center max-width-content">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={authorProfile.AuthorImage}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {authorProfile.AuthorName}
              </h1>
              <h2 className="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
                {authorProfile.AuthorAim}
              </h2>
              <p className="mb-8 leading-relaxed">
                {authorProfile.AuthorInformation}
              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {authorPosts.length === 0 ? (
        <div className="container px-5 py-24 mx-auto max-width-content text-center">
          <button
            className="inline-flex text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
            onClick={authorBlogBtnClick}
          >
            Author Publications
          </button>
        </div>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto max-width-content">
            <h1 className="mb-10 text-3xl font-bold text-black">
              Posts By Author
            </h1>
            <div className="flex flex-wrap -m-4">
              {authorPosts.length === 0 ? (
                <h1> Fetching Data From Database </h1>
              ) : (
                authorPosts.map((data) => {
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
                          <p className="leading-relaxed mb-3 desc">
                            {data.description}
                          </p>
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
                                  className="w-4 h-4 mr-1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
      )}
    </div>
  );
}
