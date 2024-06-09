import {
  EmployeeApiResponse,
  Employee,
} from "@app_types/interfaces/forms_schemas/EmployeesSchemaInterface";
import { useRouter } from "next/router";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import { toast } from "react-hot-toast";
import ConfirmDialog from "@components/utilities/ConfirmDialog";
import { useState } from "react";

interface MyServicesProp {
  isLoading: boolean;
  data: Employee[] | null;
  showDrivers: boolean;
  showManagers: boolean;
  onDeleteSuccessManager: () => void;
  onDeleteSuccessDriver: () => void;
}

const EmployeesComponent = ({
  isLoading,
  showDrivers,
  showManagers,
  data,
  onDeleteSuccessManager,
  onDeleteSuccessDriver,
}: MyServicesProp) => {
  const router = useRouter();
  const notifySuccess = (message: string) => toast.success(`${message}`);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<any>({});

  const handleDelete = async (role: string, id: any) => {
    console.log(`clicked delete`);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.delete(
        `${API_BASE_URL}/employees/${role}/${id}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      notifySuccess("employee deleted");
      if (role == "drivers") {
        onDeleteSuccessDriver();
      } else if (role == "managers") {
        onDeleteSuccessManager();
      }
      console.log(response.data);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
    }
  };
  console.log("from child component driver", showDrivers);
  console.log("from child component managers", showManagers);
  console.log("from child component data", data);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmation = (role: string, id: any) => {
    setDeleteItemId({ id, role });
    openDeleteModal();
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      await handleDelete(deleteItemId.role, deleteItemId.id);
      closeDeleteModal();
    }
  };

  return (
    <>
      {/* Show Drivers Data */}

      {showDrivers && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto 5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  National ID
                </th>
                <th scope="col" className="px-6 py-3">
                  License Number
                </th>
                <th scope="col" className="px-6 py-3">
                  License Expiry Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((employee: Employee) => (
                <tr
                  key={employee.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {employee.first_name}
                  </td>
                  <td className="px-6 py-4">{employee.last_name}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.phone}</td>
                  <td className="px-6 py-4">{employee.address}</td>
                  <td className="px-6 py-4">{employee.national_id}</td>
                  <td className="px-6 py-4">{employee.license_number}</td>
                  <td className="px-6 py-4">{employee.license_expiry_date}</td>
                  <td className="px-6 py-4 cursor-pointer	">
                    <button
                      onClick={() => {
                        handleDeleteConfirmation("drivers", employee.id);
                      }}
                      type="button"
                      className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                    >
                      Delete
                    </button>

                    {/* <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Delete
                      </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmDialog
            open={isDeleteModalOpen}
            message="Are you sure you want to delete this Employee?"
            onConfirm={handleConfirmDelete}
            onCancel={closeDeleteModal}
          />
        </div>
      )}

      {/* Show Managers Data */}
      {showManagers && ( // Updated variable name
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  manager: Employee // Updated variable name
                ) => (
                  <tr
                    key={manager.id} // Updated variable name
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {manager.first_name} {/* Updated variable name */}
                    </td>
                    <td className="px-6 py-4">{manager.last_name}</td>
                    <td className="px-6 py-4">{manager.role}</td>
                    <td className="px-6 py-4">{manager.phone}</td>
                    <td className="px-6 py-4">{manager.address}</td>
                    <td className="px-6 py-4 cursor-pointer	">
                      <button
                        onClick={() => {
                          handleDeleteConfirmation("managers", manager.id);
                        }}
                        type="button"
                        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                      >
                        Delete
                      </button>

                      {/* <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Delete
                      </span> */}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EmployeesComponent;
