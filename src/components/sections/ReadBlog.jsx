import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase";
import CommentSection from "./CommentSection";

export default function ReadBlog() {
  const { id } = useParams();

  const [fblogData, setBlogsData] = useState({});
  const [authorNameFinal, setAuthorNameFinal] = useState("");

  const getBlogData = async () => {
    const getDocData = doc(db, `blogs`, `${id}`);

    const docSnap = await getDoc(getDocData);

    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());

      const finalName = docSnap.data().authorName.replace("@gmail.com", "");
      setAuthorNameFinal(finalName);
      setBlogsData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getBlogData();
  }, [setBlogsData]);

  return (
    <div>
      {Object.keys(fblogData).length === 0 ? (
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-3xl font-bold">Loading Data Please Wait</p>
        </div>
      ) : (
        <div className="cstmDiv">
          <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 !pt-0">
            <div className="mx-auto max-w-screen-md ">
              <h1 className="text-brand-blue mb-3 mt-6 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug">
                {fblogData.title}
              </h1>
            </div>
          </div>
          <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
            <img
              alt="Thumbnail"
              loading="eager"
              decoding="async"
              data-nimg="fill"
              className="object-cover"
              src={fblogData.imgURL}
              sizes="100vw"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: 0,
                color: "transparent",
              }}
            />
          </div>
          <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
            <article className="mx-auto max-w-screen-md">
              <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
                <Link to={"/about"} className="font-bold">
                  Written by: {authorNameFinal}
                </Link>
                <h2 className="bg-orange-400 text-white mt-4 mb-4 w-fit px-5 py-2 tracking-widest text-xs title-font font-medium">
                  {fblogData.category}
                </h2>
                <p className="my-4">
                  <strong>{fblogData.title}</strong>
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: fblogData.description }}
                  className={"leading-8"}
                />
              </div>
              <div className="mb-7 mt-7 flex justify-center">
                <Link
                  className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
                  to={"/"}
                >
                  ← View all posts
                </Link>
              </div>
              <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
                  <div>
                    <div className="mb-3">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                        About {authorNameFinal}
                      </h3>
                    </div>
                    <div></div>
                    <div className="mt-3">
                      <Link
                        to={"/authors"}
                        className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 "
                        href="/author/mario-sanchez"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}

              <CommentSection postId={id} />
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
