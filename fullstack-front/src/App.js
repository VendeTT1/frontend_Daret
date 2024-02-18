import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import HomeUser from "./users/HomeUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import EditDaret from "./tontine/EditDaret";
import AnotherPage from "./tontine/AnotherPage";
import HomeDaret from "./tontine/HomeDaret";
import ViewDaret from "./tontine/ViewDaret";
//import Periodicite from "./tontine/Periodicite";
import Periodicite from "./admin/Periodicite_admin";
import Role from "./tontine/Role";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import HomeDaret_Admin from "./admin/HomeDaret_Admin";
import ViewDaret_admin from "./admin/ViewDaret_admin";
import Participer from "./tontine/participer/Participer";
import Role_admin from "./admin/Role_admin";
import Test from "./test/test2";
import Modal from "./tontine/modal";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/admin_daret" element={<HomeDaret_Admin />} />
          {/* <Route exact path="/register" element={<SignUp/>} /> */}
          <Route exact path="/" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} /> 
          <Route exact path="/home_users" element={<HomeUser />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/home_daret" element={<HomeDaret />} />
          {/*<Route exact path="/page" element={<AnotherPage/>} />*/}
          <Route exact path="/daret_edit/:id" element={<EditDaret />} />
          <Route exact path="/daret_view/:id" element={<ViewDaret />} />
          <Route exact path="/daret_role" element={<Role />} />
          <Route exact path="/daret_view_admin/:id" element={<ViewDaret_admin />} />
          {/* <Route exact path="/daret_role_admin" element={<Role_admin />} /> */}
          <Route exact path="/participer/:id" element={<Participer />} />
          <Route exact path="/test2" element={<Test/>} />
          {/* <Route exact path="/period" element={<Periodicite/>} /> */}
          <Route exact path="/modal/:id" element={<Modal/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
