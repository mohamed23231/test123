import {
  faLocationDot,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Service,
  Company,
  CartState,
} from "@app_types/interfaces/forms_schemas/ServiceCart";
import { useDispatch } from "react-redux";

import ConfirmDialog from "@components/utilities/ConfirmDialog";
import {
  deleteServiceFromCompany,
  updateServiceInCompany,
} from "../../store/cartSlice";
import EditeServiceComponent from "./EditeServiceComponent";

const CardComponent = ({ companyId, orderdFromCompany }: any) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editeService, setEditeService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // State to hold the order data
  const [service, setService] = useState<any>(null);

  // Update the state with order data from props using useEffect
  useEffect(() => {
    setService(orderdFromCompany);
  }, [orderdFromCompany]);

  // Ensure that orderData is defined before accessing its properties
  if (!service) {
    return null; // or any other fallback UI if needed
  }
  const { services }: any = service;
  console.log("services from this company", services);
  // Render the card content

  const handleDelete = (index: number) => {
    console.log(index);
    setServiceToDelete(index);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete !== null) {
      dispatch(
        deleteServiceFromCompany({ companyId, serviceIndex: serviceToDelete })
      );
    }
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setServiceToDelete(null);
  };

  const handleUpdate = (index: number) => {
    setEditIndex(index);
  };

  const handleCancelUpdate = () => {
    setEditIndex(null);
  };

  console.log("service is ", editeService);
  return (
    <>
      {isModalOpen && (
        <EditeServiceComponent
          selectedIndex={selectedIndex}
          isModalOpen={isModalOpen}
          companyId={companyId}
          editeService={editeService}
          closeModalProp={closeModal}
        />
      )}
      {}
      <div className="container mx-auto bg-slate-100 my-3 rounded">
        <div className="flex items-center">
          <div className="w-20 h-20">
            <img
              className="w-full h-full border rounded-full object-contain"
              src={
                services[0].companyLogo !== ""
                  ? services[0].companyLogo
                  : "/favicon1.jpg"
              }
              alt={services[0].companyTitle}
            />
          </div>
          <div className="mx-2">Orders From: {services[0].companyTitle}</div>
        </div>
        {services?.map((oneService: Service, index: number) => (
          <div
            key={index}
            className="company-card w-full p-5 transition-transform duration-300 hover:translate-y-[-2px] hover:translate-x-[2px] hover:shadow-md cursor-pointer hover:bg-neutral-50"
            onClick={() => {}}
          >
            <div className="company-head flex lg:w-1/2 md:w-full">
              <div className="company-img w-1/6 lg:mr-2 flex justify-center">
                <div className="w-20 h-20">
                  <img
                    className="w-full h-full border"
                    src={
                      oneService.serviceLogo !== ""
                        ? oneService.serviceLogo
                        : "/favicon1.jpg"
                    }
                    alt={oneService.product}
                  />
                </div>
              </div>
              <div className="company-img w-5/6 overflow-hidden flex justify-between">
                <div className="content">
                  {editIndex === index ? (
                    <p>Still Under Progress</p>
                  ) : (
                    <>
                      <h3 className="font-semibold">{oneService.product}</h3>
                      <p>
                        {oneService.unit} {oneService.quantity}
                      </p>
                      <div className="action-btn flex items-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center"
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </button>
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center"
                          onClick={() => {
                            setEditeService(oneService);
                            setSelectedIndex(index);
                            openModal();
                            // handleUpdate(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <ConfirmDialog
          open={isDialogOpen}
          message="Are you sure you want to delete this service?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default CardComponent;
