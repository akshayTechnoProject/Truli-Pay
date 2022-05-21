import React, { useEffect, useState, useMemo } from 'react';
import SelectionDropdown from '../Country Management/components/SelectionDropdown';
import SelectionDropdownMonth from '../Country Management/components/SelectionDropdownMonth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Data from '../json/countryByContinent.json';
import currencyData from '../json/countryByCurrency.json';

export default function LocationPopUp() {
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [country, setCountry] = useState();
  const [currency, setCurrency] = useState();
  const [month, setMonth] = useState([]);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [addPicture, setAddPicture] = useState(false);
  const [image, setImage] = useState('');
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: '',
    alt: '',
  });
  let [state, setState] = useState('');
  let [stateOfActivities, setStateOfActivities] = useState('');
  const [activities, setActivities] = useState([]);
  const [topDestinations, setTopDestinations] = useState([]);
  const [formData, setFormData] = useState({
    budgetFrom: '',
    budgetTo: '',
    safetyGuidelines: '',
    purpose: '',
    summary: '',
    //currency: '',
  });
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [option5, setOption5] = useState(false);

  useEffect(() => {
    Data.map((e, i) => {
      countryList.push(e.country);
    });
    setCountryList([...new Set(countryList)]);

    currencyData.map((e, i) => {
      currencyList.push(e.currency_code);
    });
    setCurrencyList([...new Set(currencyList)]);
  }, []);

  var file = '';
  const uploadPicture = async (e) => {
    e.preventDefault();
    setDisable(true);
    file = e.target.files[0];
    const storage = getStorage();
    const reference = ref(storage, `banner_${new Date().getTime()}.jpg`);

    await uploadBytes(reference, file)
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
        setAddPicture(true);
      });
    setDisable(false);
  };

  const validate = () => {
    let isValid = true;
    let input = formData;
    let error = {};
    if (!country) {
      isValid = false;
      error['countryName'] = 'Please select country name';
    }
    if (!addPicture) {
      isValid = false;
      error['img_err'] = 'Please select the image.';
    }
    if (!input['purpose'].trim()) {
      isValid = false;
      error['purpose'] = 'Please enter purpose';
    }
    if (!input['summary'].trim()) {
      isValid = false;
      error['summary'] = 'Please enter summary';
    }
    if (activities.length === 0) {
      isValid = false;
      error['activities'] = 'Please enter name of activities ';
    }
    if (topDestinations.length === 0) {
      isValid = false;
      error['placeToVisit'] = 'Please enter name of place ';
    }
    if (!currency) {
      isValid = false;
      error['currency'] = 'Please select currency';
    }
    //if (!input['budgetFrom']) {
    //isValid = false;
    //error['budget'] = 'Please enter budget';
    //}
    //if (!input['currency']) {
    //  isValid = false;
    //  error['currency'] = 'Please enter currency';
    //}
    //if (!input['budgetTo']) {
    //isValid = false;
    //error['budget'] = 'Please enter budget';
    //}
    //if (Number(input['budgetFrom']) >= Number(input['budgetTo']) + 100) {
    //isValid = false;
    //error['budgetInvalid'] =
    //"Maximum value can't be less then minimum (Ex. : from:4000 To: 4100)";
    //}
    if (!input['budgetFrom']) {
      isValid = false;
      error['budget'] = 'Please enter budget';
    } else if (!input['budgetTo']) {
      isValid = false;
      error['budget'] = 'Please enter budget';
    } else if (formData.budgetFrom <= 0) {
      isValid = false;
      error['budget'] = 'Amount should be positive';
    } else if (formData.budgetTo <= 0) {
      isValid = false;
      error['budget'] = 'Amount should be positive';
    } else if (formData.budgetFrom >= formData.budgetTo) {
      isValid = false;
      error['budgetInvalid'] =
        "Maximum value can't be less then minimum (Ex. : from:4000 To: 4100)";
    }
    if (!input['safetyGuidelines'].trim()) {
      isValid = false;
      error['safetyGuidelines'] = 'Please enter guidelines';
    }
    if (month.length === 0) {
      isValid = false;
      error['bestMonths'] = 'Please enter months';
    }
    if (
      option1 == false &&
      option2 == false &&
      option3 == false &&
      option4 == false &&
      option5 == false
    ) {
      isValid = false;
      error['multiChoice'] = 'Please select any one';
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
        //await addDoc(collection(db, ''), tempData);
      } catch (e) {
        console.warn(e);
      }
    };

    if (validate()) {
      var tempData = {
        country: country,
        topDestinations: topDestinations,
        budgetFrom: formData.budgetFrom,
        budgetTo: formData.budgetTo,
        safetyGuidelines: formData.safetyGuidelines,
        bestMonths: month,
        image: image,
        category: {
          Sunny: option1,
          Cloudy: option2,
          Rainy: option3,
          Windy: option4,
          Snowy: option5,
        },
      };

      uploadDataList(tempData).then(() => {
        // navigate("/country-management");
        setShowImg({
          src: '',
          alt: '',
        });
        setFormData({
          description: '',
          budgetFrom: '',
          budgetTo: '',
          safetyGuidelines: '',
        });
        setMonth([]);
        setTopDestinations([]);
        setDisable(false);
      });
    } else {
      setDisable(false);
    }
  };
  return (
    <>
      <button
        className="btn btn-primary "
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
        style={{ borderRadius: '20px' }}
      >
        Add Location
      </button>

      <div
        className="collapse mt-2"
        id="collapseExample"
        style={{ borderRadius: '20px' }}
      >
        <div className="card card-body " style={{ borderRadius: '20px' }}>
          <div className="px-5 w-75 ">
            <div className="d-flex justify-content-between">
              <div className="page-header"> Add Location </div>
            </div>
            <div>
              <div>
                <form className="CountryForm" autocomplete="off">
                  {/* best month */}
                  <div className="mb-4">
                    <SelectionDropdownMonth
                      list={months}
                      setState={(e) => {
                        if (e) {
                          if (e != 'Select Month') {
                            setMonth([...new Set([...month, e])]);
                          }
                        }
                      }}
                      label=" Best Months to Visit:"
                      firstOption="Select Month"
                    />
                    <div className="text-danger" style={{ marginTop: '-15px' }}>
                      {error.bestMonths}
                    </div>

                    <div className="monthDiv row mb-4">
                      {month.length !== 0 ? (
                        <div className="row ml-2 mt-0">
                          {month.map((subItems, i) => {
                            return (
                              <button
                                className="btn btn-primary m-4 mt-0 placeButton"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {subItems}{' '}
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
                  </div>

                  {/* Weather */}
                  <div className="form-group mb-4">
                    <label for="exampleInputPassword1">Select Weather:</label>
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
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          className="form-check-label mb-2 checkBox"
                          for="inlineCheckbox1"
                        >
                          Sunny
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
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          className="form-check-label mb-2 checkBox"
                          for="inlineCheckbox2"
                        >
                          Cloudy
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
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          className="form-check-label mb-2 checkBox"
                          for="inlineCheckbox3"
                        >
                          Rainy
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
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          className="form-check-label mb-2 checkBox"
                          for="inlineCheckbox4"
                        >
                          Windy
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
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          className="form-check-label mb-2 checkBox"
                          for="inlineCheckbox5"
                        >
                          Snowy
                        </label>
                      </div>
                    </div>
                    <div className="text-danger">{error.multiChoice}</div>
                  </div>

                  {/* budget */}
                  <div className="form-group mb-4">
                    <label for="exampleInputPassword1">
                      Budget Range Per Person:
                    </label>
                    <div className="row budgetRow">
                      <div className="d-flex w-50">
                        <label
                          for="exampleInputPassword1"
                          style={{
                            marginTop: '16px',
                            marginRight: '5px',
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
                            marginTop: '16px',
                            marginRight: '5px',
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

                  {/* activities */}
                  <div className="form-group mb-4">
                    <label for="exampleInputPassword1">Activities:</label>
                    <div className="d-flex align-item-center">
                      <input
                        type="text"
                        className="form-control ml-0"
                        id="exampleInputPassword1"
                        placeholder="Enter activities"
                        name="activities"
                        value={stateOfActivities}
                        onChange={(e) => {
                          if (e.target.value.trim().length != 0)
                            setStateOfActivities(e.target.value);
                          else setStateOfActivities('');
                        }}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        style={{
                          borderRadius: '20px',
                          height: '30px',
                          marginTop: '14px',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (stateOfActivities)
                            setActivities([
                              ...new Set([...activities, stateOfActivities]),
                            ]);
                          setStateOfActivities('');
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="text-danger">{error.activities}</div>
                    <div className="topDestinationsDiv row">
                      {activities.length !== 0 ? (
                        <div className="row ml-2">
                          {activities.map((subItems, i) => {
                            return (
                              <button
                                className="btn btn-primary m-4 placeButton"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {subItems}
                                <span className="placeDeleteIcon">
                                  <i
                                    className="fa fa-trash placeDeleteIcon"
                                    onClick={(e1) => {
                                      e1.preventDefault();
                                      let array = activities;
                                      let index = i;

                                      if (index !== -1) {
                                        array.splice(index, 1);
                                        setActivities(array);
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

                  {/* purpose of trip */}
                  <div className="form-group mb-4">
                    <label for="exampleFormControlTextarea1">
                      Purpose of the trip:
                    </label>
                    <textarea
                      className="form-control textArea"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="purpose"
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          purpose: e.target.value,
                        })
                      }
                    ></textarea>
                    <div className="text-danger">{error.purpose}</div>
                  </div>

                  {/* country */}
                  <div style={{ marginBottom: '35px' }}>
                    <SelectionDropdown
                      list={countryList}
                      setState={(e) => {
                        if (e != 'Select Country') {
                          setCountry(e);
                        } else {
                          setCountry('');
                        }
                      }}
                      label="Country Name:"
                      firstOption="Select Country"
                    />
                    <div className="text-danger" style={{ marginTop: '-25px' }}>
                      {error.countryName}
                    </div>
                  </div>

                  {/* image */}
                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label for="exampleFormControlFile1">Image:</label>
                    <input
                      type="file"
                      className="form-control-file imgInput"
                      id="exampleFormControlFile1"
                      onChange={uploadPicture}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="text-danger">{error.img_err}</div>
                    {showImg.src != '' ? (
                      <img
                        src={showImg.src}
                        className="form-img__img-preview"
                        style={{ width: '84px', height: '84px' }}
                        alt={showImg.alt}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {/* summary of the destination */}
                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label for="exampleFormControlTextarea1">
                      Summary of the destination:
                    </label>
                    <textarea
                      className="form-control textArea"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="summary"
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          summary: e.target.value,
                        })
                      }
                    ></textarea>
                    <div className="text-danger">{error.summary}</div>
                  </div>

                  {/* Top Destinations to visit */}
                  <div className="form-group mb-3">
                    <label for="exampleInputPassword1">
                      Top Destinations to visit:
                    </label>
                    <div className="d-flex align-item-center">
                      <input
                        type="text"
                        className="form-control ml-0"
                        id="exampleInputPassword1"
                        placeholder="Enter destinations"
                        name="placeToVisit"
                        value={state}
                        onChange={(e) => {
                          if (e.target.value.trim().length != 0)
                            setState(e.target.value);
                          else setState('');
                        }}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        style={{
                          borderRadius: '20px',
                          height: '30px',
                          marginTop: '14px',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (state)
                            setTopDestinations([
                              ...new Set([...topDestinations, state]),
                            ]);
                          setState('');
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="text-danger">{error.placeToVisit}</div>
                    <div className="topDestinationsDiv row">
                      {topDestinations.length !== 0 ? (
                        <div className="row ml-2">
                          {topDestinations.map((subItems, i) => {
                            return (
                              <button
                                className="btn btn-primary m-4 placeButton"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {subItems}
                                <span className="placeDeleteIcon">
                                  <i
                                    className="fa fa-trash placeDeleteIcon"
                                    onClick={(e1) => {
                                      e1.preventDefault();
                                      let array = topDestinations;
                                      let index = i;

                                      if (index !== -1) {
                                        array.splice(index, 1);
                                        setTopDestinations(array);
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

                  {/* <div className="form-group mb-4">
                          <label for="exampleFormControl">Currency:</label>
                          <input
                            className="form-control ml-0"
                            id="exampleFormControl"
                            placeholder="Currency"
                            name="currency"
                            value={formData.currency}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                currency: e.target.value,
                              })
                            }
                          ></input>
                          <div className="text-danger">{error.currency}</div>
                        </div> */}

                  {/* Currency */}
                  <div style={{ marginBottom: '35px' }}>
                    <SelectionDropdown
                      list={currencyList}
                      setState={(e) => {
                        if (e != 'Select Currency') {
                          setCurrency(e);
                        } else {
                          setCurrency('');
                        }
                      }}
                      label="Currency:"
                      firstOption="Select Currency"
                    />
                    <div className="text-danger" style={{ marginTop: '-25px' }}>
                      {error.currency}
                    </div>
                  </div>

                  {/* Safety Status */}
                  <div className="form-group mb-4">
                    <label for="exampleFormControlTextarea1">
                      Safety Status:
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

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={disable}
                    style={{ borderRadius: '20px' }}
                    onClick={(e) => {
                      submitHandler(e);
                      if (validate());
                    }}
                  >
                    {disable ? 'Processing...' : 'Upload'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
