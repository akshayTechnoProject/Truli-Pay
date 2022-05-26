import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';

function Menu() {
  const navigate = useNavigate();

  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
      })
      .catch((error) => {
        console.log('An error happened.');
      });
    localStorage.removeItem('DM_Admin_ID');
    localStorage.removeItem('DM_Admin_EMAIL');
    localStorage.removeItem('DM_Admin_NAME');
    localStorage.removeItem('DM_Admin_IMAGE');
    navigate('/travel-app-admin');
    toast.success('!Logout Successfully');
  };

  var dashboardClass = window.location.pathname.match(/^\/dashboard/)
    ? 'active'
    : '';

  var userListClass = window.location.pathname.match(/^\/user-list/)
    ? 'active'
    : '';

  // var addRestaurantsClass = window.location.pathname.match(/^\/add-restaurant/) ? "active" : "";

  var userStateClass = window.location.pathname.match(/^\/user-state/)
    ? 'active'
    : '';
  //  if(addRestaurantsClass=='active'){
  //      restaurantsClass = 'active';
  //  }
  var locationManagementClass = window.location.pathname.match(
    /^\/location-management/
  )
    ? 'active'
    : '';

  var countryManagementClass = window.location.pathname.match(
    /^\/country-management/
  )
    ? 'active'
    : '';

  var inquiriesClass = window.location.pathname.match(/^\/inquiries/)
    ? 'active'
    : '';
  var feedbackClass = window.location.pathname.match(/^\/feedback/)
    ? 'active'
    : '';
  useEffect(() => {
    if (localStorage.getItem('DM_Admin_ID') == null) {
      toast.error('!..Please login first');
      navigate('/travel-app-admin');
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
              <img src={localStorage.getItem('DM_Admin_IMAGE')} alt="" />
              <span className="d-none d-md-inline userName">
                {localStorage.getItem('DM_Admin_NAME')}
              </span>{' '}
              <b className="caret"></b>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              style={{ borderRadius: '20px', padding: '5px ' }}
            >
              <span className="dropdown-item">
                <NavLink
                  to="/admin-profile"
                  style={{ textDecoration: 'none', color: '#231549' }}
                >
                  <span className="DropdownItem" style={{ color: '#231549' }}>
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
                to="/user-state"
                className={userStateClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-chart-pie menuIcon"></i>
                  <span className="menuItem">Analyze</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/location-management"
                className={locationManagementClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-map-pin menuIcon"></i>
                  <span className="menuItem">Location</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/country-management"
                className={countryManagementClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-globe menuIcon"></i>
                  <span className="menuItem">Country</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inquiries"
                className={inquiriesClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-question menuIcon"></i>

                  <span className="menuItem"> Inquiries</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                className={feedbackClass}
                activeClassName="active"
              >
                <div className="menuItemDiv">
                  <i className="fa fa-comment menuIcon"></i>
                  <span className="menuItem">Feedback</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
