import MyServices from "@components/account/MyServices";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";

import {
  MyServicesInterface,
  Service,
} from "@app_types/interfaces/forms_schemas/MyServicesInterface";

const Myservices = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<Service[] | null>(null);

  async function MyServicesCards() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/logistics/services`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("dataaaaaaaa", response.data);
      setRes(response.data.results);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditeClick = (id: any) => {
    router.push(`/services/modifyservice/${id}`);
  };

  const onDeleteSuccess = () => {
    MyServicesCards();
  };
  useEffect(() => {
    MyServicesCards();
  }, []);

  return (
    <>
      <div className="service-btn flex justify-center mt-10	">
        <button className="	 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link href={"/account/accountServices"}>
              <Typography textAlign="center">Add Service</Typography>
            </Link>
          </span>
        </button>
      </div>
      {/* Conditionally render the spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      ) : (
        <MyServices
          data={res}
          isLoading={isLoading}
          onDeleteSuccess={onDeleteSuccess}
          handleEditeClick={handleEditeClick}
        />
      )}
    </>
  );
};

export default Myservices;
