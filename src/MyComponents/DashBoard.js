import React, { useEffect, useState } from "react";
import Navbar from "../MainComponents/Navbar";
import Sidebar from "../MainComponents/Sidebar";
export default function DashBoard() {
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/count"
      );
      const json = await response.json();
      setCount(json);
      // console.log(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
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
              <div className="row mt-4">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="card l-bg-cherry">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Earning</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            3,243K
                          </h2>
                        </div>
                        <div className="col-4 text-right">
                          <span>
                            12.5% <i className="fa fa-arrow-up"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="card l-bg-blue-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Register User</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {count.totalUsers}
                          </h2>
                        </div>
                        <div className="col-4 text-right">
                          <span>
                            15.07k <i className="fa fa-arrow-up"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Number Of Countries</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {count.totalCountries}
                          </h2>
                        </div>
                        <div className="col-4 text-right">
                          <span>
                            10% <i className="fa fa-arrow-up"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="card l-bg-orange-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Popular Routes</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">
                            {count.totalRoutes}
                          </h2>
                        </div>
                        <div className="col-4 text-right">
                          <span>
                            2.5% <i className="fa fa-arrow-up"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
