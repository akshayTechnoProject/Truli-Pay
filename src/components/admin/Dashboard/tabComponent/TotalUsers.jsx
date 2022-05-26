import { CloseOutlined } from '@material-ui/icons';
import React, { useState } from 'react';

export default function TotalUsers() {
  const [filter, setFitler] = useState('0');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [month, setMonth] = useState('');
  const [user, setUser] = useState('');
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
  return (
    <>
      {/* <h3 className="ml-0">Total User</h3> */}
      <form>
        <div class="form-group row">
          <label class="mr-2" for="inputState" style={{ marginTop: '5px' }}>
            Filter :
          </label>
          <br />
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ borderRadius: '20px' }}
            onChange={(e) => {
              if (e.target.value != 'Choose the filter') {
                setFitler(e.target.value);
              } else {
                setFitler('0');
              }
            }}
          >
            <option selected>Choose the filter</option>
            <option value="1">Date wise</option>
            <option value="2">Month wise</option>
            <option value="3">Between two dates</option>
            <option value="4">User wise</option>
            {/* <option value="5">Country wise</option> */}
          </select>
        </div>
      </form>

      {filter == '1' ? (
        <div className="form-group row w-50 d-flex">
          <label for="exampleInputPassword1">Date:</label>
          <input
            type="date"
            className="form-control ml-0"
            id="date"
            placeholder="DD-MM-YYYY"
            style={{ borderRadius: '20px' }}
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              console.log('Date', e.target.value);
            }}
          />
        </div>
      ) : null}

      {filter == '2' ? (
        <div class="form-group row">
          <label class="mr-2" for="inputState" style={{ marginTop: '5px' }}>
            Filter :
          </label>
          <br />
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ borderRadius: '20px' }}
            onChange={(e) => {
              if (e.target.value != 'Choose month') {
                setMonth(e.target.value);
              } else {
                setMonth();
              }
            }}
          >
            <option selected>Choose month</option>
            {months.map((e, i) => {
              return <option>{e}</option>;
            })}
          </select>
        </div>
      ) : null}

      {filter == '3' ? (
        <>
          <div className="form-group row w-50 d-flex">
            <label for="exampleInputPassword1">Start Date:</label>
            <input
              type="date"
              className="form-control ml-0"
              id="date"
              placeholder="DD-MM-YYYY"
              style={{ borderRadius: '20px' }}
              name="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                console.log('Date', e.target.value);
              }}
            />
          </div>
          <div className="form-group row w-50 d-flex">
            <label for="exampleInputPassword1">End Date:</label>
            <input
              type="date"
              className="form-control ml-0"
              id="date"
              placeholder="DD-MM-YYYY"
              style={{ borderRadius: '20px' }}
              name="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                console.log('End Date', e.target.value);
              }}
            />
          </div>
        </>
      ) : null}

      {filter == '4' ? (
        <div className="form-group mb-4 ml-0 w-50">
          <label for="exampleInputPassword1">User id:</label>
          <input
            type="text"
            className="form-control ml-0"
            id="exampleInputPassword1"
            placeholder="Enter activities"
            style={{ borderRadius: '20px' }}
            name="activities"
            value={user}
            onChange={(e) => {
              if (e.target.value.trim().length != 0) {
                setUser(e.target.value);
                console.log('user', e.target.value);
              } else setUser('');
            }}
          />
        </div>
      ) : null}
    </>
  );
}
