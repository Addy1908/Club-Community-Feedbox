import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/signup/Register";
import Home from "./component/landing_page/Home";
import Main from "./component/Main/Main";
import Rescources from "./component/Rescources/Rescources";
import RescourcesTable from "./component/Rescources/RescourcesTable";
import Faq from "./component/Faq";
import Approvals from "./component/approvals/Approvals";
import ProfilePage from "./component/Profile/ProfilePage";
import NewLogin from "./component/login/NewLogin";
import AttendanceSheet from "./component/Calendar/AttendanceSheet";
import ReactBigCalendar from "./component/Calendar/ReactBigCalendar";
import PostBigModel from "./component/Main/PostBigModel";
import Error from "./component/Error";
import Loader from "./component/Loader";
import Dashboard from "./component/Dashboard/Dashboard";
import MobileNotification from "./component/navbar/MobileNotification";
import NavbarRes from "./component/navbar/NavbarRes";
import Login from "./component/login/Login";
import Modal from "react-bootstrap/Modal";

const App = () => {
  const [currUser, setCurrUser] = useState();
  const [returned, setReturned] = useState(false);
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user && user.role;

  const handleClose = () => {
    setShow(false)
  }

  const handleLogout = () => {
    localStorage.setItem("user", null);
      localStorage.setItem("jwt", null);
      window.location.href = "/"
  }

  const handleClick = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    if (result.role != role) {
      setShow(true);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  return (
    <div className="App">
      <Modal show={show} onHide={handleClose} className="club-member-modal" >
        <form>
          <Modal.Header
            closeButton
            className="club-member-modal-header"
          >
            Your position is changed, Please Login In Again !
          </Modal.Header>
          <Modal.Footer className="modal-footer club-member-modal-footer">
            <div className="modal-footer-club-member-yes-no-div">
              <div onClick={handleLogout}>
                OK
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index path="/login" element={<NewLogin />} />
          <Route index path="/super_admin_login" element={<Login />} />
          <Route index path="/register" element={<Register />} />
          <Route
            index
            path="/main"
            element={
              role == null ? <Error /> : [<NavbarRes />, <Main />]
            }
          />

          <Route
            index
            path="/comment/:id"
            element={role == null ? <Error /> : <PostBigModel />}
          />

          <Route
            index
            path="/calendar"
            element={
              role === null ? (
                <Error />
              ) : (
                [<NavbarRes />, <ReactBigCalendar />]
              )
            }
          />

          <Route
            index
            path="/rescources"
            element={
              role == null ? <Error /> : [<NavbarRes />, <Rescources />]
            }
          />

          <Route
            index
            path="/profile"
            element={
              role == null ? <Error /> : [<NavbarRes />, <ProfilePage />]
            }
          />

          <Route index path="/profileComment" element={<PostBigModel />} />

          <Route
            index
            path="/rescourcesDisplay"
            element={
              role == null ? (
                <Error />
              ) : (
                [<NavbarRes />, <RescourcesTable />]
              )
            }
          />

          <Route
            index
            path="/faq"
            element={
              role == null ? <Error /> : [<NavbarRes />, <Faq />]
            }
          />

          <Route
            index
            path="/approvals"
            element={
              (role === null) || (role === "Club_Member") ? (
                <Error />
              ) : (
                [<NavbarRes />, <Approvals />]
              )
            }
          />

          <Route index path="/load" element={<Loader />} />
          <Route index path="*" element={<Error />} />

          <Route
            index
            path="/attendance/:name"
            element={
              (role == null) || (role == "Club_Member") ? (
                <Error />
              ) : (
                [<NavbarRes />, <AttendanceSheet />]
              )
            }
          />

          <Route
            index
            path="/notification"
            element={role == null ? <Error /> : <MobileNotification />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
