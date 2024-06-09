// import React from "react";
// import Link from "next/link";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { API_BASE_URL } from "@configs/envs";
// import { AddressInterface } from "@app_types/interfaces/forms_schemas//AddressInterface";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Myaddresses from "@components/account/addresses/Myaddresses";
// import { Spinner } from "@nextui-org/spinner";

// const AddressCards = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const router = useRouter();

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error("Access token not found in local storage");
//       }

//       const response = await axios.get(
//         `${API_BASE_URL}/logistics/locations/?type=unloading&page=${page}`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
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
//     <div className="bg-gray-100 min-h-screen">
//       <div className=" flex justify-end	p-10">
//         <button
//           type="button"
//           className="  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-10 py-5 text-center me-2 mb-2"
//         >
//           <Link href={"/account/address/addunloadingaddress"}>
//             Add Unloading Address
//           </Link>
//         </button>
//       </div>
//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen">
//           <Spinner color="primary" />
//         </div>
//       ) : (
//         <>
//           <Myaddresses
//             data={data}
//             isLoading={isLoading}
//             onDeleteSuccess={onDeleteSuccess}
//             handleEditeClick={handleEditeClick}
//             endpointUrl={"unloading-locations"}
//           />{" "}
//         </>
//       )}

//       {/* Display your data here using the 'data' state */}

//       {/* Pagination component */}
//       <div className="flex justify-center content-end	">
//         <Stack spacing={2}>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange} // Use handlePageChange as the onChange event handler
//             color="primary"
//             hidePrevButton={page === 1} // Disable "Previous" button on page 1
//           />
//         </Stack>
//       </div>
//     </div>
//   );
// };

// export default AddressCards;
import React from "react";

function index() {
  return <div>index</div>;
}

export default index;
