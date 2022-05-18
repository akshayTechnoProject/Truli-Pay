import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPass() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setemail] = useState(location?.state ? location?.state : "");
  const [checkVisible, setcheckVisible] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    if (email.trim().length === 0) {
      setcheckVisible(true);
    } else {
      sendPasswordResetEmail(auth, email)
        .then(async () => {
          // Password reset email sent!
          localStorage.setItem("forgotTest", true);
          navigate("/");
          // ..
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage.search("user-not-found") !== -1) {
            toast.error(`Enter valid email`);
            setDisable(false);
          } else {
            if (errorMessage.search("auth/network-request-failed") !== -1)
              toast.error("Please, Connect with internet.");
            else toast.error("Something went Wrong");
            setDisable(false);
          }

          // ..
        });

      setcheckVisible(false);
    }
  };
  // if (localStorage.getItem("DM_Admin_ID") != null) {
  //   toast.error("Already login...!");
  // }

  const [loginInfo, setLoginInfo] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);

  return (
    <>
      <div id="page-loader" className="fade show">
        <span className="spinner"></span>
      </div>

      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{
            backgroundImage: "url(assets/img/login-bg/login-bg-17.jpg)",
          }}
          data-id="login-cover-image"
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div id="page-container" className="fade">
        <div
          className="login login-v2"
          data-pageload-addclassName="animated fadeIn"
        >
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Travel App</b>
              <small>Forgot Password </small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div>

          <div className="login-content">
            <form onSubmit={submitHandler}>
              <div className="form-group m-b-20">
                <input
                  type="text"
                  className="form-control form-control-lg ml-0"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
                {checkVisible ? (
                  <div className="text-danger ms-0 text-start">
                    Please enter email
                  </div>
                ) : null}{" "}
              </div>
              <div className="form-group m-b-20">
                <NavLink to={"/travel-app-admin"}>Login Page</NavLink>
              </div>
              <div className="login-buttons">
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-lg"
                  disabled={disable}
                >
                  {disable ? "Processing..." : "Send Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
