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
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto max-width-content">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="text-start text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              Author Spotlight: Illuminating Literary Voices
            </h1>
            <p class="text-start lg:w-2/3 leading-relaxed text-base">
              Explore the Literary Realm and Discover <br /> the
              <b> Exceptional Authors Behind the Stories. </b>
            </p>
          </div>
          <div class="flex flex-wrap -m-4">
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
                    <div class="p-4 lg:w-1/2">
                      <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                        <img
                          alt="team"
                          class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                          src={AuthorImage}
                        />
                        <div class="flex-grow sm:pl-8">
                          <h2 class="title-font font-medium text-lg text-gray-900 title">
                            {AuthorName}
                          </h2>
                          <h3 class="text-gray-500 mb-3">UI Developer</h3>
                          <p class="mb-4 desc">{AuthorInformation}</p>
                          <Link
                            to={`/authorprofile/${id}`}
                            class="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0"
                          >
                            View Profile
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
