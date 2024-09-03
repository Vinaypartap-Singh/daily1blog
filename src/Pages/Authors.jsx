import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const authorsRef = collection(db, "authors");

    const q = query(authorsRef);

    onSnapshot(q, (snapshot) => {
      const authorsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAuthors(authorsData);
    });
  }, []);

  console.log(authors);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto max-width-content">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-start text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              Author Spotlight: Illuminating Literary Voices
            </h1>
            <p className="text-start lg:w-2/3 leading-relaxed text-base">
              Explore the Literary Realm and Discover <br /> the
              <b> Exceptional Authors Behind the Stories. </b>
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {authors.length === 0 ? (
              <h1 className="text-center text-3xl font-bold text-black">
                Loading Authors Profile
              </h1>
            ) : (
              authors.map(
                ({
                  AuthorName,
                  AuthorInformation,
                  AuthorAim,
                  AuthorImage,
                  id,
                }) => {
                  return (
                    <div className="p-4 lg:w-1/2">
                      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                        <img
                          alt="team"
                          className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                          src={AuthorImage}
                        />
                        <div className="flex-grow sm:pl-8">
                          <h2 className="title-font font-medium text-lg text-gray-900 title">
                            {AuthorName}
                          </h2>
                          <h3 className="text-gray-500 mb-3">UI Developer</h3>
                          <p className="mb-4 desc">{AuthorInformation}</p>
                          <Link
                            to={`/authorprofile/${id}`}
                            className="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0"
                          >
                            View Profile
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
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
