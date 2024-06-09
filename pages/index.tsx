// import Image from "next/image";
import { Inter } from "next/font/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { CompaniesList } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
import ServiceCard from "@components/ServiceCard/ServiceCard";
import { Spinner } from "@nextui-org/spinner";

const inter = Inter({ subsets: ["latin"] });

import React from "react";
import CompanyCard from "@components/ServiceCard/CompanyCard";
import CompanyInfoComponent from "@components/Company/CompanyInfo";

function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<CompaniesList | null>(null);
  const [currentCompanyId, setCurrentCompanyId] = useState("noSelected");
  const [makeOrder, setMakeOrder] = useState(false);
  const openMakeOrderTabHandler = () => {
    setMakeOrder(true);
  };
  const closeMakeOrderTabHandler = () => {
    console.log("close");
    setMakeOrder(false);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken"); // Change refreshToken to accessToken
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        if (typeof decoded.exp === "number") {
          const expirationTime = decoded.exp * 1000; // Convert seconds to milliseconds
          const expirationDate = new Date(expirationTime);
          const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

          // Calculate current time
          const currentTime = new Date().getTime();

          // Calculate expiration time plus 30 minutes
          const expirationPlusThirtyMinutes =
            expirationTime + thirtyMinutesInMilliseconds;
          // Check if current time is greater than expiration time plus 30 minutes
          if (currentTime > expirationPlusThirtyMinutes) {
            // More than 30 minutes have passed since token expiration
            console.log(
              "More than 30 minutes have passed since token expiration."
            );
            try {
            } catch (error) {}
            // Perform your action here
          } else {
            console.log(
              "less than 30 minutes have passed since token expiration."
            );
          }
        } else {
          console.error("Expiration time is not a number.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("tokenExpiration");
          router.push("/auth/login");
        }
      } else {
        console.error("Access token doesn't exist in localStorage."); // Change error message
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiration");
        router.push("/auth/login");
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  async function allServicesCards() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/core/companies`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      setRes(response.data);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    allServicesCards();
  }, []);
  const handleCompanyCardClick = (serviceId: any) => {
    setCurrentCompanyId(serviceId);
  };

  const buyServiceHandler = (serviceId: string | number) => {};
  return (
    <div className="custom-container">
      <h2 className=" font-bold	my-5 text-2xl	text-slate-500 ml-5	">Companies</h2>
      {/* Conditionally render the spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      ) : (
        <div className=" w-full ">
          <div className="home-content-parent flex flex-col lg:flex-row justify-center">
            <div className="company-list lg:min-w-96 flex flex-col overflow-y-auto max-h-screen scrollbar-thin overflow-x-hidden">
              {res?.results.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleCompanyCardClick(service.id)}
                >
                  <CompanyCard
                    closeMakeOrderTabHandler={closeMakeOrderTabHandler}
                    key={service.id}
                    data={service}
                  ></CompanyCard>
                </div>
              ))}
            </div>
            <div className="company-list sm:w-full lg:w-2/3 ">
              <CompanyInfoComponent
                openMakeOrderTabHandler={openMakeOrderTabHandler}
                closeMakeOrderTabHandler={closeMakeOrderTabHandler}
                makeOrder={makeOrder}
                id={currentCompanyId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
