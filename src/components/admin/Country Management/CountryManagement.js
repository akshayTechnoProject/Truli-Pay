import React, { useEffect, useState, useMemo } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Data from "../json/countryByContinent.json";
import { TableHeader, Pagination, Search } from "../Table";
import { Dropdown, Table } from "react-bootstrap";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
import {
  doc,
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

  var temp = [];
  useEffect(async () => {
    Data.map((e, i) => {
      continentList.push(e.continent);
    });

    setCountinentList([...new Set(continentList)]);
    var k = [];
    // const unsub = onSnapshot(doc(db, "cities"), (doc) => {
    //   console.log("Current data: ", doc.data());
    // });
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let xyz = doc.data();
      k.push(xyz);

      console.log(doc.id, " => ", doc.data());
    });
    setListData(k);
    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, [db]);
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
      navigate("/country-management");

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
                                  src="data:image/png;base64,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"
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
