import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({
  children,
  authentication = true,
  errorMessage = null,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const { authStatus, signupStatus } = useSelector(
    (state) => state.userAuth.userInfo
  );

  const authState = authStatus && signupStatus;

  useEffect(() => {
    // Wait until authStatus is defined (avoids undefined state issue)
    if (authState === undefined) return;

    if (authentication && !authState) {
      errorMessage && toast.error(errorMessage);
      navigate("/login");
    } else if (!authentication && authState) {
      navigate("/");
    }

    setLoader(false);
  }, [authState, navigate, authentication]);

  // Show loading state to avoid UI flashing
  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
