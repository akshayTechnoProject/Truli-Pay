import React, { useEffect, useState, useMemo } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import PopUp from "./LocationPopUp";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";
import LocationPopUp from "./LocationPopUp";
export default function LocationManagement() {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [limit, setlimit] = useState(10);
  const [state, setState] = useState(false);
  const Header = [
    {
      name: "Sr. NO.",
      field: "sr_no",
      sortable: false,
    },
    {
      name: "Image",
      field: "image",
      sortable: false,
    },
    {
      name: "Country",
      field: "country",
      sortable: false,
    },
    {
      name: "Weather",
      field: "weather",
      sortable: false,
    },
    {
      name: "Range (₹)",
      sortable: false,
    },

    {
      name: "Edit",
      sortable: false,
    },
    {
      name: "Delete",
      sortable: false,
    },
  ];
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
            <li className="breadcrumb-item active currentPath">
              Location Management
            </li>
          </ol>
          <h1 className="page-header">Location Management</h1>

          {/* <div className="popup">
            <button
              className="btn btn-outline-success"
              style={{
                borderRadius: '20px',
              }}
              onClick={() => {
                setState(!state);
              }}
            >
              Add Location
            </button>
            <PopUp state={state} setState={(e) => setState(e)} />
          </div> */}
          <LocationPopUp state={state} setState={(e) => setState(e)} />
          {!state ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "20px",
                marginTop: "10px",
              }}
            >
              <div className="row w-100">
                <div className="mb-3 col-12 text-center">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
                      <div className="ml-0">
                        <div className="d-flex">
                          <h5 className="mt-2 mr-1">Search: </h5>
                          <Search
                            onSearch={(value) => {
                              setSearch(value);
                              setCurrentPage(1);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-6 col-12 d-flex justify-content-end mb-3">
                      <div
                        style={{
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "300",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        className="align-self-center"
                      >
                        <b>Rows per page :&nbsp;</b>
                      </div>
                      <div className="align-self-center">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="none"
                            id="dropdown-basic"
                            style={{
                              cursor: "auto",
                              backgroundColor: "white",
                              borderColor: "#d5dbe0",
                              paddingBottom: "3px",
                              paddingTop: "3px",
                            }}
                          >
                            {limit}&nbsp;<i class="fa fa-caret-down"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {limit !== 10 ? (
                              <>
                                <Dropdown.Item
                                  onClick={() => {
                                    setlimit(10);
                                  }}
                                >
                                  10
                                </Dropdown.Item>
                              </>
                            ) : null}

                            {limit !== 20 ? (
                              <>
                                <Dropdown.Item
                                  onClick={() => {
                                    setlimit(20);
                                  }}
                                >
                                  20
                                </Dropdown.Item>
                              </>
                            ) : null}

                            {limit !== 30 ? (
                              <>
                                <Dropdown.Item
                                  onClick={() => {
                                    setlimit(30);
                                  }}
                                >
                                  30
                                </Dropdown.Item>
                              </>
                            ) : null}

                            {limit !== 50 ? (
                              <>
                                <Dropdown.Item
                                  onClick={() => {
                                    setlimit(50);
                                  }}
                                >
                                  50
                                </Dropdown.Item>
                              </>
                            ) : null}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-12">
                      <div className="table-responsive">
                        <Table striped bordered hover>
                          <thead>
                            <TableHeader
                              headers={Header}
                              onSorting={(field, order) =>
                                setSorting({ field, order })
                              }
                            />
                          </thead>
                          <tbody></tbody>
                        </Table>
                        <div className="row d-flex justify-content-center w-100">
                          <div className="mx-auto  d-flex justify-content-center w-100">
                            <img
                              src="./assets/img/icon/no-location.png"
                              className="form-img__img-preview"
                              style={{ width: "100px", height: "100px" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="mt-2 d-flex justify-content-sm-center justify-content-xs-center justify-content-lg-end"
                    style={{
                      overflowX: "auto",
                    }}
                  >
                    <Pagination
                      total={totalItems}
                      itemsPerPage={limit}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
