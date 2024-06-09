import { ExportOrder } from "@app_types/interfaces/forms_schemas/RequestedOrderSales";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import { RequestedOrder } from "@app_types/interfaces/forms_schemas/SalesInfoSchemaInterface";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import TripListComponent from "../Order/TripListComponent";
export type OrderInfoHandle = {
  updateId: (newId: number) => void;
};

//  Define the component and its props
interface OrderInfoProps {
  initialId: number | null;
  isSales?: boolean;
}

const SalesInfoComponent = () => {
  return <div>SalesInfoComponent</div>;
};

export default SalesInfoComponent;

{
  /* <div className="flex">
<div className="order-item-head-img flex mb-2 ">
  <div className="w-20 h-20 rounded-full mr-2 overflow-hidden">
    <img
      className="h-full w-full object-cover"
      src="/favicon1.jpg"
      alt="Circular Image"
    />
  </div>
  <div className="flex flex-col justify-center">
    <p>{order.customer_name}</p>
    <p>{order.created_at}</p>
  </div>
</div>
</div> */
}
