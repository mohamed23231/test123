// import React from "react";
// import Link from "next/link";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import SalesComponent from "@components/account/Company/Sales/SalesComponent";
// import { API_BASE_URL } from "@configs/envs";
// import { Spinner } from "@nextui-org/spinner";

// const Sales = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [data, setData] = useState([]);
//   const router = useRouter();

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("Access token not found in local storage");
//       }

//       const response = await axios.get(`${API_BASE_URL}/orders/exports/`, {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setData(response.data.results);
//       setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const onDeleteSuccess = () => {
//     fetchData();
//   };
//   const handleEditeClick = (id: any) => {
//     if (!Array.isArray(data) || data.length === 0) {
//       return <div>No data available</div>;
//     }
//     router.push(`/services/modifyservice/${id}`);
//   };

//   return (
//     <div>
//       <div className=" flex justify-end m-10"></div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen">
//           <Spinner color="success" />
//         </div>
//       ) : (
//         <>
//           <SalesComponent
//             data={data}
//             isLoading={isLoading}
//             onDeleteSuccess={onDeleteSuccess}
//           />
//           {/* Display your data here using the 'data' state */}

//           {/* Pagination component */}
//           <div className="flex justify-center content-end">
//             <Stack spacing={2}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={handlePageChange} // Use handlePageChange as the onChange event handler
//                 color="primary"
//                 hidePrevButton={page === 1}
//                 // Disable "Previous" button on page 1
//               />
//             </Stack>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sales;
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@configs/envs";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import CompanyOrderComponent from "@components/account/Company/Order/CompanyOrderComponent";
import OrderInfo, {
  OrderInfoHandle,
} from "@components/account/Company/Order/OrderInfo";
import CompanySalesComponent from "@components/account/Company/Sales/CompanySalesComponent";
import { Stack } from "@mui/material";

const sales = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const selectedOrder = useRef<OrderInfoHandle>(null);

  const updateSelectedId = (id: any) => {
    setSelectedOrderId(id);
  };
  const selectedOrderHandler = (id: any) => {
    console.log("from id", id);
    selectedOrder?.current?.updateId(id);
    if (selectedOrder.current) {
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(
        `${API_BASE_URL}/orders/exports/?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data.results);
      console.log(response);
      setTotalPages(Math.ceil(response.data.count / 30)); // Assuming 10 items per page
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteSuccess = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
                <CompanySalesComponent
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
                    isSales={true}
                    ref={selectedOrder}
                    initialId={null}
                    onDeleteSuccess={onDeleteSuccess}
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

export default sales;
