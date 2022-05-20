import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { db, storage } from "./firebase/firebase";
import Loader from "./include/Loader";
import Menu from "./include/Menu";
import Footer from "./include/Footer";
import axios from "axios";
import {
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
function Dashboard() {
  const [totalCountry, setTotalCountry] = useState(0);
  const [totalLocation, setTotalLocation] = useState(0);

  useEffect(() => {
    onSnapshot(query(collection(db, "cities")), (querySnapshot) => {
      setTotalCountry(querySnapshot.size);
    });
    onSnapshot(query(collection(db, "location")), (querySnapshot) => {
      setTotalLocation(querySnapshot.size);
    });

    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);

  return (
    <>
      <Loader />

      <div
        id="page-container"
        className="fade page-sidebar-fixed page-header-fixed"
      >
        <Menu />

        <div id="content" className="content">
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item basePath ">
              <a href="javascript:;">Home</a>
            </li>
            <li className="breadcrumb-item active currentPath">Dashboard</li>
          </ol>
          <h1 className="page-header">Dashboard </h1>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div
                className="widget widget-stats bg-success"
                style={{ borderRadius: "20px" }}
              >
                <div className="stats-icon">
                  <i className="fa fa-globe"></i>
                </div>
                <div className="stats-info">
                  <h4>Total Countries</h4>
                  <p>{totalCountry}</p>
                </div>
                <div className="stats-link">
                  <NavLink to="/country-management">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div
                className="widget widget-stats bg-dark"
                style={{ borderRadius: "20px" }}
              >
                <div className="stats-icon">
                  <i className="fa fa-map-pin "></i>
                </div>
                <div className="stats-info">
                  <h4>Total Location</h4>
                  <p>{totalLocation}</p>
                </div>
                <div className="stats-link">
                  <a href="">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3 col-md-6">
                  <div className="widget widget-stats bg-orange">
                     <div className="stats-icon"><i className="fa fa-dollar-sign"></i></div>
                     <div className="stats-info">
                        <h4>Total Revenue</h4>
                        <p>1,291,922</p>
                     </div>
                     <div className="stats-link">
                        <a href="javascript:;">View Detail <i className="fa fa-arrow-alt-circle-right"></i></a>
                     </div>
                  </div>
               </div> */}
            {/* <div className="col-xl-3 col-md-6">
              <div className="widget widget-stats bg-red">
                <div className="stats-icon">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <div className="stats-info">
                  <h4>Total Orders</h4>
                  <p>{orders}</p>
                </div>
                <div className="stats-link">
                  <NavLink to="/orders">
                    View Detail <i className="fa fa-arrow-alt-circle-right"></i>
                  </NavLink>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
