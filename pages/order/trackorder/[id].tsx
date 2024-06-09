import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { Trip } from "@app_types/interfaces/forms_schemas/ShowTripsSchemaInterface";
import Button from "@mui/material/Button";

import TripList from "@components/account/Company/Sales/TripList";
import TrackOrderTripComponent from "@components/account/Company/Order/TrackOrderTripComponent";
const TrackOrder = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Trip[] | null>(null); // Initialize data state
  const { id } = router.query;

  async function fetchData() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/trips/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data.results); // Set data to results array
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const onDeleteSuccess = () => {
    fetchData();
  };
  const changeStatus = () => {
    fetchData();
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center"></div>
      <TrackOrderTripComponent
        data={data}
        isLoading={isLoading}
        onStatusChangeSuccess={changeStatus}
      />
    </>
  );
};

export default TrackOrder;
