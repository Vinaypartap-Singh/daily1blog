import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { Profiler, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import JoditEditor from "jodit-react";
import { useMemo } from "react";

export default function PostBlog() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // States for Jodit Text Editor

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const initialState = {
    title: "",
    description: "",
    category: "",
  };

  const categoryItems = [
    {
      name: "Food and Cooking",
    },
    {
      name: "Technology and Gadgets",
    },
    {
      name: "Travel and Adventure",
    },
    {
      name: "Personal Development",
    },
    {
      name: "Health and Wellness",
    },
    {
      name: "Fashion and Beauty",
    },
    {
      name: "Parenting and Family",
    },
    {
      name: "Arts & Culture",
    },
  ];

  const [blogData, setBlogData] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, description, category } = blogData;

  useEffect(() => {
    if (file === null) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progresss);

        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;

          case "running":
            console.log("Running");
            break;

          case "success":
            alert("Image Uploaded");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setBlogData((prev) => ({ ...prev, imgURL: downloadURL }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, [file]);

  const handleTitle = (e) => {
    setBlogData({ ...blogData, title: e.target.value });
  };

  // Jodit Config

  const handleBlogContent = (newContent) => {
    setContent(newContent);
    setBlogData({ ...blogData, description: content });
  };

  const categoryHandle = (e) => {
    setBlogData({ ...blogData, category: e.target.value });
  };

  console.log(blogData);

  const addDataToFirebase = () => {
    if (title && description && category) {
      try {
        alert("Posting Blog");
        addDoc(collection(db, `blogs`), {
          ...blogData,
          timestamp: serverTimestamp(),
          authorName: localStorage.getItem("user"),
          authorID: localStorage.getItem("userId"),
          upVotes: 0,
          downVotes: 0,
          comments: [],
        });
        alert("Blogs Posted Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Share Your Thoughts</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Title"
              onChange={handleTitle}
            />

            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => handleBlogContent(newContent)}
            />

            {/* <textarea
              type="textarea"
              className="block border border-grey-light w-full h-[200px] p-3 rounded mb-4"
              placeholder="Description"
              onChange={handleBlogContent}
            /> */}

            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 mt-5"
            >
              Select an Category
            </label>
            <select
              onChange={categoryHandle}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {categoryItems.map((items) => {
                return <option key={items.name}>{items.name}</option>;
              })}
            </select>

            <input
              type="file"
              placeholder="Pick Image"
              className="block border border-grey-light w-full p-3 rounded mb-4 mt-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              type="submit"
              onClick={addDataToFirebase}
              style={{ backgroundColor: "#fb923c" }}
              disabled={progress !== null && progress < 100}
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Post Blog
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            Want to boost your content ?
            <Link
              to={"/signup"}
              className="ml-2 text-orange-400 no-underline border-b border-blue text-blue"
            >
              Get Premium
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
