import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function UploadAuthorProfile() {
  const initialData = {
    AuthorName: "",
    AuthorInformation: "",
    AuthorAim: "",
  };

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("user");

  const [authorImage, setAuthorImage] = useState(null);
  const [authorData, setAuthorData] = useState(initialData);
  const [imageProgress, setImageProgress] = useState(null);
  const navigate = useNavigate();

  const { AuthorName, AuthorInformation, AuthorAim } = authorData;

  useEffect(() => {
    if (authorImage === null) return;

    const storageRef = ref(storage, `authorImages/${authorImage.name}`);

    const uploadImage = uploadBytesResumable(storageRef, authorImage);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;
          case "running":
            console.log("Uploading");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((authorImageURL) => {
            setAuthorData((prev) => ({ ...prev, AuthorImage: authorImageURL }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, [authorImage]);

  const handleAuthorName = (e) => {
    setAuthorData({ ...authorData, AuthorName: e.target.value });
  };

  const handleAuthorAbout = (e) => {
    setAuthorData({ ...authorData, AuthorInformation: e.target.value });
  };

  const handleAuthorAim = (e) => {
    setAuthorData({ ...authorData, AuthorAim: e.target.value });
  };

  const userNameOnly = userName.replace("@gmail.com", "");

  const addAuthor = async () => {
    if (AuthorName && AuthorInformation && AuthorAim) {
      try {
        alert("Uploading Profile");

        // Use `doc` to reference a specific document
        const authorRef = doc(db, "authors", userId);

        // Use `setDoc` instead of `addDoc` to add data to a specific document
        await setDoc(authorRef, {
          ...authorData,
          timestamp: serverTimestamp(),
        });

        alert("Profile Added Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Create Your Profile</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Your Name"
                value={AuthorName}
                onChange={handleAuthorName}
              />

              <textarea
                type="textarea"
                className="block border border-grey-light w-full h-[200px] p-3 rounded mb-4"
                placeholder="About You"
                value={AuthorInformation}
                onChange={handleAuthorAbout}
              />

              <input
                type="textarea"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Aim"
                value={AuthorAim}
                onChange={handleAuthorAim}
              />

              <input
                type="file"
                placeholder="Pick Image"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                onChange={(e) => setAuthorImage(e.target.files[0])}
              />

              <button
                type="submit"
                disabled={imageProgress !== null && imageProgress < 100}
                onClick={addAuthor}
                style={{ backgroundColor: "#fb923c" }}
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Add Profile
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Want to boost your content?
              <Link
                to="/contact"
                className="ml-2 text-orange-400 no-underline border-b border-blue text-blue"
              >
                Get Premium
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
