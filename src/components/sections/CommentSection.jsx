import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Heart, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";

export default function CommentSection({ postId }) {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("user");
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const docRef = doc(db, "blogs", postId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setCommentData(docSnap.data().comments || []);
        } else {
          console.log("No such document!");
          setCommentData([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching document:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [postId]);

  const addComment = async () => {
    if (!postId) {
      alert("Looking For Blog to be loaded");
    }

    const docRef = doc(db, "blogs", `${postId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const existingComments = data.comments || [];
      const newComment = {
        userName: userName,
        userId: userId,
        comment: comment,
        likes: 0,
        timestamp: new Date().toISOString(),
      };
      existingComments.push(newComment);
      await updateDoc(docRef, {
        comments: existingComments,
      });

      alert("Comment added successfully!");
    } else {
      alert("No such document!");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
  //   console.log(userName.replace("@gmail.com", ""), userId); Example Code
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="w-full">
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
              Comments
            </h3>
          </div>
          {userId ? (
            <div className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label for="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  id="comment"
                  rows="6"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                onClick={addComment}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 dark:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Post Comment
              </button>
            </div>
          ) : null}
          {loading ? (
            <div className="flex items-center justify-center">
              <div role="status">
                <svg
                  ariaHidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {commentData.length > 0 ? (
                <div>
                  {commentData?.map((data, index) => {
                    return (
                      <article
                        key={index}
                        className="p-6 text-base bg-white rounded-sm dark:bg-gray-900 border-b-2"
                      >
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <UserCheck className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-1" />
                              {data.userName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time
                                pubdate
                                datetime={data.timestamp}
                                title={formatTimestamp(data.timestamp)}
                              >
                                {formatTimestamp(data.timestamp)}
                              </time>
                            </p>
                          </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">
                          {data.comment}
                        </p>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p>
                    No Comments Yet! Be the first one to drop a comment.
                    {!userId ? (
                      <span className="font-bold ml-2">
                        Login to add a Comment
                      </span>
                    ) : null}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
