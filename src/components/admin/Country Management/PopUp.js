import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Data from "../json/countryByContinent.json";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
export default function PopUp(props) {
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
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: "",
    alt: "",
  });

  let [state, setState] = useState("");
  const [placeList, setPlaceList] = useState([]);
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
  useEffect(() => {
    Data.map((e, i) => {
      continentList.push(e.continent);
    });
    setCountinentList([...new Set(continentList)]);
  }, []);

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
      error["budget"] = "Please enter minimum budget";
    } else if (!input["budgetTo"]) {
      isValid = false;
      error["budget"] = "Please enter maximum budget";
    } else if (formData.budgetFrom <= 0) {
      isValid = false;
      error["budget"] = "Amount should be positive";
    } else if (formData.budgetTo <= 0) {
      isValid = false;
      error["budget"] = "Amount should be positive";
    } else if (formData.budgetFrom >= formData.budgetTo) {
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
      error["bestMonths"] = "Please select month";
    }
    if (
      option1 === false &&
      option2 === false &&
      option3 === false &&
      option4 === false &&
      option5 === false
    ) {
      isValid = false;
      error["multiChoice"] = "Please select any one";
    }
    setError(error);
    return isValid;
  };
  const uploadPicture = async (e) => {
    e.preventDefault();

    const storage = getStorage();
    const reference = ref(storage, `banner_${new Date().getTime()}.jpg`);

    uploadBytes(reference, e.target.files[0])
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then(async (downloadURL) => {
        if (e.target.files[0]) {
          setShowImg({
            src: downloadURL,
            alt: e.target.files[0].name,
          });
        }
        setImage(downloadURL);
      });
    setAddPicture(true);
  };
  const handleContinent = (e) => {
    var temp = [];

    if (e != "Select Continent") {
      setContinent(e);
    } else {
      setContinent("");
    }
    Data.filter((e1, i) => e1.continent == e).map((e, i) => {
      temp.push(e.country);
    });
    setCountryList(temp);
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
  return (
    <>
      <div className="popup">
        <Popup
          open={props.state}
          modal
          nested
          lockScroll={true}
          onClose={() => {
            props.setState(false);
          }}
          contentStyle={{
            zIndex: "10",
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
              <br />
              <br />
              <br />
              <div className="d-flex justify-content-between">
                <div className="page-header"> Add country </div>

                <button
                  className="btn btn-outline-success "
                  style={{
                    fontSize: "30px",
                    paddingTop: "0",
                    paddingBottom: "0",
                    border: "none",
                    paddingRight: "5px",
                    paddingLeft: "5px",
                  }}
                  onClick={() => {
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
                    close();
                  }}
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
                      style={{ marginTop: "-20px", marginBottom: "15px" }}
                    >
                      {error.continent}
                    </div>

                    {countryList && continent ? (
                      <>
                        <SelectionDropdown
                          list={countryList}
                          setState={(e) => {
                            if (e != "Select Country") {
                              setCountry(e);
                            } else {
                              setCountry("");
                            }
                          }}
                          label="Country Name:"
                          firstOption="Select Country"
                        />
                        <div
                          className="text-danger"
                          style={{
                            marginTop: "-20px",
                            marginBottom: "15px",
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
                        accept="image/png, image/gif, image/jpeg"
                      />
                      <div className="text-danger">{error.img_err}</div>
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
                              setPlaceList([...new Set([...placeList, state])]);
                            setState("");
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <div className="text-danger">{error.placeToVisit}</div>
                      <div className="placeListDiv row">
                        {placeList.length !== 0 ? (
                          <div className="row ml-2">
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
                                          setPlaceList(array);
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
                      <div className="row budgetRow">
                        <div className="d-flex w-50">
                          <label
                            for="exampleInputPassword1"
                            style={{
                              marginTop: "16px",
                              marginRight: "5px",
                            }}
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
                        </div>
                        <div className="d-flex w-50">
                          <label
                            for="exampleInputPassword1"
                            style={{
                              marginTop: "16px",
                              marginRight: "5px",
                            }}
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
                        </div>
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
                    <div className="text-danger" style={{ marginTop: "-15px" }}>
                      {error.bestMonths}
                    </div>
                    <div className="monthDiv row mb-2 ">
                      {month.length !== 0 ? (
                        <div className="row ml-2 mt-0">
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
                      style={{ borderRadius: "20px" }}
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
    </>
  );
}
