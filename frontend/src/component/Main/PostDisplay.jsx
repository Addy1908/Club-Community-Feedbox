import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { FcLike } from "react-icons/fc";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useState, useEffect, } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation } from "swiper";
import "./PostDisplay.css";
import PostBigModel from "./PostBigModel";
import Loader from '../Loader.jsx'
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom"

const PostDisplay = (props) => {

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [val, setVal] = useState([]);
  const [id, setId] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [load, setLoad] = useState(false);
  // To open the Comment Model
  const [openComment, setOpenComment] = useState(false);

  const role = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).role;
  const college = JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).college;
  console.log(college);

  const [{ currentUser, allPosts }, dispatch] = useStateValue();

  useEffect(() => {
    getUser();
    getList();
    setLoad(false);
  }, [load, props.clgData]);

  const getUser = () => {
    setUser(currentUser);
  };

  // get All Post
  const getList = async () => {
    setLoading2(true);
    let result;
    if (allPosts) {
      setData(allPosts);
      result = allPosts;
    }
    else {
      let res = await fetch("http://localhost:8000/getAllPost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      res = await res.json();
      setData(res);

      let count = 0;
      res.map((data) => {
        count = data.comment.length
        data.comment.map((res) => {
          count += res.reply.length;
        })
        data.count = count;
      })

      dispatch({
        type: 'INIT_ALL_POST',
        item: res
      });
      result = res
    }

    setVal(result.reverse())

    if (role === "Super_Admin" || role === "Admin") {
      console.log(props.clgData, "ppp");
      if (props.clgData) {
        if (props.clgData === "All") {
          setData(result)
          setLoad(true);
        } else {
          console.log(props.clgData);
          let array = [];
          result.map((eve) => {
            if (eve.collegeName === props.clgData) {
              array.push(eve);
            }
          })
          console.log(array);
          if (array.length > 0) {
            setData(array);
            setLoad(true);
          } else {
            setData([])
            setLoad(true);
          }
        }
      } else {
        if (role == "Admin") {
          let array = [];
          result.map((data) => {
            if (data.scope === "public" || data.collegeName === college) {
              array.push(data);
            }
          })
          setData(array);
          setLoad(true);
        } else {
          setData(result);
          setLoad(true);
        }
      }
    } else {
      let array = [];
      result.map((data) => {
        if (data.scope === "public" || data.collegeName === college) {
          array.push(data);
        }
      })
      setData(array);
      setLoad(true);
    }
    setLoading2(false);
  };

  // Like a post
  const like = (id) => {
    fetch("http://localhost:8000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    }).then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Unlike a Post
  const unlike = (id) => {
    fetch("http://localhost:8000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="post_display_container">
      {!loading2 ?
        <div className="mb-[120px]">
          {
          data.length > 0 ? data.map((item, index) => (
            <div key={item._id} className="post-display1">

              <div className="post-display-head">
                <div className="post-display-profile">
                  <img src={item && item.postedBy && item.postedBy.img} alt="" />
                </div>
                <div className="post-display-heading">
                  {
                    role === "Super_Admin" || role === "Admin" ?
                      <Link className="link-to-profile" to="/profile"
                        state={item.postedBy}
                      >
                        <p className="post-head">
                          {item && item.postedBy && item.postedBy.name}
                        </p>
                      </Link>
                      :
                      <p className="post-head">
                        {item && item.postedBy && item.postedBy.name}
                      </p>
                  }

                  <div className="post-head-content">
                    <p className="post-display-heading-college">
                      {
                        item.scope === 'public' ? 'Public' :
                          item && item.postedBy && item.postedBy.role == 'Super_Admin' ? 'Super Admin' : item.collegeName
                      }
                    </p>
                    <p className="post-display-heading-time">{item.postedDate && timeAgo.format(new Date(item.postedDate).getTime() - 60 * 1000)}</p>
                  </div>
                </div>
              </div>


              <div className="post-display-center">
                <div className="post-display-content">{item.desc}</div>

                {/* ******carousel for mobile view******** */}
                {item.img.length > 0 ?
                  <div className="post-display-image ">
                    <div className="post-display-carousel-mobileview">
                      <Swiper
                        navigation={item.img.length === 1 ? false : true}
                        data-aos="fade-up"
                        data-aos-duration="100s"
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}

                        className="mySwiper">
                        {

                          item.img.length > 0 &&
                          item.img.map((data) => (
                            <SwiperSlide >
                              <div className="" key={data._id}>
                                <img className="" src={data} alt="" />
                              </div>
                            </SwiperSlide>
                          ))
                        }
                      </Swiper>
                    </div>
                  </div>
                  : ' '}

                {/* ********carousel for web view********** */}

                {item.img.length > 0 ?
                  <div id="web-carousel" className="post-display-image flex justify-center h-[620px] carousel-web-view">
                    <div className="post-display-carousel-webview flex justify-center h-[100%] m-0 p-0">
                      <Carousel
                        thumbWidth={60}
                        width={450}
                        dynamicHeight
                        autoPlay
                        interval="5000"
                        infiniteLoop={true}
                      >
                        {
                          item.img.length > 0 &&
                          item.img.map((data) => (
                            <div key={data._id}>
                              <img className="display-img" src={data} />
                            </div>
                          ))
                        }
                      </Carousel>
                    </div>
                  </div> : ''}
              </div>

              <div className="post-display-bottom">

                {item.likes.includes(user && user._id) ? (
                  <div className="post-display-bottom-content">
                    <FcLike
                      size={26}
                      onClick={function () {
                        unlike(item && item._id);
                      }}
                      style={{ marginLeft: "-1.4px", marginTop: "-3px", cursor: "pointer" }}
                    />
                    <span> {item.likes.length}</span>
                  </div>
                ) : (
                  <div className="post-display-bottom-content">
                    <FontAwesomeIcon className="fa-lg" icon={faHeart} style={{ fontSize: "24.5px", cursor: "pointer" }}
                      onClick={function () {
                        like(item._id);
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                      {item.likes.length}
                    </span>

                  </div>
                )}
                <button onClick={() => {
                  setOpenComment(!openComment)
                  setId(item._id)
                }} className="post-display-bottom-content">
                  <FontAwesomeIcon
                    style={{ fontSize: "22.5px", cursor: "pointer", marginTop: "1px" }}
                    icon={faMessage} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                    {item.count}
                  </span>
                </button>
              </div>
            </div>
          )) :
          <div className="post-display1">
            <div style={{textAlign:"center"}}>No Post Yet !</div>
          </div>
          }
        </div>
        :
        <div className="post-display1">
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span class="sr-only">Loading...</span>
          </div>
          </div>
        }
      <PostBigModel
        openComment={openComment}
        setOpenComment={setOpenComment}
        id={id}
      />
    </div>
  );

}
export default PostDisplay;