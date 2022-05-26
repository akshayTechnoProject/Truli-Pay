import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import InfoIcon from "@material-ui/icons/Info";
import PolicyIcon from "@material-ui/icons/Policy";
import GavelIcon from "@material-ui/icons/Gavel";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
function Menu() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
    localStorage.removeItem("DM_Admin_ID");
    localStorage.removeItem("DM_Admin_EMAIL");
    localStorage.removeItem("DM_Admin_NAME");
    localStorage.removeItem("DM_Admin_IMAGE");
    navigate("/travel-app-admin");
    toast.success("!Logout Successfully");
  };

  var dashboardClass = window.location.pathname.match(/^\/dashboard/)
    ? "active"
    : "";

  var userListClass = window.location.pathname.match(/^\/user-list/)
    ? "active"
    : "";

  // var addRestaurantsClass = window.location.pathname.match(/^\/add-restaurant/) ? "active" : "";

  var pp = window.location.pathname.match(/^\/privatepolicy/) ? "active" : "";
  //  if(addRestaurantsClass=='active'){
  //      restaurantsClass = 'active';
  //  }
  var TandC = window.location.pathname.match(/^\/t&c/) ? "active" : "";

  var aboutus = window.location.pathname.match(/^\/aboutus/) ? "active" : "";

  var inquiriesClass = window.location.pathname.match(/^\/inquiries/)
    ? "active"
    : "";
  var feedbackClass = window.location.pathname.match(/^\/feedback/)
    ? "active"
    : "";
  useEffect(() => {
    if (localStorage.getItem("DM_Admin_ID") == null) {
      toast.error("!..Please login first");
      navigate("/travel-app-admin");
    }
  }, []);

  return (
    <>
      <div id="header" className="header navbar-default">
        <div className="navbar-header">
          <NavLink to="/dashboard" className="navbar-brand ">
            {/* <img
              src="/assets/img/logo/adminLogo.png"
              alt="Travel-App-logo"
              className="d-inline-block align-text-top mr-2"
            /> */}
            {/* <span className="logo"></span> */}
            <span className="BrudAdmin">
              <b>Truli Pay</b>
            </span>
          </NavLink>

          <button
            type="button"
            className="navbar-toggle"
            data-click="sidebar-toggled"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <ul className="navbar-nav navbar-right">
          <li className="dropdown navbar-user">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src={localStorage.getItem("DM_Admin_IMAGE")} alt="" />
              <span className="d-none d-md-inline userName">
                {localStorage.getItem("DM_Admin_NAME")}
              </span>{" "}
              <b className="caret"></b>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              style={{ borderRadius: "20px", padding: "5px " }}
            >
              <span className="dropdown-item">
                <NavLink
                  to="/admin-profile"
                  style={{ textDecoration: "none", color: "#231549" }}
                >
                  <span className="DropdownItem" style={{ color: "#231549" }}>
                    Edit Profile
                  </span>
                </NavLink>
              </span>
              <a onClick={Logout} className="dropdown-item DropdownItem">
                Log Out
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div id="sidebar" className="sidebar">
        <div data-scrollbar="true" data-height="100%">
          <div className="nav-header"></div>
          <ul className="nav">
            <li>
              <NavLink
                to="/dashboard"
                className={dashboardClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-th-large menuIcon"></i>
                  <span className="menuItem">Dashboard</span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/user-list"
                className={userListClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-users menuIcon"></i>
                  <span className="menuItem">Users</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/queries"
                className={inquiriesClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-question menuIcon"></i>

                  <span className="menuItem"> Queries</span>
                </div>
              </NavLink>
            </li>
            <li
              onClick={() => setVisible(!visible)}
              style={{ cursor: "pointer", marginInlineStart: "10px" }}
            >
              <div className="menuItemDiv">
                <span className="menuItem">CMS</span>
                <i className="menuIcon">
                  {visible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </i>
              </div>
            </li>
            {visible ? (
              <>
                <li>
                  <NavLink
                    to="/cms/t&c"
                    className={TandC}
                    activeClassName="active"
                  >
                    <div
                      className="menuItemDiv"
                      style={{ marginInlineStart: "25px" }}
                    >
                      <i className="menuIcon">
                        <GavelIcon style={{ fontSize: "17px" }} />
                      </i>
                      <span
                        className="menuItem"
                        onClick={() => setVisible(!visible)}
                      >
                        T&C
                      </span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cms/privatepolicy"
                    className={pp}
                    activeClassName="active"
                  >
                    <div
                      className="menuItemDiv"
                      style={{ marginInlineStart: "25px" }}
                    >
                      <i className="menuIcon">
                        <PolicyIcon style={{ fontSize: "17px" }} />
                      </i>
                      <span
                        className="menuItem"
                        onClick={() => setVisible(!visible)}
                      >
                        Policy
                      </span>{" "}
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/cms/aboutus"
                    className={aboutus}
                    activeClassName="active"
                  >
                    <div
                      className="menuItemDiv"
                      style={{ marginInlineStart: "25px" }}
                    >
                      <i className="menuIcon">
                        <InfoIcon style={{ fontSize: "17px" }} />
                      </i>
                      <span
                        className="menuItem"
                        onClick={() => setVisible(!visible)}
                      >
                        AboutUs
                      </span>{" "}
                    </div>
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
