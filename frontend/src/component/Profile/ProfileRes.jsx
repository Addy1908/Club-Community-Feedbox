import { faChain, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

const ProfileRes = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [data, setData] = useState([]);

  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    let result = await fetch("http://localhost:8000/myResource", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    // console.log(result);
    setData(result);
  };



  
  const deleteRes = async(id)=>{
    // console.log(id)
    let result = await fetch(`http://localhost:8000/deleteResource/${id}`, {
      method: "delete",
    });

    result = await result.json();
    console.log(result)


    if (result) {
      // this is done to get back the product list re render after any product is deleted
      // if we do not call this function here the product will be deleted but it is visible on the
      //screen and then when we refresh it disappears. so to avoid that bug we have called that function
      getResource();
    }
  }




  return (
    <div>
      {/* <!-- component --> */}
      <div class="overflow-x-auto p-3">
        <table class="table-auto w-full">
          <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">Resource type</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Resource Title</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">Date Posted</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>

          <tbody class="text-sm divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item._id}>
                <td class="p-2">
                  <a
                    href={item && item.url}
                    target="_blank"
                    className="text-black"
                  >
                    <FontAwesomeIcon
                      icon={faFileInvoice}
                      className="w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                    />
                  </a>
                </td>
                <td class="p-2">
                  <div class="font-medium text-gray-800">{item.title}</div>
                </td>
                <td class="p-2">
                  <div class="text-left text-blue-600 font-bold">
                    {item.date && timeAgo.format(new Date(item.date).getTime() - 60 * 1000)}
                  </div>
                </td>
                <td class="p-2">
                  <div class="flex justify-center">
                    <button onClick={() => deleteRes(item._id)}>
                      <svg
                        class="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* <tr>
                            <td class="p-2">
                                    <FontAwesomeIcon icon={faFileInvoice} className='w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1' />
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    Introduction to JavaScript
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left text-blue-600 font-bold">17-03-2023</div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr> */}

            {/* 
                        <tr>
                            <td class="p-2">
                                    <FontAwesomeIcon icon={faChain} className='w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1' />
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    Introduction to JavaScript
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left text-blue-600 font-bold">17-03-2023</div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>



                        <tr>
                            <td class="p-2">
                                    <FontAwesomeIcon icon={faFileInvoice} className='w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1' />
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    Introduction to JavaScript
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left text-blue-600 font-bold">17-03-2023</div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td class="p-2">
                                    <FontAwesomeIcon icon={faChain} className='w-5 h-5 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1' />
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    Introduction to JavaScript
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left text-blue-600 font-bold">17-03-2023</div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 text-red-600 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileRes;
