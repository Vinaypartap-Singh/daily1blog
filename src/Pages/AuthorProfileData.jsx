import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";

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
      alert("Profile Not Found");
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
    alert("Loading Data. Loading depend on internet speed.");
    getAuthorBlogs();
  };

  console.log(fetchBlogAuthorName);

  return (
    <div>
      {Object.keys(authorProfile).length === 0 ? (
        <div className="container px-5 py-24 mx-auto max-width-content text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Loading
          </h1>
        </div>
      ) : (
        <section class="text-gray-600 body-font">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center max-width-content">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                class="object-cover object-center rounded"
                alt="hero"
                src={authorProfile.AuthorImage}
              />
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {authorProfile.AuthorName}
              </h1>
              <h2 class="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
                {authorProfile.AuthorAim}
              </h2>
              <p class="mb-8 leading-relaxed">
                {authorProfile.AuthorInformation}
              </p>
              <div class="flex justify-center">
                <button class="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-black rounded text-lg">
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
            class="inline-flex text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
            onClick={authorBlogBtnClick}
          >
            Author Publications
          </button>
        </div>
      ) : (
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto max-width-content">
            <h1 className="mb-10 text-3xl font-bold text-black">
              Posts By Author
            </h1>
            <div class="flex flex-wrap -m-4">
              {authorPosts.length === 0 ? (
                <h1> Fetching Data From Database </h1>
              ) : (
                authorPosts.map((data) => {
                  return (
                    <div class="p-4 md:w-1/3" key={data.id}>
                      <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <img
                          class="lg:h-48 md:h-36 w-full object-cover object-center"
                          src={data.imgURL}
                          alt="blog"
                        />
                        <div class="p-6">
                          <h2 class="bg-orange-400 text-white mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium ">
                            {data.category}
                          </h2>
                          <h1 class="title-font text-lg font-medium text-gray-900 mb-3 title">
                            {data.title}
                          </h1>
                          <p class="leading-relaxed mb-3 desc">
                            {data.description}
                          </p>
                          <div class="flex items-center flex-wrap ">
                            <Link
                              to={`/blog/${data.id}`}
                              class="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0"
                            >
                              Read Post
                              <svg
                                class="w-4 h-4 ml-2"
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
                                class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                                onClick={() => deletePost(data.id)}
                              >
                                <svg
                                  class="w-4 h-4 mr-1"
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
      )}
    </div>
  );
}
