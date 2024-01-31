import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../MainComponents/Navbar";
import Sidebar from "../MainComponents/Sidebar";
export default function ManageCarousels() {
  const [image, setImage] = useState("");
  const [imagePage, setImagePage] = useState("");
  const [data, setData] = useState("");
  const [count] = useState(1);
  const handleImage = (event) => {
    // setProjectImg(event.target.value);
    const file = event.target.files[0];
    setImage(file);
  };
  const handleImagePage = (event) => {
    setImagePage(event.target.value);
  };
  const fetchRoutesData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/carouselPic"
      );
      const json = await response.json();
      setData(json);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handlePostData = async () => {
    console.log(image, imagePage);
    try {
      console.log(imagePage);
      const formData = new FormData();
      formData.append("Image", image);
      formData.append("page", imagePage);

      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/carouselPic`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate content");
      } else {
        const json = await response.json();
        console.log(json);
        alert("Image Add SuccessFully");
        setImagePage("");
        setImage(null);
        fetchRoutesData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (data) => {
    try {
      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/carouselPic/${data}`,
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
        fetchRoutesData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    fetchRoutesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid bodySetting">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container">
              <div className="row">
                <h1 className="text-primary fw-bold text-decoration-underline mb-3">
                  Manage Carousel Picture
                </h1>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                  <div className="alert alert-primary" role="alert">
                    <button
                      type="button"
                      className="btn btn-outline-primary d-flex justify-content-end align-content-end"
                      data-bs-toggle="modal"
                      data-bs-target="#Carsouel"
                    >
                      + Add Carousel Picture
                    </button>
                  </div>
                  <table className="table table-dark table-bordered border-light">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Page</th>
                        <th scope="col">Image</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    {Array.isArray(data) ? (
                      data.map((data, index) => (
                        <tbody className="table-group-divider">
                          <tr key={data._id}>
                            <th scope="row">{count + index}</th>
                            <td> {data.page.toUpperCase()}</td>
                            <td>
                              {" "}
                              <Link
                                className=" text-light"
                                to={data.image}
                                target="_blank"
                              >
                                Image
                              </Link>
                            </td>
                            <td>
                              <button className="btn btn-primary text-light fw-bold disable btn-sm">
                                Update
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger text-light fw-bold btn-sm"
                                onClick={() => handleDelete(data._id)}
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
                id="Carsouel"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Add Picture
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="CountryForm">
                        <label for="example" className="form-label">
                          Select Page for Picture
                        </label>
                        <select
                          className="form-select mb-3"
                          aria-label="Default select example"
                          onChange={handleImagePage}
                        >
                          <option selected>Select Page for Picture</option>
                          <option value="home">Home</option>
                          <option value="visa">Visa</option>
                          <option value="flight">Flight</option>
                          <option value="Offers">Offers</option>
                          <option value="Packages">Packages</option>
                        </select>
                        <label for="exampleImage" className="form-label">
                          Image
                        </label>
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                            onChange={handleImage}
                          />
                          <label
                            className="input-group-text"
                            for="inputGroupFile02"
                          >
                            Upload
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handlePostData}
                        >
                          Add Picture
                        </button>
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
