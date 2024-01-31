import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../MainComponents/Navbar";
import Sidebar from "../MainComponents/Sidebar";
export default function ManageAppointment() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");
  const [count] = useState(1);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/contactMessage"
      );
      const json = await response.json();
      setMessage(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleOpenChat = async (message) => {
    try {
      setChat(message);
    } catch (error) {
      console.error("Message not found:");
    }
  };

  const handleDelete = async (message) => {
    try {
      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/contactMessage/${message}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        alert(jsonData.message);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {" "}
      <Navbar />
      <div className="container-fluid bodySetting">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* <h1
              className=" fw-bold text-decoration-underline mb-3 m-auto d-flex justify-content-center align-content-center  "
              style={{ color: "red", fontSize: "60px" }}
            >
              Manage Home Page
            </h1> */}
            <div className="container my-4">
              <div className="row">
                <h1 className="text-primary fw-bold text-decoration-underline mb-3">
                  Manage Appointments
                </h1>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                  <table className="table table-bordered border-light table-dark">
                    <thead className="">
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Email</th>
                        <th scope="col">OpenChat</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    {Array.isArray(message) ? (
                      message.map((message, index) => (
                        <tbody className="table-group-divider">
                          <tr key={message._id}>
                            <th scope="row">{count + index}</th>
                            <td>
                              {" "}
                              {message.firstName} {message.lastName}
                            </td>
                            <td>{message.subject}</td>
                            <td>
                              <Link
                                className=" text-light"
                                to={`mailto:${message.email}`}
                                target="_blank"
                              >
                                Email
                              </Link>
                            </td>

                            <td>
                              <button
                                className="btn btn-primary text-light fw-bold  btn-sm"
                                onClick={() => handleOpenChat(message)}
                                data-bs-toggle="modal"
                                data-bs-target="#openChat"
                              >
                                Message
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger text-light fw-bold btn-sm"
                                onClick={() => handleDelete(message._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))
                    ) : (
                      <tbody>
                        <tr>
                          <td colspan="5">No Data Found</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="openChat"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5 d-flex justify-content-center align-content-center"
                        id="staticBackdropLabel"
                      >
                        Chat
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col ">
                          <h4
                            htmlFor="exampleInputFirstName"
                            className="form-label"
                          >
                            First Name
                          </h4>
                          <p htmlFor="handleCountryName" className="form-label">
                            {chat.firstName}
                          </p>
                        </div>
                        <div className="col">
                          <h4
                            htmlFor="exampleInputLastName"
                            className="form-label"
                          >
                            Last Name
                          </h4>
                          <p htmlFor="handleCountryName" className="form-label">
                            {chat.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="my-2">
                        <h4 htmlFor="exampleInputEmail1" className="form-label">
                          Email address
                        </h4>
                        <p htmlFor="handleCountryName" className="form-label">
                          {chat.email}
                        </p>
                      </div>
                      <div className="my-2">
                        <h4
                          htmlFor="exampleInputSubject"
                          className="form-label"
                        >
                          Subject
                        </h4>
                        <h6 htmlFor="handleCountryName" className="form-label">
                          {chat.subject}
                        </h6>
                      </div>
                      <div className="mb-3">
                        <h4 htmlFor="" className="form-label">
                          Detail
                        </h4>
                        <p htmlFor="handleCountryName" className="form-label">
                          {chat.issue}
                        </p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Modal End --> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
