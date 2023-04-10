import React, { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";
import HomePageProfile from "./HomePageProfile";
import HomePageCal from "./HomePageCal";
import HomePageEvent from "./HomePageEvent";
import CreatePost from "./CreatePost";
import "./Main.css";
import bg from "../assets/mainBg.png";

const Main = () => {
  const [user, setUser] = useState();
  const [clg, setClg] = useState();
  const [eventSel, setEventSel] = useState();

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setUser(result);
  };

  const handleDataChange = (newData) => {
    setClg(newData);
  };


  const pull_data = (data) => {
    setEventSel(data);
  }
  const role = JSON.parse(localStorage.getItem("user")).role;


  return (
    <>
      <div
        className="main_container"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* *******************webview****************** */}
        <div className="main-page-display-web">
          <section className="main">
            <div className="flex m-auto justify-center">
              <div className="main-home-page-profile">
                <scrollable-component scrollbar-visibility="always">
                  <HomePageProfile sendData={handleDataChange} />
                </scrollable-component>
              </div>

              <div className="main-post-dispaly">
                <scrollable-component scrollbar-visibility="always">
                  <div>
                    {role && role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
                  </div>
                  <PostDisplay clgData={clg && clg} />
                </scrollable-component>
              </div>

              <div className="main-home-page-cal">
                <scrollable-component scrollbar-visibility="always">
                  <div className="home-page-cal-div">
                    <HomePageCal clgData={clg && clg} eventSel={pull_data} />
                  </div>
                  <p className="up-coming-events">UP-COMING EVENTS</p>
                  <HomePageEvent clgData={clg && clg} eveD={eventSel && eventSel} />
                </scrollable-component>
              </div>
            </div>
          </section>
        </div>

        {/* *****************tab view ************************* */}
        <div className="main-page-display-tab">
          <section className="main">
            <div className="main-page-display-tab-left ">
              <scrollable-component scrollbar-visibility="always">
                <HomePageProfile userData={user && user} />
                <p className="up-coming-events">UP-COMING EVENTS</p>

                <HomePageEvent clgData={clg && clg} />
              </scrollable-component>
            </div>
            <div className="main-page-display-tab-right">
              <scrollable-component scrollbar-visibility="always">
                {role && role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
                <PostDisplay clgData={clg && clg} />
              </scrollable-component>
            </div>
          </section>
        </div>

        {/* ******************mobile view************************* */}
        <div className="main-page-display-mobile">
          <section className="main ">
            <div className="w-[92%] ml-[4%]">
              <HomePageProfile userData={user && user} />
            </div>
            <div className="w-[92%] ml-[4%]">
              {role && role === "Club_Member" ? '' : <CreatePost userData={user && user} />}
            </div>
            <p className="up-coming-events">UP-COMING EVENTS</p>
            <div className="w-[92%] ml-[4%]">
              <HomePageEvent clgData={clg && clg} />
            </div>
            <PostDisplay clgData={clg && clg} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Main;
