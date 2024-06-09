// CompanyServices.tsx
import { API_BASE_URL } from "@configs/envs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardComponent from "@components/card/CardComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";

interface Order {
  product: string;
  quantity: string;
  unit: string;
  customerLocation: string;
  deliveryStartDate: string;
  deliveryEndDate: string;
}

const CompanyServices = () => {
  let totalLength = 0;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => {
    console.log("test");
    return state.cart;
  }); // Assuming your cart slice has an 'items' array
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const notify = () => toast.success("Order Placed and sent to Seller"); // Example notification

  const notifyIssue = () => toast.error("there's issue with your order");

  async function requestOrder() {
    let arrOfOrders: any[] = [];
    Object.keys(cartItems).map((objKey) => {
      return cartItems[objKey].services.map((obj: any) =>
        arrOfOrders.push(obj)
      );
    });

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth/login");
      throw new Error("Access token not found in local storage");
    }
    try {
      setIsLoading(true);
      if (arrOfOrders) {
        const res = await axios.post(
          `${API_BASE_URL}/orders/imports/`,
          arrOfOrders,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        notify();
      } else {
        throw new Error("There's no orders here");
      }
      dispatch(clearCart());
    } catch (error: any) {
      console.log("error from account info", error);
      // formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Collect JSX elements within an array
  const renderedCards = Object.keys(cartItems).map((key) => {
    const orderdFromCompany = cartItems[key];
    const getTotalServicesLength = (data: any) => {
      // Iterate over each company
      for (const companyId in data) {
        if (Object.hasOwnProperty.call(data, companyId)) {
          const company = data[companyId];
          // Add the length of services array for the current company
          totalLength += company.services.length;
        }
      }

      return totalLength;
    };
    console.log("from card", cartItems);
    console.log("length of card ", getTotalServicesLength(cartItems));
    return (
      <>
        <CardComponent
          key={key}
          companyId={key}
          orderdFromCompany={orderdFromCompany}
        />
      </>
    );
  });

  // Return the collected JSX elements
  return (
    <>
      {totalLength ? (
        <div className="flex justify-end m-5">
          <span>
            {totalLength && (
              <span>
                <button
                  type="button"
                  onClick={requestOrder}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {isLoading ? (
                    <Spinner size="sm" color="success" />
                  ) : (
                    "order now"
                  )}
                </button>
              </span>
            )}
            {/* Your other content within the span */}
          </span>
        </div>
      ) : (
        <div className="empty-card flex my-3">
          <div className="content w-1/2 flex flex-col justify-center items-end">
            <div className="flex flex-col items-center 	">
              <div className="text-3xl font-bold leading-loose">
                Your Shopping Cart looks Empty
              </div>
              <div className="text-xl font-semibold leading-loose">
                What are you waiting for?
              </div>
              <div className="my-3">
                <Link href={"/"}>
                  <button
                    type="button"
                    className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
                  >
                    Start Shopping Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="img w-1/2">
            <div className="img-emp">
              <img src="/emptycard.jpg" alt="" />
            </div>
          </div>
        </div>
      )}
      {renderedCards}
    </>
  );
};

export default CompanyServices;
