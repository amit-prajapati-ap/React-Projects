import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Layout>
          <HomePage />
        </Layout>
      </div>
    ),
  },
  {
    path: "/video/:categoryId/:videoId",
    element: (
      <div>
        <Layout>
          <VideoPage />
        </Layout>
      </div>
    ),
  },
  {
    path: "/authentication",
    element: (
      <div>
        <Layout>
          <AuthPage />
        </Layout>
      </div>
    ),
  },
]);

const App = () => {
  return (
    <div className="relative h-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
