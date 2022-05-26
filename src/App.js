import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/admin/Login/Login';
import Dashboard from './components/admin/Dashboard/Dashboard';
import Profile from './components/admin/Profile/Profile';
import UserList from './components/admin/User List/UserList';
import ForgotPass from './components/admin/Login/ForgotPass';
import UserState from './components/admin/UserState/UserState';
import LocationManagement from './components/admin/Location Management/LocationManagement';
import CountryManagement from './components/admin/Country Management/CountryManagement';
import Inquiries from './components/admin/Inquiries/Inquiries';
import Feedback from './components/admin/Feedback/Feedback';
function App() {
  return (
    <Routes>
      <Route path="/travel-app-admin" exact element={<Login />} />
      <Route path="*" exact element={<Login />} />

      <Route path="/forgot-password" exact element={<ForgotPass />} />
      <Route path="/admin-profile" exact element={<Profile />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/user-list" exact element={<UserList />} />
      <Route path="/user-state" exact element={<UserState />} />
      <Route
        path="/location-management"
        exact
        element={<LocationManagement />}
      />
      <Route path="/country-management" exact element={<CountryManagement />} />
      <Route path="/inquiries" exact element={<Inquiries />} />
      <Route path="/feedback" exact element={<Feedback />} />
      <Route path="/" element={<Navigate to="/travel-app-admin" />} />
    </Routes>
  );
}

export default App;
