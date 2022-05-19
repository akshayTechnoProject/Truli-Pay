import React, { useEffect, useState, useMemo } from 'react';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import PopUp from './LocationPopUp';
import { TableHeader, Pagination, Search } from '../Table';
import { Dropdown, Table } from 'react-bootstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  deleteDoc,
  doc,
  query,
  setDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function LocationManagement() {
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
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [limit, setlimit] = useState(10);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({});
  const [addPicture, setAddPicture] = useState(false);
  const [image, setImage] = useState('');
  const [state, setState] = useState('');
  const [change, setchange] = useState(false);
  const [showImg, setShowImg] = useState({
    src: '',
    alt: '',
  });

  useEffect(() => {
    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

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
              Location Management
            </li>
          </ol>
          <h1 className="page-header">Location Management</h1>

          <div className="popup">
            <button
              className="btn btn-outline-success"
              style={{
                borderRadius: '20px',
              }}
              onClick={() => {
                setState(!state);
              }}
            >
              Add Location
            </button>
            <PopUp state={state} setState={(e) => setState(e)} />
          </div>
        </div>
      </div>
    </>
  );
}
