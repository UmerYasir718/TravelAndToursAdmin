import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../MainComponents/Navbar";
import Sidebar from "../MainComponents/Sidebar";
export default function ManagePopularRoutes() {
  const [routesData, setRoutesData] = useState([]);
  const [srcPlace, setSrcPlace] = useState("");
  const [desPlace, setDesPlace] = useState("");
  const [routesPrice, setRoutesPrice] = useState();
  const [routesImg, setRoutesImg] = useState(null);
  const [count] = useState(1);
  // const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteImg = (event) => {
    // setProjectImg(event.target.value);
    const file = event.target.files[0];
    setRoutesImg(file);
  };
  const handleSrcPlace = (event) => {
    setSrcPlace(event.target.value);
  };
  const handleDesPlace = (event) => {
    setDesPlace(event.target.value);
  };
  const handleRoutePrice = (event) => {
    setRoutesPrice(event.target.value);
  };
  // const handleUpdate = (route) => {
  //   setSelectedRoute(route);
  //   setSrcPlace(route.srcPlace);
  //   setDesPlace(route.desPlace);
  //   setRoutesPrice(route.price);
  // };

  const fetchRoutesData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/home/popularRoutes"
      );
      const json = await response.json();
      setRoutesData(json);
      console.log(routesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  };
  const handleData = async () => {
    try {
      console.log(srcPlace, desPlace, routesPrice, routesImg);
      const formData = new FormData();
      formData.append("srcPlace", srcPlace);
      formData.append("desPlace", desPlace);
      formData.append("routesImg", routesImg);
      formData.append("routesPrice", routesPrice);

      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/home/popularRoutes`,
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
        alert("Route Add SuccessFully");
        setSrcPlace("");
        setRoutesImg(null);
        setDesPlace("");
        setRoutesPrice("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (routes) => {
    try {
      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/items/delete/${routes}`,
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
                  Manage PopularRoute
                </h1>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                  <div className="alert alert-primary" role="alert">
                    <button
                      type="button"
                      className="btn btn-outline-primary d-flex justify-content-end align-content-end"
                      data-bs-toggle="modal"
                      data-bs-target="#popularRoutes"
                    >
                      + Add Route
                    </button>
                  </div>
                  <table className="table table-dark table-bordered border-light">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">SrcToDes</th>
                        <th scope="col">Price</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    {Array.isArray(routesData) ? (
                      routesData.map((routes, index) => (
                        <tbody className="table-group-divider">
                          <tr key={routes._id}>
                            <th scope="row">{count + index}</th>
                            <td>
                              <Link
                                className=" text-light "
                                to={routes.image}
                                target="_blank"
                              >
                                Image
                              </Link>
                            </td>
                            <td>
                              {" "}
                              {routes.srcPlace} To {routes.desPlace}
                            </td>
                            <td>{routes.price}</td>
                            <td>
                              <button className="btn btn-primary text-light fw-bold disable btn-sm">
                                Update{" "}
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger text-light fw-bold btn-sm"
                                onClick={() => handleDelete(routes._id)}
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
                id="popularRoutes"
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
                        PopularRoutes
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {" "}
                      <div className="RouteForm">
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Source Place
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="handleCountryName"
                            aria-describedby="emailHelp"
                            value={srcPlace}
                            onChange={handleSrcPlace}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Destination Place
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="handleCountryPrice"
                            value={desPlace}
                            onChange={handleDesPlace}
                          />
                        </div>
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
                          Image
                        </label>
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                            onChange={handleRouteImg}
                          />
                          <label
                            className="input-group-text"
                            for="inputGroupFile02"
                          >
                            Upload
                          </label>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="handleCountryName"
                            aria-describedby="emailHelp"
                            value={routesPrice}
                            onChange={handleRoutePrice}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleData}
                        >
                          Add Routes
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
