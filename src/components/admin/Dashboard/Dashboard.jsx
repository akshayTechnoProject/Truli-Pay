import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Footer from "../include/Footer";
import { getAuth } from "firebase/auth";
import { query, collection, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";

import countryData from "../json/Country.json";
function Dashboard() {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [limit, setlimit] = useState(10);
  const [totalCountry, setTotalCountry] = useState(0);
  const [totalLocation, setTotalLocation] = useState(0);
  const location = useLocation();
  const [dateBetween, setDateBetween] = useState({ date1: "", date2: "" });
  const [entity, setEntity] = useState([]);
  const [data, setData] = useState([
    {
      id: 1,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-22",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,

          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 2,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,

          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-21",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "06:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 3,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-20",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 4,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-24",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 5,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-25",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 6,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-26",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 7,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-21",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 8,
      bankAccount: 1234567890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-20",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 9,
      bankAccount: 1233367890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-22",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
    {
      id: 10,
      bankAccount: 1234544890,
      walletBalance: 20000,
      bankBalance: 1234567,
      transactions: [
        {
          from: 1234567890,
          to: 2345678967,
          amount: 3456,
          date: "2022-05-22",
          time: "05:34 PM",
          country: "america",
          type: "wallet",
          status: "inprocess",
        },
        {
          from: 1234567890,
          to: 2345678965,
          amount: 3456,
          date: "2022-05-22",
          time: "05:35 PM",
          country: "india",
          type: "bank",
          status: "complete",
        },
      ],
    },
  ]);
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
      name: "Continent",
      field: "continent",
      sortable: false,
    },
    {
      name: "Country",
      field: "country",
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
    if (location.state && localStorage.getItem("first")) {
      toast.success("Login successfull");
      localStorage.setItem("first", false);
    }
    // onSnapshot(query(collection(db, "cities")), (querySnapshot) => {
    // setTotalCountry(querySnapshot.size);
    //});
    //onSnapshot(query(collection(db, "location")), (querySnapshot) => {
    //  setTotalLocation(querySnapshot.size);
    //});
    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);
  const dateWise = (date) => {
    let temp = [];
    data.map((e, i) => {
      e.transactions.map((e1, i) => {
        if (new Date(e1.date).getTime() == new Date(date).getTime())
          temp.push(e1);
      });
    });
    setEntity(temp);
  };
  const betweenDateWise = (event) => {
    event.preventDefault();
    let temp = [];
    console.log(
      "date",
      new Date(dateBetween.date1).getTime() <
        new Date(dateBetween.date2).getTime()
    );
    if (
      new Date(dateBetween.date1).getTime() <
      new Date(dateBetween.date2).getTime()
    ) {
      data.map((e, i) => {
        e.transactions.map((e1, i) => {
          // console.log(
          //   new Date(dateBetween.date1).getTime() <= new Date(e1.date).getTime()
          // );
          // console.log(e1.date + "gf" + dateBetween.date2);
          // console.log(
          //   new Date(e1.date).getTime() <= new Date(dateBetween.date2).getTime()
          // );
          if (
            new Date(dateBetween.date1).getTime() <
              new Date(e1.date).getTime() &&
            new Date(e1.date).getTime() < new Date(dateBetween.date2).getTime()
          ) {
            console.log(e1);
            temp.push(e1);
          }
        });
      });
      setEntity(temp);
    } else {
      alert("End date must be grater then start date");
    }
  };
  const walletWise = () => {
    let temp = [];
    data.map((e, i) => {
      e.transactions.map((e1, i) => {
        if (e1.type == "wallet") temp.push(e1);
      });
    });
    setEntity(temp);
  };
  const bankWise = () => {
    let temp = [];
    data.map((e, i) => {
      e.transactions.map((e1, i) => {
        if (e1.type == "bank") temp.push(e1);
      });
    });
    setEntity(temp);
  };
  const completeTrans = () => {
    let temp = [];
    data.map((e, i) => {
      e.transactions.map((e1, i) => {
        if (e1.status == "complete") temp.push(e1);
      });
    });
    setEntity(temp);
  };
  const inprocessTrans = () => {
    let temp = [];
    data.map((e, i) => {
      e.transactions.map((e1, i) => {
        if (e1.status == "inprocess") temp.push(e1);
      });
    });
    setEntity(temp);
  };
  const commentsData = useMemo(() => {
    let computedComments = entity;

    if (search) {
      computedComments = computedComments.filter(
        (customers) =>
          customers.country.toLowerCase().includes(search.toLowerCase()) ||
          customers.continent.toLowerCase().includes(search.toLowerCase()) ||
          customers.budgetFrom.toLowerCase().includes(search.toLowerCase()) ||
          customers.budgetTo.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * limit,
      (currentPage - 1) * limit + limit
    );
  }, [currentPage, search, sorting, limit, entity]);
  // console.log("Current User", getAuth().currentUser);
  // console.log("Image", localStorage.getItem("DM_Admin_EMAIL"));
  // console.log("Image", localStorage.getItem("DM_Admin_NAME"));
  // console.log("Image", localStorage.getItem("DM_Admin_IMAGE"));
  // console.log("Image", localStorage.getItem("DM_Admin_ID"));
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
            <input type="date" onChange={(e) => dateWise(e.target.value)} />
            <form onSubmit={betweenDateWise}>
              <label>Start Date : </label>
              <input
                type="date"
                onChange={(e) =>
                  setDateBetween({ ...dateBetween, date1: e.target.value })
                }
              />
              <br />
              <label>End Date : </label>

              <input
                type="date"
                onChange={(e) =>
                  setDateBetween({ ...dateBetween, date2: e.target.value })
                }
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
            <br />
            <button className="btn btn-success" onClick={walletWise}>
              Wallet wise
            </button>
            <button className="btn btn-success" onClick={bankWise}>
              Bank Wise
            </button>
            <button className="btn btn-success" onClick={completeTrans}>
              complete transactions
            </button>
            <button className="btn btn-success" onClick={inprocessTrans}>
              ?Inprocess transactions
            </button>

            {console.log(entity)}
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
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
