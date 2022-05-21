import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Data from "../json/countryByContinent.json";
import { db } from "../firebase/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import CheckBox from "./components/CheckBox";
export default function PopUpEdit(props) {
  console.log(props.edit);
  var continentList = [];
  const [countinentList, setCountinentList] = useState([]);
  const [continent, setContinent] = useState(props.edit.continent);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(props.edit.country);
  const [month, setMonth] = useState(props.edit.bestMonths);
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
  const [addPicture, setAddPicture] = useState(true);
  const [image, setImage] = useState(props.edit.image);
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: "",
    alt: "",
  });

  let [state, setState] = useState("");
  const [placeList, setPlaceList] = useState(props.edit.placeToVisit);
  const [formData, setFormData] = useState({
    description: props.edit.description,
    budgetFrom: props.edit.budgetFrom,
    budgetTo: props.edit.budgetTo,
    safetyGuidelines: props.edit.safetyGuidelines,
  });
  const [option1, setOption1] = useState(props.edit.category.Mountains);
  const [option2, setOption2] = useState(props.edit.category["Sea Side"]);
  const [option3, setOption3] = useState(props.edit.category.Adventures);
  const [option4, setOption4] = useState(props.edit.category.Desert);
  const [option5, setOption5] = useState(props.edit.category.Romantic);
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
      error["budget"] = "Please enter Minimum budget";
    } else if (!input["budgetTo"]) {
      isValid = false;
      error["budget"] = "Please enter maximum budget";
    } else if (Number(formData.budgetFrom <= 0)) {
      isValid = false;
      error["budget"] = "Amount should be positive";
    } else if (Number(formData.budgetTo) <= 0) {
      isValid = false;
      error["budget"] = "Amount should be positive";
    } else if (Number(formData.budgetFrom) >= Number(formData.budgetTo)) {
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
    //return isValid;
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
        const docRef = doc(db, "cities", props.edit.id);

        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRef, tempData);
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
      <div>
        {props.state ? (
          <div className="card card-body " style={{ borderRadius: "20px" }}>
            <div className="px-5 w-75 ">
              <br />

              <div className="d-flex justify-content-between">
                <div className="page-header"> Edit country </div>

                {/* <button
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
                    props.setState(false);
                  }}
                >
                  &times;
                </button> */}
              </div>
              <div>
                <div>
                  <form className="CountryForm">
                    <SelectionDropdown
                      list={countinentList}
                      setState={handleContinent}
                      state={continent}
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
                            if (e != "Select Country") {
                              setCountry(e);
                            } else {
                              setCountry("");
                            }
                          }}
                          label="Country Name:"
                          firstOption="Select Country"
                          state={country}
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
                      <CheckBox
                        onChange={(e) => setOption1(e)}
                        name="Mountains"
                        initialState={option1}
                      />
                      <CheckBox
                        onChange={(e) => setOption2(e)}
                        name="Sea Side"
                        initialState={option2}
                      />
                      <CheckBox
                        onChange={(e) => setOption3(e)}
                        name="Adventures"
                        initialState={option3}
                      />
                      <CheckBox
                        onChange={(e) => setOption4(e)}
                        name="Desert"
                        initialState={option4}
                      />
                      <CheckBox
                        onChange={(e) => setOption5(e)}
                        name="Romantic"
                        initialState={option5}
                      />

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
                      {image != "" ? (
                        <img
                          src={image}
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
                      <div className="row">
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
                            accept="image/png, image/gif, image/jpeg"
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
                    <div className="placeListDiv row mb-2">
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
                        if (validate()) props.setState(false);
                      }}
                    >
                      {disable ? "Processing..." : "Upload"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
