import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/admin/Login/Login";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import Profile from "./components/admin/Profile/Profile";
import UserList from "./components/admin/User List/UserList";
import ForgotPass from "./components/admin/Login/ForgotPass";
import Queries from "./components/admin/queries/Queries";
import TandC from "./components/admin/CMS/T&C";
import PrivatePolicy from "./components/admin/CMS/PrivatePolicy";
import AboutUs from "./components/admin/CMS/AboutUs";
function App() {
  return (
    <Routes>
      <Route path="/travel-app-admin" exact element={<Login />} />
      <Route path="*" exact element={<Login />} />

      <Route path="/forgot-password" exact element={<ForgotPass />} />
      <Route path="/admin-profile" exact element={<Profile />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/user-list" exact element={<UserList />} />

      <Route path="/queries" exact element={<Queries />} />
      <Route path="/cms/t&c" exact element={<TandC />} />
      <Route path="/cms/privatepolicy" exact element={<PrivatePolicy />} />
      <Route path="/cms/aboutus" exact element={<AboutUs />} />
      <Route path="/" element={<Navigate to="/travel-app-admin" />} />
    </Routes>
  );
}

export default App;
