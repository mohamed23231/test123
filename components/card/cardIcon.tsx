import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartIcon = () => {
  const cart = useSelector((state: any) => state.cart);

  const getTotalServicesLength = (data: any) => {
    let totalLength = 0;

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

  // useEffect(() => {
  //   getTotalServicesLength(cart);
  // }, cart);
  // Calculate the total number of items in the cart
  return (
    <>
      {getTotalServicesLength(cart) > 0 && (
        <span className="cart-count">{getTotalServicesLength(cart)}</span>
      )}
      <FontAwesomeIcon icon={faShoppingCart} size="sm" />
    </>
  );
};

export default CartIcon;
