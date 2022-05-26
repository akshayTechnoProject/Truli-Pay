import React from 'react';
import TotalBank from './tabComponent/TotalBank';
import TotalCompleted from './tabComponent/TotalCompleted';
import TotalInProcess from './tabComponent/TotalInProcess';
import TotalTransactions from './tabComponent/TotalTransactions';
import TotalUsers from './tabComponent/TotalUsers';
import TotalWallet from './tabComponent/TotalWallet';

export default function Analytics() {
  return (
    <>
      <br />
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '20px',
        }}
      >
        <ul className="nav nav-tabs Tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="TotalUsers-tab"
              data-toggle="tab"
              href="#TotalUsers"
              role="tab"
              aria-controls="TotalUsers"
              aria-selected="true"
            >
              Total Users
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="TotalTransactions-tab"
              data-toggle="tab"
              href="#TotalTransactions"
              role="tab"
              aria-controls="TotalTransactions"
              aria-selected="false"
            >
              Total Transactions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="TotalWallet-tab"
              data-toggle="tab"
              href="#TotalWallet"
              role="tab"
              aria-controls="TotalWallet"
              aria-selected="false"
            >
              Total Wallet Transactions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="TotalBank-tab"
              data-toggle="tab"
              href="#TotalBank"
              role="tab"
              aria-controls="TotalBank"
              aria-selected="false"
            >
              Total Bank Transfer Transactions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="TotalCompleted-tab"
              data-toggle="tab"
              href="#TotalCompleted"
              role="tab"
              aria-controls="TotalCompleted"
              aria-selected="false"
            >
              Total Completed Transaction
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="TotalInProcess-tab"
              data-toggle="tab"
              href="#TotalInProcess"
              role="tab"
              aria-controls="TotalInProcess"
              aria-selected="false"
            >
              Total in process transactions
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane active"
            id="TotalUsers"
            role="tabpanel"
            aria-labelledby="TotalUsers-tab"
          >
            <TotalUsers />
          </div>
          <div
            className="tab-pane"
            id="TotalTransactions"
            role="tabpanel"
            aria-labelledby="TotalTransactions-tab"
          >
            <TotalTransactions />
          </div>
          <div
            className="tab-pane"
            id="TotalWallet"
            role="tabpanel"
            aria-labelledby="TotalWallet-tab"
          >
            <TotalWallet />
          </div>
          <div
            className="tab-pane"
            id="TotalBank"
            role="tabpanel"
            aria-labelledby="TotalBank-tab"
          >
            <TotalBank />
          </div>
          <div
            className="tab-pane"
            id="TotalCompleted"
            role="tabpanel"
            aria-labelledby="TotalCompleted-tab"
          >
            <TotalCompleted />
          </div>
          <div
            className="tab-pane"
            id="TotalInProcess"
            role="tabpanel"
            aria-labelledby="TotalInProcess-tab"
          >
            <TotalInProcess />
          </div>
        </div>
      </div>
    </>
  );
}
