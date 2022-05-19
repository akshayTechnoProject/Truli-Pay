import React, { useEffect, useState, useMemo } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Data from "../json/countryByContinent.json";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  deleteDoc,
  doc,
  query,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
export default function CountryManagement() {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  var continentList = [];
  const [countinentList, setCountinentList] = useState([]);
  const [continent, setContinent] = useState();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState();
  const [month, setMonth] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",

    "November",

    "December",
  ];
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [limit, setlimit] = useState(10);
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
    // {
    //   name: "View",
    //   field: "category",
    //   sortable: false,
    // },
  ];
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [addPicture, setAddPicture] = useState(false);
  const [image, setImage] = useState("");
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: "",
    alt: "",
  });

  let [state, setState] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const getData = () => {
    const q = query(collection(db, "cities"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      let i = 1;

      querySnapshot.forEach((doc) => {
        cities.push({ ...doc.data(), sr_no: i, id: doc.id });
        i++;
      });
      setListData(cities);
    });
    return () => {
      unsubscribe();
    };
  };
  var temp = [];
  useEffect(() => {
    Data.map((e, i) => {
      continentList.push(e.continent);
    });
    getData();

    setCountinentList([...new Set(continentList)]);

    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);
  const handleContinent = (e) => {
    setContinent(e);
    Data.filter((e1, i) => e1.continent == e).map((e, i) => {
      temp.push(e.country);
    });
    setCountryList(temp);
  };
  const [formData, setFormData] = useState({
    description: "",
    budgetFrom: "",
    budgetTo: "",
    safetyGuidelines: "",
  });
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [option5, setOption5] = useState(false);
  var file = "";
  const uploadPicture = async (e) => {
    e.preventDefault();
    file = e.target.files[0];
    const storage = getStorage();
    const reference = ref(storage, `banner_${new Date().getTime()}.jpg`);

    uploadBytes(reference, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then(async (downloadURL) => {
        if (file) {
          setShowImg({
            src: downloadURL,
            alt: e.target.files[0].name,
          });
        }
        setImage(downloadURL);
      });
    setAddPicture(true);
  };

  const validate = () => {
    let isValid = true;
    let input = formData;
    let error = {};
    if (!country) {
      isValid = false;
      error["countryName"] = "Please enter country name";
    }
    if (!continent) {
      isValid = false;
      error["continent"] = "Please enter continent";
    }
    if (!addPicture) {
      isValid = false;
      error["img_err"] = "Please select the image.";
    }
    if (!input["description"].trim()) {
      isValid = false;
      error["description"] = "Please enter description";
    }
    if (placeList.length === 0) {
      isValid = false;
      error["placeToVisit"] = "Please enter name of place ";
    }
    if (!input["budgetFrom"]) {
      isValid = false;
      error["budget"] = "Please enter budget";
    }
    if (!input["budgetTo"]) {
      isValid = false;
      error["budget"] = "Please enter budget";
    }
    if (Number(input["budgetFrom"]) >= Number(input["budgetTo"]) + 100) {
      isValid = false;
      error["budgetInvalid"] =
        "Maximum value can't be less then minimum (Ex. : from:4000 To: 4100)";
    }
    if (!input["safetyGuidelines"].trim()) {
      isValid = false;
      error["safetyGuidelines"] = "Please enter guidelines";
    }
    if (month.length === 0) {
      isValid = false;
      error["bestMonths"] = "Please enter months";
    }
    if (
      option1 == false &&
      option2 == false &&
      option3 == false &&
      option4 == false &&
      option5 == false
    ) {
      isValid = false;
      error["multiChoice"] = "Please select any one";
    }
    setError(error);
    return isValid;
    //return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisable(true);
    const uploadDataList = async (tempData) => {
      try {
        await addDoc(collection(db, "cities"), tempData);
      } catch (e) {
        console.warn(e);
      }
    };

    if (validate()) {
      var tempData = {
        continent: continent,
        country: country,
        description: formData.description,
        placeToVisit: placeList,
        budgetFrom: formData.budgetFrom,
        budgetTo: formData.budgetTo,
        safetyGuidelines: formData.safetyGuidelines,
        bestMonths: month,
        image: image,
        category: {
          Mountains: option1,
          "Sea Side": option2,
          Adventures: option3,
          Desert: option4,
          Romantic: option5,
        },
      };

      uploadDataList(tempData).then(() => {
        // navigate("/country-management");
        setShowImg({
          src: "",
          alt: "",
        });
        setFormData({
          description: "",
          budgetFrom: "",
          budgetTo: "",
          safetyGuidelines: "",
        });
        setMonth([]);
        setPlaceList([]);
        setDisable(false);
      });
    } else {
      setDisable(false);
    }
  };

  const commentsData = useMemo(() => {
    let computedComments = listData;

    if (search) {
      computedComments = computedComments.filter(
        (customers) =>
          customers.country.toLowerCase().includes(search.toLowerCase()) ||
          customers.continent.toLowerCase().includes(search.toLowerCase())
        // customers.username.toLowerCase().includes(search.toLowerCase()) ||
        // customers.phone_number.toLowerCase().includes(search.toLowerCase())
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
  }, [currentPage, search, sorting, limit, listData]);

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
              Country Management
            </li>
          </ol>
          <h1 className="page-header">Country Management</h1>
          {/* <p>
            <button
              className="btn btn-outline-success"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              style={{ borderRadius: "20px" }}
            >
              Add Country
            </button>
          </p> */}
          <div>
            <Popup
              trigger={
                <button
                  className="btn btn-outline-success"
                  style={{ borderRadius: "20px" }}
                >
                  Add Country
                </button>
              }
              modal
              nested
              lockScroll={true}
              contentStyle={{
                marginTop: "30px",
              }}
            >
              {(close) => (
                <div
                  style={{
                    height: "100vh",
                    padding: "20px",
                    whiteSpace: "nowrap",
                    overflowY: "visible",
                    overflowX: "hidden",
                    paddingBottom: "40px",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="page-header"> Add country </div>

                    <button
                      className="btn btn-outline-success "
                      style={{
                        fontSize: "30px",
                        padding: 0,
                        border: "none",
                      }}
                      onClick={close}
                    >
                      &times;
                    </button>
                  </div>
                  <div>
                    <div>
                      <form className="CountryForm">
                        <SelectionDropdown
                          list={countinentList}
                          setState={handleContinent}
                          label="Continent Name:"
                          firstOption="Select Continent"
                        />
                        <div
                          className="text-danger"
                          style={{ marginTop: "-13px", marginBottom: "5px" }}
                        >
                          {error.continent}
                        </div>

                        {countryList && continent ? (
                          <>
                            <SelectionDropdown
                              list={countryList}
                              setState={(e) => {
                                setCountry(e);
                              }}
                              label="Country Name:"
                              firstOption="Select Country"
                            />
                            <div
                              className="text-danger"
                              style={{
                                marginTop: "-13px",
                                marginBottom: "5px",
                              }}
                            >
                              {error.countryName}
                            </div>
                          </>
                        ) : null}
                        <div class="form-group">
                          <label for="exampleInputPassword1"> Category: </label>
                          <br />
                          <div className="row categoryDiv">
                            <div className="form-check form-check-inline ">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="inlineCheckbox1"
                                name="option1"
                                value="option1"
                                onClick={(e) => setOption1(!option1)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label mb-2 checkBox"
                                for="inlineCheckbox1"
                              >
                                Mountains
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="inlineCheckbox2"
                                name="option2"
                                value="option2"
                                onClick={(e) => setOption2(!option2)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label mb-2 checkBox"
                                for="inlineCheckbox2"
                              >
                                Sea Side
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="inlineCheckbox3"
                                value="option3"
                                name="option3"
                                onClick={(e) => setOption3(!option3)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label mb-2 checkBox"
                                for="inlineCheckbox3"
                              >
                                Adventures
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="inlineCheckbox4"
                                value="option4"
                                name="option4"
                                onClick={(e) => setOption4(!option4)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label mb-2 checkBox"
                                for="inlineCheckbox4"
                              >
                                Desert
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                id="inlineCheckbox5"
                                value="option5"
                                name="option5"
                                onClick={(e) => setOption5(!option5)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label mb-2 checkBox"
                                for="inlineCheckbox5"
                              >
                                Romantic
                              </label>
                            </div>
                          </div>
                          <div className="text-danger">{error.multiChoice}</div>
                        </div>

                        <div className="form-group mb-4">
                          <label for="exampleFormControlFile1">Image:</label>
                          <input
                            type="file"
                            className="form-control-file imgInput"
                            id="exampleFormControlFile1"
                            onChange={uploadPicture}
                            style={{ cursor: "pointer" }}
                          />
                          {showImg.src != "" ? (
                            <img
                              src={showImg.src}
                              className="form-img__img-preview"
                              style={{ width: "84px", height: "84px" }}
                              alt="imgs"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="text-danger">{error.img_err}</div>
                        <div className="form-group mb-4">
                          <label for="exampleFormControlTextarea1">
                            Description:
                          </label>
                          <textarea
                            className="form-control textArea"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                          <div className="text-danger">{error.description}</div>
                        </div>

                        <div className="form-group mb-4">
                          <label for="exampleInputPassword1">
                            Places to Visit:
                          </label>
                          <div className="d-flex align-item-center">
                            <input
                              type="text"
                              className="form-control ml-0"
                              id="exampleInputPassword1"
                              placeholder="Enter places"
                              name="placeToVisit"
                              value={state}
                              onChange={(e) => {
                                if (e.target.value.trim().length != 0)
                                  setState(e.target.value);
                                else setState("");
                              }}
                            />
                            <button
                              className="btn btn-sm btn-primary"
                              style={{
                                borderRadius: "20px",
                                height: "30px",
                                marginTop: "14px",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                if (state)
                                  setPlaceList([
                                    ...new Set([...placeList, state]),
                                  ]);
                                setState("");
                              }}
                            >
                              Add
                            </button>
                          </div>
                          <div className="text-danger">
                            {error.placeToVisit}
                          </div>
                          <div className="placeListDiv row">
                            {placeList.length !== 0 ? (
                              <div>
                                {placeList.map((subItems, i) => {
                                  return (
                                    <button
                                      className="btn btn-primary m-4 placeButton"
                                      type="button"
                                    >
                                      {subItems}
                                      <span className="placeDeleteIcon">
                                        <i
                                          className="fa fa-trash placeDeleteIcon"
                                          onClick={(e1) => {
                                            e1.preventDefault();
                                            let array = placeList;
                                            let index = i;

                                            if (index !== -1) {
                                              array.splice(index, 1);
                                              setMonth(array);
                                            }
                                            setchange(!change);
                                          }}
                                        ></i>
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label for="exampleInputPassword1">
                            Budget Range Per Person:
                          </label>
                          <div className="d-flex w-100">
                            <label
                              for="exampleInputPassword1"
                              style={{ marginTop: "16px", marginRight: "5px" }}
                            >
                              From:
                            </label>
                            <input
                              type="number"
                              className="form-control ml-0"
                              id="exampleInputPassword1"
                              placeholder="Minimum ₹"
                              name="budgetFrom"
                              value={formData.budgetFrom}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  budgetFrom: e.target.value,
                                })
                              }
                            />
                            <label
                              for="exampleInputPassword1"
                              style={{ marginTop: "16px", marginRight: "5px" }}
                            >
                              To:
                            </label>
                            <input
                              type="number"
                              className="form-control ml-0"
                              id="exampleInputPassword1"
                              placeholder="Maximum ₹"
                              name="budgetTo"
                              value={formData.budgetTo}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  budgetTo: e.target.value,
                                })
                              }
                            />
                            <div className="text-danger">
                              {error.budgetInvalid}
                            </div>
                          </div>
                          <div className="text-danger">{error.budget}</div>
                        </div>
                        <div className="form-group mb-4">
                          <label for="exampleFormControlTextarea1">
                            Safety Guidelines:
                          </label>
                          <textarea
                            className="form-control textArea"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="safetyGuidelines"
                            value={formData.safetyGuidelines}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                safetyGuidelines: e.target.value,
                              })
                            }
                          ></textarea>
                          <div className="text-danger">
                            {error.safetyGuidelines}
                          </div>
                        </div>
                        <SelectionDropdownMonth
                          list={months}
                          setState={(e) => {
                            if (e) {
                              setMonth([...new Set([...month, e])]);
                            }
                          }}
                          label=" Best Months to Visit:"
                          firstOption="Select Month"
                        />
                        <div className="text-danger">{error.bestMonths}</div>
                        <div className="placeListDiv row">
                          {month.length !== 0 ? (
                            <div>
                              {month.map((subItems, i) => {
                                return (
                                  <button
                                    className="btn btn-primary m-4 placeButton"
                                    type="button"
                                  >
                                    {subItems}{" "}
                                    <span className="placeDeleteIcon">
                                      <i
                                        className="fa fa-trash placeDeleteIcon"
                                        onClick={(e1) => {
                                          e1.preventDefault();

                                          var array = month;
                                          var index = i;

                                          if (index !== -1) {
                                            array.splice(index, 1);
                                            setMonth(array);
                                          }
                                          setchange(!change);
                                        }}
                                      ></i>
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={disable}
                          onClick={(e) => {
                            submitHandler(e);
                            if (validate()) close();
                          }}
                        >
                          {disable ? "Processing..." : "Upload"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
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
                        <tbody>
                          {commentsData.map((e, i) => (
                            <tr>
                              <td>{e.sr_no}</td>
                              <td>
                                <img
                                  src={e.image}
                                  width="70px"
                                  height="60px"
                                  alt="banner"
                                />
                              </td>
                              <td>{e.continent}</td>
                              <td>{e.country}</td>

                              <td>{`${e.budgetFrom} - ${e.budgetTo}`}</td>
                              <td>
                                <i
                                  className="fa fa-eye edit"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    console.log(e);

                                    // setContinent(e.continent);
                                    // setPlaceList(e.placeToVisit);

                                    // setOption1(e.category.Mountains);
                                    // setOption2(e.category["Sea Side"]);
                                    // setOption3(e.category.Adventures);
                                    // setOption4(e.category.Desert);
                                    // setOption5(e.category.Romantic);
                                    // setFormData({
                                    //   description: e.description,
                                    //   budgetFrom: e.budgetFrom,
                                    //   budgetTo: e.budgetTo,
                                    //   safetyGuidelines: e.safetyGuidelines,
                                    // });
                                  }}
                                ></i>
                              </td>
                              <td>
                                <i
                                  className="fa fa-trash delete"
                                  style={{ cursor: "pointer" }}
                                  onClick={async () => {
                                    if (
                                      window.confirm(
                                        "Do you want to delete? "
                                      ) == true
                                    ) {
                                      await deleteDoc(doc(db, "cities", e.id));
                                    } else {
                                    }
                                  }}
                                ></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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
        </div>
      </div>
    </>
  );
}
