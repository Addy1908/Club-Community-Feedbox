import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./PendingApprovals.css";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-bootstrap/Modal";
import "./ClubMember.css";

const ClubMember = ({ props }) => {
  const [searchval, setSearchVal] = useState("");
  const [clubMember, setClubMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState();
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
 
  
  const handleClose = () => {
    setShow(false);
    setConfirm(false);
  };

  const handleShow = () => {
    setShow(true);
  }

  const getUser = async () => {
    const result = await fetch(`http://localhost:8000/get`);
    const res = await result.json();
    let cm = [];
    res &&
      res.map((data) => {
        if (data.role == "Club_Member") {
          cm.push(data);
        }
      });
    let clgSel = [];
    if (props.clg) {
      if (props.clg == "All") {
        setData(cm.reverse())
        setClubMember(cm.reverse());
      } else {
        cm.map(data => {
          if (data.collegeName === props.clg) {
            clgSel.push(data)
          }
        })
        setData(clgSel.reverse())
        setClubMember(clgSel.reverse());
      }
    } else {
      setClubMember(cm.reverse());
      setData(cm.reverse());
    }
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [props, loading]);

  // search user
  const searchHandler = (e) => {
    let val = e.target.value;
    setSearchVal(e.target.value);
    if (e.target.value !== "") {
      let matched = [];
      data.length > 0 &&
        data.forEach((user) => {
          const value = user.name.toLowerCase().includes(val.toLowerCase());
          if (value) {
            matched.push(user);
          }
        });
      setClubMember(matched);
    } else {
      setClubMember(data);
    }
  };

  // submit handler for making club member as lead
  const submitHandler = async () => {
    setLoading(true);
    // console.log(id);
    const data = await fetch(`http://localhost:8000/updateDetail/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Lead", position: position}),
    });
    const res = await data.json();
    // console.log(res);

   //  notification
  await fetch("http://localhost:8000/addNotifications", {
    method: "post",
    body: JSON.stringify({
      message:`Congrats! Now, You are ${value}`,
      messageScope:"private",
      userId:id, 
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  }).then((res)=>{
    // alert(res.json)
  });


    // Generate Notification
    
    setConfirm(false);
    setShow(false);
    setLoading(false);

  };

  return (
    <div>
      {/* search */}
      <div className="pending-approval-search">
        <div class="relative text-lg bg-transparent text-gray-800">
          <div class="flex items-center border-b-2 border-[#6F6F6F] py-2 mt-3">
            <input
              class="bg-transparent w-full  border-none mr-10 px-2 text-[1rem] font-[400] leading-tight focus:outline-none"
              type="text"
              value={searchval}
              onChange={searchHandler}
              placeholder="Search Member..."
            />
            <button type="submit" class="absolute right-0 top-2 mr-4 ">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {/* table  */}
      <div className="lg:border">
        <Scrollbars style={{ height: "230px" }}>
          <table class="table-auto w-full max-w-[1300px]">
            <tbody class="text-sm divide-y divide-gray-100 max-w-[1150px]">
              {clubMember.length > 0
                ? clubMember.map((member) => (
                  <tr className="flex justify-between max-w-[1150px]">
                    <td class="p-2 w-[200px] lg:w-[300px]">
                      <div className="flex items-center">
                        <img
                          class="rounded-full"
                          src={member.img}
                          width="40"
                          height="40"
                          alt="Alex Shatov"
                        />

                        <div className="ml-2 text-[1rem] font-[400]"> {member.name} </div>
                      </div>
                    </td>
                    <td class="p-2 lg:flex items-center hidden md:block">
                      <div class="font-medium text-gray-800 text-[1rem] font-[400]">
                        {member.branch}
                      </div>
                    </td>
                    <td class="pt-2 pb-2 flex justify-end">
                      <div className="flex items-center font-medium lg:gap-3 justify-start mr-6 md:mr-6 lg:mr-6 2xl:-mr-4  w-fit">
                        <button className="h-[25px] py-3 flex items-center px-3 rounded-xl text-white bg-[#00D22E] hover:bg-[#03821f]">
                          {loading ? (
                            <div
                              class="spinner-border text-white"
                              role="status"
                              style={{
                                height: "15px",
                                width: "15px",
                                marginLeft: "2px",
                              }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div
                              className="text-[1.05rem] font-[500]"
                              onClick={() => {
                                setId(member._id);
                                setName(member.name)
                                handleShow();
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faUser}
                                className="mr-2"
                              />
                              Make Lead/ Make Admin
                            </div>
                          )}
                        </button>
                      </div>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        className="club-member-modal"
                      >
                        <form>
                          <Modal.Header
                            closeButton
                            className="club-member-modal-header"
                          >
                            Select Role of a Club Member !
                          </Modal.Header>

                          <Modal.Body>
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                              <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>You want to make {name} as Lead/Admin ? </div>
                              <div style={{ display: "flex", gap: "18px" }}>
                                <div>
                                  <select
                                    // value={value}
                                    name="val"
                                    onChange={(e) => {
                                      setValue(e.target.value)
                                    }
                                    }
                                    className="p-2 border-2 font-semibold text-[#3174AD] text-[1rem] font-[400] border-[#3174AD] rounded-3xl w-[110%]">
                                    <option value="Select Role" hidden selected disabled >
                                      Select Role
                                    </option>
                                    <option value="Lead" > Lead</option>
                                    <option value="Admin" >Admin</option>
                                  </select>
                                </div>
                                {value === "" ? "" : <div className="selected-val">{name} has been selected as a {value}</div>}
                              </div>
                            </div>
                          </Modal.Body>

                          <Modal.Footer className="modal-footer club-member-modal-footer">
                            <div className="modal-footer-club-member-yes-no-div">
                              <div onClick={() => setConfirm(!confirm)}>
                                Yes
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShow(false);
                                  setConfirm(false);
                                }}
                              >
                                No
                              </button>
                            </div>
                            {confirm ? (
                              <form className="club-member-modal-confirm">
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Specify Position"
                                    required
                                    onChange={(e) =>
                                      setPosition(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      submitHandler();
                                    }}
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </form>
                            ) : (
                              ""
                            )}
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </td>
                  </tr>
                ))
                :
                <div className="nopending">
                  <div className="text-[1rem] font-[400]">No Club Members !!</div>
                </div>
              }
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
};

export default ClubMember;