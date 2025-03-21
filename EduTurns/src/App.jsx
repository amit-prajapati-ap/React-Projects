import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/course-list",
    element: <CoursesList />,
  },
  {
    path: "/course-list/:input",
    element: <CoursesList />,
  },
  {
    path: "/course/:id",
    element: <CourseDetails />,
  },
  {
    path: "/my-enrollments",
    element: <MyEnrollments />,
  },
  {
    path: "/player/:courseId",
    element: <Player />,
  },
  {
    path: "/loading/:path",
    element: <Loading />,
  },
  {
    path: "/educator",
    element: <Educator />,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: 'add-course',
        element: <AddCourse/>
      },
      {
        path: 'my-courses',
        element: <MyCourses/>
      },
      {
        path: 'student-enrolled',
        element: <StudentsEnrolled/>
      },
    ]
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
