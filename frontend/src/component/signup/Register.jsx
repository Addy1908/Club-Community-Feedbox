import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Modal from "react-bootstrap/Modal";
import "./Register.css";

const Register = () => {
  const [next, setNext] = useState(false);
  const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [userinfo, setUserInfo] = useState({
    skill: [],
    response: [],
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [collegeYear, setCollegeYear] = useState();
  const [collegeName, setCollegeName] = useState("");
  const [userSkills, setUserSkills] = useState();
  const [branch, setBranch] = useState();
  const [bio, setBio] = useState();
  const [role, setRole] = useState();
  const [coins, setCoins] = useState();
  const [position, setPosition] = useState();
  const [events, setEvents] = useState([]);
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    console.log(auth)
    if (auth) {
      navigate("/login");
    }
  });

  const collectData = async (e) => {
    e.preventDefault();
    // console.log(
    //   name,
    //   email,
    //   password,
    //   collegeYear,
    //   branch,
    //   collegeName,
  
    //   bio
    // );
    let result = await fetch("http://localhost:8000/register", {
      method: "post", // post method because we want to save the data
      body: JSON.stringify({
        name,
        email,
        password,
        collegeYear,
        branch,
        collegeName,
       skills:userinfo.response,
        bio,
        img,
        role,
        coins,
        position,
        events
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
     console.log(result)
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/login");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changenext = (e) => {
    e.preventDefault();
    setNext(!next);
  };

  let onSelectNames = (skills) => {
    setSkills(skills);
  };

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { skill } = userinfo;

    console.log(`${value} is ${checked}`);
    setUserSkills(e.target.value)

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        skill: [...skill, value],
        response: [...skill, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        skill: skill.filter((e) => e !== value),
        response: skill.filter((e) => e !== value),
      });
    }
    // setFile((arr) => [...arr, URL.createObjectURL(e.target.files[i])]);

    setSkills((arr) => [...userinfo.response, skills]);
    
  };

  return (
    <div className="overflow-hidden">
      kmlkm lkm l <br /> bnijbc ikj
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
              <p className="text-gray-400">
                Have an account?{" "}
                <a
                  href="/login"
                  className="text-sm text-purple-700 hover:text-purple-700"
                  
                >
                  Sign In
                </a>
              </p>
            </div>
            <div>
              <form>
                <div className={next ? "block" : "hidden"}>
                  <div className="space-y-6">
                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        placeholder="Branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                      />
                    </div>

                    <div className="">
                      <select
                        required
                        className="  w-full text-sm  px-4 py-3  bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none "
                        value={collegeYear}
                        onChange={(e) => setCollegeYear(e.target.value)}
                      >
                        <option
                          value=" "
                          disabled
                          selected
                          hidden
                          className="text-gray-400"
                        >
                          Year
                        </option>
                        <option
                          // className="w-full text-sm h-[50px]  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                          value="1"
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                        >
                          I Year
                        </option>
                        <option
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="2"
                        >
                          II Year
                        </option>
                        <option
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="3"
                        >
                          III Year
                        </option>
                        <option
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="4"
                        >
                          IV Year
                        </option>
                      </select>
                    </div>

                    <div className="">
                      <textarea
                        name="response"
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        value={userinfo.response}
                        placeholder="Add skills "
                        id="floatingTextarea2"
                        // value={userSkills}
                       
                        onChange={handleChange}
                        onClick={handleShow}
                      ></textarea>

                      <Modal show={show} onHide={handleClose} className="">
                        <form>
                          <Modal.Header
                            closeButton
                            className="flex flex-wrap text-[1.2rem] font-[700] "
                          >
                            <div className="w-[85%] ">
                              Please select skills in which you are interested!
                            </div>
                          </Modal.Header>
                          <Modal.Footer className="flex flex-col justify-start items-start text-[1.2rem] font-[500]">
                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="web"
                                value="Web Development"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Web Development")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="web">
                                {" "}
                                Web Development{" "}
                              </label>
                            </div> 

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                checked={
                                  userinfo.response.includes("App Development")
                                    ? true
                                    : false
                                }
                                name="skill"
                                id="app"
                                value="App Development"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                              />
                              <label className="ml-[10px]" htmlFor="app">
                                {" "}
                                App Development
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                checked={
                                  userinfo.response.includes("SEO")
                                    ? true
                                    : false
                                }
                                name="skill"
                                id="seo"
                                value="SEO"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                              />
                              <label className="ml-[10px]" htmlFor="seo">
                                {" "}
                                SEO
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="linkedin"
                                value="LinkedIn Optimization"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes(
                                    "LinkedIn Optimization"
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="linkedin">
                                {" "}
                                LinkedIn Optimization
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="graphic"
                                value="Graphic Design"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Graphic Design")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="graphic">
                                {" "}
                                Graphic Design
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="video"
                                value="Video Editing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Video Editing")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="video">
                                {" "}
                                Video Editing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="time"
                                value="Time Management"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Time Management")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="time">
                                {" "}
                                Time Management
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="digital"
                                value="Digital Marketing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes(
                                    "Digital Marketing"
                                  )
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="digital">
                                {" "}
                                Digital Marketing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="content"
                                value="Content Writing"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Content Writing")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="content">
                                {" "}
                                Content Writing
                              </label>
                            </div>

                            <div className="flex w-full">
                              <input
                                type="checkbox"
                                name="skill"
                                id="ads"
                                value="Ads"
                                className="w-5 h-5 mt-[5px]"
                                onChange={handleChange}
                                checked={
                                  userinfo.response.includes("Ads")
                                    ? true
                                    : false
                                }
                              />
                              <label className="ml-[10px]" htmlFor="ads">
                                {" "}
                                Ads
                              </label>
                            </div>
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </div>

                    <div className="">
                      <textarea
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => setNext(!next)}
                        className="w-full mr-2 flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        onClick={collectData}
                        className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                <div className={next ? "hidden" : "block"}>
                  <div className="space-y-6">
                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type=""
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="">
                      <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="">
                      {/* <input
                        className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        type="text"
                        placeholder="University"
                      /> */}
                      <select
                        required
                        className="  w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none "
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                      >
                        <option
                          value=" "
                          disabled
                          selected
                          hidden
                          className="text-gray-400"
                        >
                          University
                        </option>
                        <option
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value=" IET-DAVV"
                        >
                          IET-DAVV
                        </option>
                        <option
                          className="w-full text-[1rem] h-[50px] px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 border-b-gray-500"
                          value="Shri Vaishnav Vidyapeeth Vishwavidyalaya"
                        >
                          Shri Vaishnav Vidyapeeth Vishwavidyalaya
                        </option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="submit"
                        onClick={changenext}
                        className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © 2021-2023
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Codepen aji"
                  className="text-purple-500 hover:text-purple-600 "
                >
                  Feedbox
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <svg
        class="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>

    // </div>
  );
};

export default Register;