import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectionDropdown from "./components/SelectionDropdown";
import SelectionDropdownMonth from "./components/SelectionDropdownMonth";
export default function PopUp() {
  return (
    <>
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
    </>
  );
}
