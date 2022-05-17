import React, { useEffect, useState } from "react";
import Loader from "../include/Loader";
import Menu from "../include/Menu";
import Data from "../json/countryByContinent.json";

import SelectionDropdown from "./components/SelectionDropdown";
export default function CountryManagement() {
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
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [addPicture, setAddPicture] = useState(false);
  const [image, setImage] = useState("");
  const [showImg, setShowImg] = useState({
    src: "",
    alt: "",
  });
  let [state, setState] = useState(0);
  const [placeList, setPlaceList] = useState({ place: [] });
  useEffect(() => {
    document.getElementById("page-loader").style.display = "none";

    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);
  var temp = [];
  useEffect(() => {
    Data.map((e, i) => {
      continentList.push(e.continent);
    });

    setCountinentList([...new Set(continentList)]);

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
    countryName: "",
    continent: "",
    description: "",
    placeToVisit: "",
    budgetFrom: "",
    budgetTo: "",
    safetyGuidelines: "",
    bestMonths: "",
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
    if (!input["countryName"]) {
      isValid = false;
      error["countryName"] = "Please enter country name";
    }
    if (!input["continent"]) {
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
    if (!input["safetyGuidelines"]) {
      isValid = false;
      error["safetyGuidelines"] = "Please enter guidelines";
    }
    if (!input["bestMonths"]) {
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
    //return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validate();
  };
  console.log(state.input);

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
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="₹"
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
                      type="text"
                      className="form-control ml-0"
                      id="exampleInputPassword1"
                      placeholder="₹"
                      name="budgetTo"
                      value={formData.budgetTo}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetTo: e.target.value })
                      }
                    />
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
                <SelectionDropdown
                  list={months}
                  setState={(e) => {
                    if (e) setMonth([...month, e]);
                  }}
                  label=" Best Months to Visit:"
                  firstOption="Select Month"
                />

                <div className="text-danger">{error.bestMonths}</div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={disable}
                >
                  {disable ? "Processing..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
