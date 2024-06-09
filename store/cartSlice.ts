import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Service,
  Company,
  CartState,
} from "@app_types/interfaces/forms_schemas/ServiceCart";
// interface Service {
//   product: string;
//   quantity: string;
//   unit: string;
//   customer_location: string;
//   delivery_start_date: string;
//   delivery_end_date: string;
//   companyLogo: string;
//   serviceLogo: string;
//   companyTitle: string;
// }

// interface Company {
//   services: Service[];
// }

// interface CartState {
//   [companyId: string]: Company;
// }

const loadCartFromLocalStorage = (): CartState => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addServiceToCompany: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Service> }>
    ) => {
      const { id: companyId, data: serviceData } = action.payload;
      const service: Service = {
        company: companyId,
        product: serviceData.product || "",
        quantity: serviceData.quantity || "",
        unit: serviceData.unit || "",
        customer_location: serviceData.customer_location || "",
        delivery_start_date: serviceData.delivery_start_date || "",
        delivery_end_date: serviceData.delivery_end_date || "",
        serviceLogo: serviceData.serviceLogo || "",
        companyLogo: serviceData.companyLogo || "",
        companyTitle: serviceData.companyTitle || "",
        note: serviceData.note || "",
      };
      if (!state[companyId]) {
        state[companyId] = { services: [] };
      }
      state[companyId].services.push(service);
      saveCartToLocalStorage(state);
    },
    deleteServiceFromCompany: (
      state,
      action: PayloadAction<{ companyId: string; serviceIndex: number }>
    ) => {
      const { companyId, serviceIndex } = action.payload;
      if (state[companyId]) {
        state[companyId].services.splice(serviceIndex, 1);
        if (state[companyId].services.length === 0) {
          delete state[companyId];
        }

        saveCartToLocalStorage(state);
      }
    },
    updateServiceInCompany: (
      state,
      action: PayloadAction<{
        companyId: string;
        serviceIndex: number;
        service: Partial<Service>;
      }>
    ) => {
      const {
        companyId,
        serviceIndex,
        service: updatedService,
      } = action.payload;
      if (state[companyId] && state[companyId].services[serviceIndex]) {
        state[companyId].services[serviceIndex] = {
          ...state[companyId].services[serviceIndex],
          ...updatedService,
        };
        saveCartToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      Object.keys(state).forEach((companyId) => {
        delete state[companyId];
      });
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addServiceToCompany,
  deleteServiceFromCompany,
  updateServiceInCompany,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
