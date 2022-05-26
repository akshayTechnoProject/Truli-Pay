import React, { useState } from 'react';

export default function TotalUsers() {
  const [filter, setFitler] = useState('0');
  return (
    <>
      <form>
        <div class="form-group row">
          <label
            class="mr-2"
            for="inputState"
            style={{ fontSize: '16px', fontWeight: '600', marginTop: '5px' }}
          >
            Filter :
          </label>
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
            <option value="3">between two dates</option>
            <option value="3">User wise</option>
            <option value="3">Country wise</option>
          </select>
        </div>
      </form>
    </>
  );
}
