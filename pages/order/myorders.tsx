import React, { useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Spinner } from "@nextui-org/spinner";
import TripListComponent from "@components/account/Company/Order/TripListComponent";
import CompanyOrderComponent from "@components/account/Company/Order/CompanyOrderComponent";
import OrderInfo, {
  OrderInfoHandle,
} from "@components/account/Company/Order/OrderInfo";

// import SalesComponent from "@components/account/Company/Sales/SalesComponent";

const Myorders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const selectedOrder = useRef<OrderInfoHandle>(null);
  const [selectedOrderId, setSelectedOrderId] = useState();

  const updateSelectedId = (id: any) => {
    setSelectedOrderId(id);
  };

  const selectedOrderHandler = (id: any) => {
    console.log("from id", id);
    selectedOrder?.current?.updateId(id);
    if (selectedOrder.current) {
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(
        `${API_BASE_URL}/orders/imports/?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 30)); // Assuming 10 items per page
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onDeleteSuccess = () => {
    fetchData();
  };

  return (
    <>
      <div className="custom-container">
        <div className="flex justify-end "></div>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner color="success" />
          </div>
        ) : (
          <>
            <div className="orders w-full flex flex-wrap xl:flex-nowrap">
              <div className="orders-list w-full xl:w-1/4 overflow-scroll scrollbar-thin max-h-screen">
                <CompanyOrderComponent
                  selectedOrderHandler={selectedOrderHandler}
                  data={data}
                  isLoading={isLoading}
                  onDeleteSuccess={onDeleteSuccess}
                  setSelectedOrderId={updateSelectedId}
                  selectedOrderId={selectedOrderId}
                />
              </div>
              <div className="w-full xl:w-3/4 ">
                <div className="">
                  <OrderInfo
                    onDeleteSuccess={onDeleteSuccess}
                    ref={selectedOrder}
                    initialId={null}
                  />
                </div>
              </div>
            </div>
            {/* Display your data here using the 'data' state */}

            {/* Pagination component */}
            <div className="flex justify-center content-end">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange} // Use handlePageChange as the onChange event handler
                  color="primary"
                  hidePrevButton={page === 1}
                  // Disable "Previous" button on page 1
                />
              </Stack>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Myorders;
