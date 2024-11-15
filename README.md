
# Daily1Blog

**Daily1Blog** is a full-featured personal blogging platform built with **React.js** and **Firebase**. Users can create, publish, and interact with blogs written in **Markdown** format. With built-in authentication, file uploads, and real-time updates, Daily1Blog provides a seamless experience for sharing and engaging with content.

## Features

- **User Authentication**: Secure signup and login with Firebase Authentication.
- **Markdown Blog Editor**: Create and format blogs with Markdown syntax.
- **File Uploads**: Upload images and other media to enhance blog posts.
- **Post Engagement**: Upvote and downvote blog posts.
- **Comments**: Add and view comments on each post for community interaction.
- **Real-Time Updates**: Powered by Firebase Firestore for instantaneous data changes.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Screenshots

Include screenshots here that show off the key parts of the UI, such as the post editor, voting system, and comments section.

## Getting Started

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- A **Firebase Project** set up for Authentication, Firestore, and Storage

## Installation

1. **Clone the repository:**

```bash
	git clone https://github.com/yourusername/daily1blog.git 
	cd daily1blog
	npm install
```

2.   **Firebase Configuration:**
    -   Go to Firebase Console and create a project.
    -   Enable **Authentication** with email/password.
    -   Set up **Firestore Database** to store blog data, votes, and comments.
    -   Enable **Firebase Storage** for media uploads.
3.   **Set up environment variables:**
    
    Create a `.env` file in the root directory with your Firebase configuration
		
		REACT_APP_API_KEY=your_api_key
		REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
		REACT_APP_PROJECT_ID=your_project_id
		REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
		REACT_APP_MESSAGING_SENDER_ID=your_sender_id
		REACT_APP_APP_ID=your_app_id

4. Start the Application
		
    ```bash
		npm run dev or yarn dev
	```

## Usage

1.  **Register / Log In**: Create an account or log in to access the full functionality.
2.  **Create a Blog Post**: Use the Markdown editor to write and format your blog post.
3.  **Upload Media**: Add images or other media files to enrich your post.
4.  **Upvote/Downvote Posts**: Engage with content by upvoting or downvoting blog posts.
5.  **Comment on Posts**: Share thoughts or start discussions in the comments section.
6.  **View Real-Time Updates**: All interactions update in real time thanks to Firebase Firestore.

## Tech Stack

-   **Frontend**: React.js, CSS, Markdown Editor (e.g., `react-markdown-editor-lite`)
-   **Backend**: Firebase (Authentication, Firestore, Storage)

## Contributing

Contributions are welcome! If you’d like to make improvements or add features, please follow these steps:

1.  **Fork** the project.
2.  Create a **new branch** (`git checkout -b feature/YourFeature`).
3.  **Commit** your changes (`git commit -m 'Add new feature'`).
4.  **Push** to the branch (`git push origin feature/YourFeature`).
5.  Open a **Pull Request** for review.
    
