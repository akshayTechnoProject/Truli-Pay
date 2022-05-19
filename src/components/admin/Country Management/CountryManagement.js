import React, { useEffect, useState, useMemo } from 'react';
import Loader from '../include/Loader';
import Menu from '../include/Menu';
import { TableHeader, Pagination, Search } from '../Table';
import { Dropdown, Table } from 'react-bootstrap';
import {
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import PopUp from './PopUp';
import PopUpEdit from './PopUpEdit';
export default function CountryManagement() {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [limit, setlimit] = useState(10);
  const [edit, setEdit] = useState();
  const Header = [
    {
      name: 'Sr. NO.',
      field: 'sr_no',
      sortable: false,
    },
    {
      name: 'Image',
      field: 'image',
      sortable: false,
    },
    {
      name: 'Continent',
      field: 'continent',
      sortable: false,
    },
    {
      name: 'Country',
      field: 'country',
      sortable: false,
    },
    {
      name: 'Range (₹)',
      sortable: false,
    },

    {
      name: 'Edit',
      sortable: false,
    },
    {
      name: 'Delete',
      sortable: false,
    },
  ];
  const getData = () => {
    const q = query(collection(db, 'cities'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      let i = 1;

      querySnapshot.forEach((doc) => {
        cities.push({ ...doc.data(), sr_no: i, id: doc.id });
        i++;
      });
      setListData(cities);
    });
    return () => {
      unsubscribe();
    };
  };
  useEffect(() => {
    getData();

    document.getElementById('page-loader').style.display = 'none';

    var element = document.getElementById('page-container');
    element.classList.add('show');
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = listData;

    if (search) {
      computedComments = computedComments.filter(
        (customers) =>
          customers.country.toLowerCase().includes(search.toLowerCase()) ||
          customers.continent.toLowerCase().includes(search.toLowerCase()) ||
          customers.budgetFrom.toLowerCase().includes(search.toLowerCase()) ||
          customers.budgetTo.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
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
              Add Country
            </button>
            <PopUp state={state} setState={(e) => setState(e)} />
          </div>
          <div>
            {state1 ? (
              <PopUpEdit
                edit={edit}
                state={state1}
                setState={(e) => setState1(e)}
              />
            ) : null}
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '20px',
              marginTop: '10px',
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
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: '300',
                        paddingTop: '0px',
                        paddingBottom: '0px',
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
                            cursor: 'auto',
                            backgroundColor: 'white',
                            borderColor: '#d5dbe0',
                            paddingBottom: '3px',
                            paddingTop: '3px',
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
                              <td>{e.sr_no}</td>
                              <td>
                                <img
                                  src={e.image}
                                  width="70px"
                                  height="60px"
                                  alt="banner"
                                />
                              </td>
                              <td>{e.continent}</td>
                              <td>{e.country}</td>

                              <td>{`${e.budgetFrom} - ${e.budgetTo}`}</td>
                              <td>
                                <i
                                  className="fa fa-eye edit"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    console.log(e);
                                    setState1(true);
                                    setEdit(e);
                                  }}
                                ></i>
                              </td>
                              <td>
                                <i
                                  className="fa fa-trash delete"
                                  style={{ cursor: 'pointer' }}
                                  onClick={async () => {
                                    if (
                                      window.confirm(
                                        'Do you want to delete? '
                                      ) == true
                                    ) {
                                      await deleteDoc(doc(db, 'cities', e.id));
                                    } else {
                                    }
                                  }}
                                ></i>
                              </td>
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
                    overflowX: 'auto',
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
