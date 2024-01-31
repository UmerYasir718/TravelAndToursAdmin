import React, { useEffect, useState } from "react";
import Navbar from "../MainComponents/Navbar";
import Sidebar from "../MainComponents/Sidebar";
export default function ManageCountries() {
  const [countryData, setCountryData] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryPrice, setCountryPrice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [count] = useState(1);
  const handleCountryName = (event) => {
    setCountryName(event.target.value);
  };
  const handleCountryPrice = (event) => {
    setCountryPrice(event.target.value);
  };
  const handleUpdate = (country) => {
    setSelectedCountry(country);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/home/countries"
      );
      const json = await response.json();
      setCountryData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(error);
    }
  };

  const handlePostData = async () => {
    if (!countryName || !countryPrice) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    const formData = {
      countryName,
      countryPrice,
    };
    console.log(formData);

    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/home/countries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Item added successfully!");
        fetchData();
        setCountryName("");
        setCountryPrice("");
        // You can redirect or perform any other action after a successful post
      } else {
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleUpdateSubmit = async () => {
    if (!countryName || !countryPrice || !selectedCountry) {
      alert("Please fill in all fields before updating.");
      return;
    }

    const updatedFormData = {
      countryName,
      countryPrice,
    };
    console.log("Updated FormData:", updatedFormData);

    try {
      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/home/countries/${selectedCountry._id}`,
        {
          method: "PUT", // Use PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        fetchData(); // Refresh the data after the update
        setCountryName("");
        setCountryPrice("");
        setSelectedCountry(null); // Clear the selected country after updating
      } else {
        console.error("Failed to update item:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (country) => {
    try {
      const response = await fetch(
        `https://travel-and-tourism-apis.vercel.app/home/countries/${country}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        alert(jsonData.message);
        // Item deleted successfully, update state
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    if (selectedCountry) {
      // Set initial state based on the selected country
      setCountryName(selectedCountry.countryName);
      setCountryPrice(selectedCountry.countryPrice);
    } else {
      // No country selected, reset the input fields
      setCountryName("");
      setCountryPrice("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
            <div className="container">
              <div className="row">
                <h1 className="text-primary fw-bold text-decoration-underline mb-3">
                  Manage Countries
                </h1>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                  <div className="alert alert-primary" role="alert">
                    <button
                      type="button"
                      className="btn btn-outline-primary d-flex justify-content-end align-content-end"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      + Add Country
                    </button>
                  </div>

                  <table className="table table-dark table-bordered border-light p-3">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Country</th>
                        <th scope="col">Price</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>

                    {Array.isArray(countryData) ? (
                      countryData.map((country, index) => (
                        <tbody className="table-group-divider ">
                          <tr key={country._id}>
                            <th scope="row">{count + index}</th>
                            <td> {country.countryName}</td>
                            <td>{country.countryPrice}</td>
                            <td>
                              <button
                                className="btn btn-primary text-light fw-bold disable btn-sm"
                                onClick={() => handleUpdate(country)}
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                Update
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger text-light fw-bold btn-sm"
                                onClick={() => handleDelete(country._id)}
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
                id="staticBackdrop"
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
                        {selectedCountry ? "Update Country" : "Country Form"}
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
                      <div className="CountryForm">
                        <div className="mb-3">
                          <label
                            htmlFor="handleCountryName"
                            className="form-label"
                          >
                            Country Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="handleCountryName"
                            aria-describedby="emailHelp"
                            value={countryName}
                            onChange={handleCountryName}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="handleCountryPrice"
                            className="form-label"
                          >
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="handleCountryPrice"
                            value={countryPrice}
                            onChange={handleCountryPrice}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={
                            selectedCountry
                              ? handleUpdateSubmit
                              : handlePostData
                          }
                        >
                          {selectedCountry ? "Update Country" : "Add Country"}
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
