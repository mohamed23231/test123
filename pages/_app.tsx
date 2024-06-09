import "@styles/globals.css";
import Navbar from "@components/Navbar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import store from "../store/store";
import { Provider } from "react-redux";
import { setUserRole } from "../store/userSlice";
import { Toaster } from "react-hot-toast"; // Import Toaster
import { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface DecodedToken {
  exp?: number; // Make exp optional to handle potential undefined
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken || !refreshToken) {
        console.error(
          "Access token or refresh token doesn't exist in localStorage."
        );
        clearTokensAndRedirect();
        return;
      }

      const decodedAccessToken = jwtDecode(accessToken) as DecodedToken;
      const decodedRefreshToken = jwtDecode(refreshToken) as DecodedToken;

      const accessTokenExp = parseInt(
        decodedAccessToken?.exp?.toString() || ""
      );
      const refreshTokenExp = parseInt(
        decodedRefreshToken?.exp?.toString() || ""
      );

      if (isNaN(accessTokenExp) || isNaN(refreshTokenExp)) {
        console.error("Expiration time is not a valid number.");
        clearTokensAndRedirect();
        return;
      }

      const expirationPlusThirtyMinutes =
        refreshTokenExp * 1000 + 30 * 60 * 1000;
      const currentTime = new Date().getTime();

      if (currentTime > expirationPlusThirtyMinutes) {
        refreshAccessToken(refreshToken);
      }
    };

    checkTokenExpiration();
  }, []);

  const clearTokensAndRedirect = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    router.push("/auth/login");
  };
  if (typeof window !== "undefined") {
    // Check if user role is available in local storage and dispatch action to set it in Redux store
    const userRoleFromLocalStorage = localStorage.getItem("userRole");
    if (userRoleFromLocalStorage) {
      store.dispatch(setUserRole(userRoleFromLocalStorage));
    }
  }

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
        refresh: refreshToken,
      });
      if (res.data && res.data.access) {
        localStorage.setItem("accessToken", res.data.access);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      clearTokensAndRedirect();
    }
  };

  return (
    <>
      <Provider store={store}>
        <Toaster position="bottom-left" /> {/* Add Toaster here */}
        <Navbar />
        <div>
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
