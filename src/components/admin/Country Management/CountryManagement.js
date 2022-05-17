import React, { useEffect, useState, useMemo } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Data from "../json/countryByContinent.json";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import {
  doc,
  query,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
export default function CountryManagement() {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  var continentList = [];
  const [countinentList, setCountinentList] = useState([]);
  const [continent, setContinent] = useState();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState();
  const [month, setMonth] = useState([]);
  console.log(listData);
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
      name: "Place",
      field: "placeToVisit",
      sortable: false,
    },
    {
      name: "BestMonths",
      field: "bestMonths",
      sortable: false,
    },
    // {
    //   name: "Category",
    //   field: "category",
    //   sortable: false,
    // },
    {
      name: "Range",
      // field: "category",
      sortable: false,
    },
    // {
    //   name: "View",
    //   field: "category",
    //   sortable: false,
    // },
  ];
  // const [visible, setvisible] = useState(second)
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [addPicture, setAddPicture] = useState(false);
  const [image, setImage] = useState("");
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: "",
    alt: "",
  });
  useEffect(async () => {}, []);

  let [state, setState] = useState(0);
  const [placeList, setPlaceList] = useState({ place: [] });
  const getData = () => {
    const cities = [];

    const q = query(collection(db, "cities"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // let ss={doc.data(),sr_id}
        cities.push(doc.data());
      });
      console.log("Current cities in CA: ", cities);
      setListData(cities);
    });
    return () => unsubscribe();
  };
  var temp = [];
  useEffect(async () => {
    Data.map((e, i) => {
      continentList.push(e.continent);
    });

    setCountinentList([...new Set(continentList)]);
    getData();
    // const querySnapshot = await getDocs(collection(db, "cities"));

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   let xyz = doc.data();
    //   k.push(xyz);

    //   console.log(doc.id, " => ", doc.data());
    // });

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

  const uploadPicture = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setShowImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
    setAddPicture(true);
    setImage(e.target.files[0]);
    uploadBytes(storageRef, URL.createObjectURL(e.target.files[0])).then(
      (snapshot) => {
        console.log("Uploaded a blob or file!");
      }
    );
  };

  const addNewPlace = (e) => {
    if (formData.placeToVisit != "") {
      e.preventDefault();
      let input = state;
      console.log(input);
      placeList.place.push(input);
      setState({ input: null });
      formData.placeToVisit = "";
    } else {
    }
  };
  function deleteItem(e, id) {
    e.preventDefault();
    var array = [...placeList.place];
    var index = id;

    if (index !== -1) {
      array.splice(index, 1);
      setPlaceList({ place: array });
    }
    console.log("Delete Place", placeList);
  }
  console.log("place List", placeList);

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
    if (!input["description"]) {
      isValid = false;
      error["description"] = "Please enter description";
    }
    if (placeList.place == "") {
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
    if (input["budgetFrom"] >= input["budgetTo"] + 100) {
      isValid = false;
      error["budgetInvalid"] =
        "Maximum value can't be less then minimum (Ex. : from:4000 To: 4100)";
    }
    if (!input["safetyGuidelines"]) {
      isValid = false;
      error["safetyGuidelines"] = "Please enter guidelines";
    }
    if (!month) {
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
    if (validate()) {
      let tempData = {
        continent: continent,
        country: country,
        description: formData.description,
        placeToVisit: placeList.place,
        budgetFrom: formData.budgetFrom,
        budgetTo: formData.budgetTo,
        safetyGuidelines: formData.safetyGuidelines,
        bestMonths: month,
        image: showImg.src,
        category: {
          Mountains: option1,
          "Sea Side": option2,
          Adventures: option3,
          Desert: option4,
          Romantic: option5,
        },
      };
      // await setDoc(doc(db, "cities"), {
      //   tempData,
      // });

      const docRef = await addDoc(collection(db, "cities"), tempData);
      navigate(0);
      // getData();
      // Add a new document in collection "cities"
      // await setDoc(doc(db), "cmanage", tempData);
      // console.log(tempData);
    } else {
    }
  };
  console.log(state.input);

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
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");

  // 'file' comes from the Blob or File API

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

          <p>
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
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <form>
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
                      style={{ marginTop: "-13px", marginBottom: "5px" }}
                    >
                      {error.countryName}
                    </div>
                  </>
                ) : null}
                <div class="form-group">
                  <label for="exampleInputPassword1"> Category: </label>
                  <br />

                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="option1"
                      value="option1"
                      onClick={(e) => setOption1(!option1)}
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
                      id="inlineCheckbox2"
                      value="option3"
                      name="option3"
                      onClick={(e) => setOption3(!option3)}
                    />
                    <label
                      className="form-check-label mb-2 checkBox"
                      for="inlineCheckbox2"
                    >
                      Adventures
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option4"
                      name="option4"
                      onClick={(e) => setOption4(!option4)}
                    />
                    <label
                      className="form-check-label mb-2 checkBox"
                      for="inlineCheckbox2"
                    >
                      Desert
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option5"
                      name="option5"
                      onClick={(e) => setOption5(!option5)}
                    />
                    <label
                      className="form-check-label mb-2 checkBox"
                      for="inlineCheckbox2"
                    >
                      Romantic
                    </label>
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
                  <label for="exampleFormControlTextarea1">Description:</label>
                  <textarea
                    className="form-control textArea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                  <div className="text-danger">{error.description}</div>
                </div>

                <div className="form-group mb-4">
                  <label for="exampleInputPassword1">Places to Visit:</label>
                  <div className="d-flex align-item-center">
                    <input
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="Enter places"
                      name="placeToVisit"
                      value={formData.placeToVisit}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          placeToVisit: e.target.value,
                        });
                        setState({ input: e.target.value });
                      }}
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      style={{
                        borderRadius: "20px",
                        height: "30px",
                        marginTop: "14px",
                      }}
                      onClick={addNewPlace}
                    >
                      Add
                    </button>
                  </div>
                  <div className="text-danger">{error.placeToVisit}</div>
                  <div className="placeListDiv row">
                    {placeList.place != "" ? (
                      <div>
                        {placeList.place.map((subItems, i) => {
                          return (
                            <button className="btn btn-primary m-4 placeButton">
                              {placeList?.place[i]?.input}{" "}
                              <span className="placeDeleteIcon">
                                <i
                                  className="fa fa-trash placeDeleteIcon"
                                  onClick={(e) => {
                                    console.log(e);
                                    deleteItem(e, i);
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
                        setFormData({ ...formData, budgetFrom: e.target.value })
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
                        setFormData({ ...formData, budgetTo: e.target.value })
                      }
                    />
                    <div className="text-danger">{error.budgetInvalid}</div>
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
                  <div className="text-danger">{error.safetyGuidelines}</div>
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
                          <button className="btn btn-primary m-4 placeButton">
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
                  onClick={submitHandler}
                >
                  {disable ? "Processing..." : "Upload"}
                </button>
              </form>
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
                        <tbody>
                          {commentsData.map((e, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"
                                  width="70px"
                                  height="60px"
                                  alt="banner"
                                />
                              </td>
                              <td>{e.continent}</td>
                              <td>{e.country}</td>
                              <td>
                                {e.placeToVisit.map((e, i) => (
                                  <p>
                                    {e.input}
                                    <br />
                                  </p>
                                ))}
                              </td>
                              <td>
                                {" "}
                                {e.bestMonths.map((e, i) => (
                                  <p>
                                    {e}
                                    <br />
                                  </p>
                                ))}
                              </td>
                              {/* <td>
                                {e.category.Adventures ? (
                                  <p>{e.category.Adventures}</p>
                                ) : null}
                                {e.category.Desert ? (
                                  <p>{e.category.Desert} </p>
                                ) : null}
                                {e.category.Mountains ? (
                                  <p>{e.category.Mountains}</p>
                                ) : null}
                                {e.category.Romantic ? (
                                  <p>{e.category.Romantic}</p>
                                ) : null}
                                {e.category["Sea Side"] ? (
                                  <p>{e.category["Sea Side"]}</p>
                                ) : null}
                              </td> */}
                              <td>{`${e.budgetFrom}-${e.budgetTo}`}</td>
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
