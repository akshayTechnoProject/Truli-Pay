import React, { useEffect } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
export default function Queries() {
  useEffect(() => {
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
            <li className="breadcrumb-item active currentPath">queries</li>
          </ol>
          <h1 className="page-header">queries</h1>
        </div>
      </div>
    </>
  );
}
