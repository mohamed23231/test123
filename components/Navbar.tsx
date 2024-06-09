import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { setUserRole } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector
import CartIcon from "./card/cardIcon";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "@configs/envs";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const notify = (message: string) => toast.success(`${message}`);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const logoSrc =
    userInfo && userInfo.logo !== null && userInfo.logo !== "null"
      ? userInfo.logo
      : "/client.jpg";

  useEffect(() => {
    // Check if localStorage is available (executing in the browser)
    if (typeof window !== "undefined") {
      // Access localStorage and update isLoggedIn state accordingly
      setIsLoggedIn(localStorage.getItem("accessToken") ? true : false); // need to add although expiration date Verification
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userRole = useSelector((state: any) => state.user.userRole);
  console.log(userRole, "blabla");
  useEffect(() => {
    setRole(userRole);
  }, [userRole]);
  console.log("role is from nav", role);
  // State to track user login status

  const handleLogout = () => {
    // Check if localStorage is available (executing in the browser)
    if (typeof window !== "undefined") {
      // Remove tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("userRole");
      localStorage.removeItem("cart");
      // Update isLoggedIn state
      setIsLoggedIn(false); // Set isLoggedIn to false
      // Redirect to home page
      dispatch(setUserRole(""));

      router.push("/auth/login");
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleOpenUserMenu called"); // Add this line for debugging

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.get(`${API_BASE_URL}/accounts`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo(res.data);
    } catch (error) {
      notify("there's an issue ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userRole) {
      fetchUserInfo();
    }
  }, [userRole]);

  console.log(userInfo);
  return (
    <AppBar position="static" color="inherit">
      <Container className="custom-container" maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Link className="w-28 h-full" href={"/"}>
            <span>
              <svg
                className="object-contain"
                width="90"
                height="64"
                viewBox="0 0 186 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8759 11.4895C18.3681 10.5585 17.6698 9.84962 16.7811 9.36294C15.8924 8.87627 14.8555 8.63293 13.6706 8.63293C12.3587 8.63293 11.1949 8.92917 10.1792 9.52164C9.16352 10.1141 8.37003 10.9605 7.79872 12.0608C7.2274 13.1611 6.94174 14.4307 6.94174 15.8696C6.94174 17.3508 7.2274 18.6415 7.79872 19.7418C8.39119 20.8422 9.20584 21.6886 10.2427 22.281C11.2795 22.8735 12.4856 23.1697 13.861 23.1697C15.5538 23.1697 16.9398 22.7254 18.0189 21.8367C19.0981 20.9268 19.8069 19.6678 20.1455 18.0596H12.5279V14.6635H24.5256V18.5357C24.2293 20.0804 23.5945 21.5087 22.6212 22.8206C21.6478 24.1325 20.3888 25.1905 18.8442 25.9946C17.3206 26.7775 15.6067 27.169 13.7023 27.169C11.5652 27.169 9.62904 26.6929 7.89393 25.7407C6.17999 24.7673 4.82576 23.4237 3.83124 21.7097C2.85789 19.9958 2.37121 18.0491 2.37121 15.8696C2.37121 13.6901 2.85789 11.7434 3.83124 10.0295C4.82576 8.29437 6.17999 6.95072 7.89393 5.99853C9.62904 5.02518 11.5546 4.5385 13.6706 4.5385C16.1674 4.5385 18.3363 5.15213 20.1772 6.37941C22.0181 7.58552 23.2877 9.28888 23.986 11.4895H18.8759ZM38.0968 27.2007C36.0231 27.2007 34.1188 26.714 32.3836 25.7407C30.6485 24.7673 29.2731 23.4237 28.2575 21.7097C27.2418 19.9746 26.734 18.0173 26.734 15.8379C26.734 13.6796 27.2418 11.7434 28.2575 10.0295C29.2731 8.29437 30.6485 6.94014 32.3836 5.96679C34.1188 4.99344 36.0231 4.50676 38.0968 4.50676C40.1916 4.50676 42.096 4.99344 43.81 5.96679C45.5451 6.94014 46.9099 8.29437 47.9044 10.0295C48.9201 11.7434 49.4279 13.6796 49.4279 15.8379C49.4279 18.0173 48.9201 19.9746 47.9044 21.7097C46.9099 23.4237 45.5451 24.7673 43.81 25.7407C42.0749 26.714 40.1705 27.2007 38.0968 27.2007ZM38.0968 23.2332C39.4299 23.2332 40.6042 22.937 41.6199 22.3445C42.6356 21.7309 43.4291 20.8633 44.0004 19.7418C44.5717 18.6204 44.8574 17.319 44.8574 15.8379C44.8574 14.3567 44.5717 13.0659 44.0004 11.9656C43.4291 10.8441 42.6356 9.98716 41.6199 9.39468C40.6042 8.80221 39.4299 8.50597 38.0968 8.50597C36.7637 8.50597 35.5788 8.80221 34.5419 9.39468C33.5263 9.98716 32.7328 10.8441 32.1615 11.9656C31.5902 13.0659 31.3045 14.3567 31.3045 15.8379C31.3045 17.319 31.5902 18.6204 32.1615 19.7418C32.7328 20.8633 33.5263 21.7309 34.5419 22.3445C35.5788 22.937 36.7637 23.2332 38.0968 23.2332ZM75.3732 4.82416V8.41075H69.4696V26.9785H65.026V8.41075H59.1224V4.82416H75.3732ZM83.0589 12.1243C83.6302 11.1933 84.3708 10.4633 85.2807 9.93426C86.2117 9.40526 87.2697 9.14077 88.4547 9.14077V13.8065H87.2803C85.8838 13.8065 84.8258 14.1345 84.1063 14.7904C83.408 15.4464 83.0589 16.589 83.0589 18.2183V26.9785H78.6153V9.39468H83.0589V12.1243ZM93.7012 7.29986C92.9182 7.29986 92.2623 7.05652 91.7333 6.56985C91.2255 6.06201 90.9715 5.43779 90.9715 4.6972C90.9715 3.9566 91.2255 3.34297 91.7333 2.85629C92.2623 2.34846 92.9182 2.09454 93.7012 2.09454C94.4841 2.09454 95.1294 2.34846 95.6373 2.85629C96.1663 3.34297 96.4308 3.9566 96.4308 4.6972C96.4308 5.43779 96.1663 6.06201 95.6373 6.56985C95.1294 7.05652 94.4841 7.29986 93.7012 7.29986ZM95.8912 9.39468V26.9785H91.4476V9.39468H95.8912ZM104.725 11.9339C105.296 11.1298 106.079 10.4633 107.074 9.93426C108.089 9.3841 109.243 9.10903 110.533 9.10903C112.036 9.10903 113.39 9.47932 114.596 10.2199C115.823 10.9605 116.786 12.0185 117.484 13.3939C118.204 14.7481 118.564 16.3245 118.564 18.1231C118.564 19.9217 118.204 21.5193 117.484 22.9158C116.786 24.2912 115.823 25.3598 114.596 26.1215C113.39 26.8833 112.036 27.2642 110.533 27.2642C109.243 27.2642 108.1 26.9997 107.106 26.4707C106.132 25.9417 105.339 25.2751 104.725 24.4711V35.3578H100.281V9.39468H104.725V11.9339ZM114.025 18.1231C114.025 17.0651 113.803 16.1553 113.358 15.3935C112.935 14.6106 112.364 14.0181 111.644 13.6161C110.946 13.214 110.184 13.013 109.359 13.013C108.555 13.013 107.793 13.2246 107.074 13.6478C106.375 14.0498 105.804 14.6423 105.36 15.4252C104.937 16.2082 104.725 17.1286 104.725 18.1866C104.725 19.2446 104.937 20.165 105.36 20.948C105.804 21.7309 106.375 22.3339 107.074 22.7571C107.793 23.1592 108.555 23.3602 109.359 23.3602C110.184 23.3602 110.946 23.1486 111.644 22.7254C112.364 22.3022 112.935 21.6991 113.358 20.9162C113.803 20.1333 114.025 19.2023 114.025 18.1231Z"
                  fill="#1A2430"
                />
                <path
                  d="M31.9967 48.7173C31.1525 48.7173 30.5081 48.0508 30.5081 47.162C30.5081 46.2733 31.1525 45.629 31.9967 45.629C32.841 45.629 33.4853 46.2733 33.4853 47.162C33.4853 48.0508 32.841 48.7173 31.9967 48.7173ZM48.4379 56.4713C48.7712 56.4713 48.8823 56.9157 48.8823 57.6489C48.8823 58.3821 48.7712 58.8486 48.4379 58.8486H47.3048C44.6831 58.8486 43.3278 57.8044 42.9501 55.6715C42.2836 55.8714 41.5504 55.9825 40.7506 55.9825C40.1285 55.9825 39.5508 55.9159 38.9954 55.7826V55.8714C38.9954 60.0484 36.4625 63.4255 32.0856 63.4255C27.7087 63.4255 25.1759 60.0484 25.1759 55.9159C25.1759 54.6939 25.4203 53.3386 25.7757 52.1166L28.0864 53.272C27.8642 54.2273 27.7309 55.1827 27.7309 55.9825C27.7309 58.9597 29.4417 61.0482 32.0856 61.0482C34.7295 61.0482 36.4403 58.9819 36.4403 55.9825C36.4403 54.605 36.0848 52.7609 35.5294 51.4501L37.7956 50.2503C38.2177 51.1613 38.5288 52.2499 38.751 53.3386C39.3731 53.5164 40.0396 53.6052 40.7506 53.6052C41.506 53.6052 42.2169 53.4941 42.8613 53.3164V49.3616H45.4163V54.3384C45.4163 55.8492 45.8607 56.4713 47.5048 56.4713H48.4379ZM42.4169 60.5594C43.1945 60.5594 43.7722 61.1371 43.7722 61.9591C43.7722 62.759 43.1945 63.3589 42.4169 63.3589C41.6615 63.3589 41.0616 62.759 41.0616 61.9591C41.0616 61.1371 41.6615 60.5594 42.4169 60.5594ZM45.9273 60.5594C46.7049 60.5594 47.2826 61.1371 47.2826 61.9591C47.2826 62.759 46.7049 63.3589 45.9273 63.3589C45.1719 63.3589 44.572 62.759 44.572 61.9591C44.572 61.1371 45.1719 60.5594 45.9273 60.5594ZM50.1468 42.3852H52.7019V58.8486H48.436C48.1028 58.8486 47.9917 58.3821 47.9917 57.6489C47.9917 56.9157 48.1028 56.4713 48.436 56.4713H50.1468V42.3852ZM66.4205 48.9173L66.5538 48.9617V58.8931C66.5538 62.0258 64.7542 63.8476 61.7992 63.8921L61.3993 61.4926C63.2211 61.6036 63.9988 60.8482 63.9988 58.8931V58.4709C63.1989 58.7153 62.3102 58.8486 61.5326 58.8486C58.1555 58.8486 55.3782 56.338 55.3782 53.1164C55.3782 49.9171 58.1555 47.3842 61.5326 47.3842C63.0878 47.3842 64.9763 47.9841 66.4205 48.9173ZM61.5992 56.4713C62.4435 56.4713 63.2878 56.2269 63.9988 55.9159V50.3392C63.2656 50.0059 62.4657 49.7615 61.5992 49.7615C59.4441 49.7615 57.9333 51.2946 57.9333 53.1164C57.9333 54.9605 59.4441 56.4713 61.5992 56.4713ZM75.0752 56.4713C75.4085 56.4713 75.5196 56.9157 75.5196 57.6489C75.5196 58.3821 75.4085 58.8486 75.0752 58.8486H69.8762V42.3852H72.4313V56.4713H75.0752ZM81.2122 45.4735C80.4568 45.4735 79.8569 44.8736 79.8569 44.0738C79.8569 43.2517 80.4568 42.674 81.2122 42.674C81.9898 42.674 82.5675 43.2517 82.5675 44.0738C82.5675 44.8736 81.9898 45.4735 81.2122 45.4735ZM84.7226 45.4735C83.9672 45.4735 83.3673 44.8736 83.3673 44.0738C83.3673 43.2517 83.9672 42.674 84.7226 42.674C85.5002 42.674 86.0779 43.2517 86.0779 44.0738C86.0779 44.8736 85.5002 45.4735 84.7226 45.4735ZM90.0771 56.4713C90.4104 56.4713 90.5215 56.9157 90.5215 57.6489C90.5215 58.3821 90.4104 58.8486 90.0771 58.8486H75.0801C74.7468 58.8486 74.6357 58.3821 74.6357 57.6489C74.6357 56.9157 74.7468 56.4713 75.0801 56.4713H77.7684C77.1463 55.5826 76.7686 54.4939 76.7686 53.272C76.7686 49.8726 79.5236 47.3842 82.9452 47.3842C84.6115 47.3842 86.2779 47.9841 87.5221 48.6062V56.4713H90.0771ZM79.3237 53.2497C79.3237 54.8716 80.3235 56.0936 81.9232 56.4713H84.967V50.117C84.1894 49.8726 83.5451 49.7615 82.9674 49.7615C80.8567 49.7615 79.3237 51.2501 79.3237 53.2497ZM106.803 56.4713C107.136 56.4713 107.247 56.9157 107.247 57.6489C107.247 58.3821 107.136 58.8486 106.803 58.8486H106.647C105.203 58.8486 104.048 58.4265 103.226 57.6933C101.204 58.4931 98.9599 58.8486 97.3602 58.8486C96.1827 58.8486 94.783 58.6487 93.2055 57.9377C92.4945 58.5154 91.5392 58.8486 90.3838 58.8486H90.0728C89.7395 58.8486 89.6284 58.3821 89.6284 57.6489C89.6284 56.9157 89.7395 56.4713 90.0728 56.4713H90.3838C91.317 56.4713 91.8724 56.0492 92.0279 55.0272C92.2279 53.7607 92.3834 47.0287 97.0047 47.0287C100.337 47.0287 103.292 50.5614 103.781 55.3604C104.181 56.0714 104.914 56.4713 105.959 56.4713H106.803ZM94.4941 55.827C95.4495 56.2714 96.3382 56.4713 97.3824 56.4713C98.56 56.4713 99.9597 56.2269 101.271 55.827C100.937 52.3388 98.9599 49.4061 97.1158 49.4061C94.8052 49.4061 94.8274 53.9829 94.5608 55.4937L94.4941 55.827ZM113.555 56.4713C113.889 56.4713 114 56.9157 114 57.6489C114 58.3821 113.889 58.8486 113.555 58.8486H106.801C106.468 58.8486 106.357 58.3821 106.357 57.6489C106.357 56.9157 106.468 56.4713 106.801 56.4713H108.512V42.3852H111.067V56.4713H113.555ZM115.26 42.3852H117.815V58.8486H113.549C113.216 58.8486 113.105 58.3821 113.105 57.6489C113.105 56.9157 113.216 56.4713 113.549 56.4713H115.26V42.3852Z"
                  fill="#415A77"
                />
                <path
                  d="M159.09 63.1103C156.214 60.3707 150.151 54.5449 144.813 49.0851C138.762 42.897 132.855 36.0939 132.855 26.9878C132.855 12.5021 144.64 0.716797 159.126 0.716797C173.612 0.716797 185.397 12.5021 185.397 26.9878C185.397 35.3471 179.638 41.5825 174.069 47.6123C173.281 48.4651 172.465 49.3474 171.693 50.2106C168.902 53.3276 162.211 60.0121 159.09 63.1103Z"
                  fill="#40B491"
                />
                <path
                  d="M184.035 18.6334C183.697 17.6279 183.299 16.6493 182.847 15.7021C182.846 15.7015 182.846 15.7012 182.846 15.7012L175.925 16.6872C175.925 16.6872 161.784 32.1807 158.084 33.2196C154.386 34.2585 139.932 37.5656 139.932 37.5656L135.704 37.645C136.197 38.5533 136.741 39.4378 137.325 40.302C140.379 40.8526 151.815 42.3513 160.199 35.8685C171.2 27.3636 174.881 22.3033 184.035 18.6334Z"
                  fill="#7FCDB5"
                />
                <path
                  d="M132.855 26.9872C132.855 31.1286 134.079 34.7926 135.981 38.1402C135.981 38.1402 149.875 41.4067 159.633 33.862C171.191 24.9253 173.069 20.4548 183.315 16.7382C183.2 16.4697 183.081 16.2045 182.958 15.9408C182.937 15.8935 182.914 15.8468 182.892 15.7998C182.642 15.2712 182.375 14.7524 182.092 14.2434C182.066 14.197 182.04 14.1513 182.014 14.1052C181.729 13.5991 181.427 13.1043 181.109 12.6198C181.08 12.5748 181.05 12.5297 181.02 12.4846C180.7 12.0037 180.365 11.5336 180.016 11.0757C179.982 11.032 179.949 10.9875 179.914 10.9444C179.563 10.4895 179.196 10.0465 178.816 9.61594C178.778 9.57379 178.741 9.53098 178.703 9.48883C178.321 9.06211 177.926 8.64804 177.518 8.24726C177.475 8.20608 177.433 8.1649 177.391 8.12405C177.185 7.92463 176.977 7.72684 176.764 7.53423C176.554 7.34389 176.34 7.15777 176.124 6.97392C176.078 6.93468 176.032 6.89545 175.985 6.85654C175.766 6.67301 175.545 6.49143 175.319 6.31471C175.318 6.31406 175.318 6.31309 175.317 6.31277C175.095 6.13864 174.869 5.96906 174.642 5.80239C174.592 5.7651 174.541 5.72814 174.49 5.69149C174.259 5.52418 174.026 5.35978 173.789 5.1996C173.787 5.19831 173.785 5.19701 173.783 5.19539C173.55 5.03877 173.315 4.8867 173.077 4.73722C173.022 4.70284 172.967 4.66848 172.912 4.63443C172.67 4.48398 172.426 4.33709 172.18 4.19506C172.176 4.19344 172.173 4.1915 172.169 4.18955C171.927 4.05012 171.681 3.91588 171.434 3.78391C171.375 3.75278 171.317 3.72165 171.258 3.69117C171.006 3.5592 170.751 3.42983 170.494 3.30596C170.491 3.30402 170.486 3.30207 170.483 3.30077C170.231 3.17918 169.976 3.06277 169.72 2.94928C169.656 2.92172 169.594 2.89416 169.531 2.86692C169.269 2.75343 169.007 2.64286 168.74 2.53813C168.736 2.53586 168.732 2.53456 168.727 2.53262C168.466 2.42983 168.203 2.33255 167.937 2.23787C167.871 2.21452 167.805 2.19053 167.739 2.16783C167.469 2.07347 167.196 1.98236 166.922 1.89675C166.917 1.89546 166.913 1.89416 166.909 1.89254C166.639 1.80856 166.367 1.73074 166.094 1.65551C166.024 1.63638 165.956 1.6179 165.887 1.59974C165.608 1.52548 165.328 1.45382 165.045 1.38865C165.042 1.388 165.039 1.38703 165.035 1.38605C164.757 1.32218 164.475 1.26349 164.193 1.20804C164.122 1.19442 164.051 1.18048 163.98 1.16718C163.694 1.11368 163.406 1.06277 163.117 1.01835C163.114 1.01803 163.112 1.0177 163.109 1.01738C162.822 0.973602 162.534 0.93599 162.244 0.901944C162.171 0.893189 162.098 0.884433 162.025 0.876327C161.731 0.844226 161.437 0.815366 161.141 0.792344C161.14 0.79202 161.137 0.79202 161.136 0.79202C160.842 0.769647 160.547 0.754083 160.25 0.741437C160.176 0.738195 160.1 0.735276 160.025 0.733006C159.726 0.722954 159.426 0.71582 159.125 0.71582C156.245 0.71582 153.388 1.21128 150.655 2.11692C140.313 5.64999 132.855 15.4642 132.855 26.9872Z"
                  fill="#40B491"
                />
                <path
                  d="M166.441 41.6006C153.436 49.7241 140.688 44.6466 140.688 44.6466V44.647C140.691 44.6502 140.693 44.6535 140.696 44.6564C141.352 45.4155 142.028 46.1616 142.714 46.8966C142.717 46.8992 142.72 46.9018 142.722 46.9048C143.062 47.2679 143.404 47.6282 143.747 47.9868C143.753 47.9933 143.759 47.9988 143.765 48.0053C143.771 48.0111 143.777 48.0176 143.783 48.0241C144.125 48.3804 144.468 48.7342 144.812 49.0857C150.151 54.5455 156.213 60.3713 159.089 63.111C162.21 60.0127 168.902 53.3282 171.693 50.2112C172.465 49.348 173.281 48.4657 174.068 47.6129C177.436 43.967 180.871 40.2446 183.062 36.0244C179.601 36.231 173.27 37.3354 166.441 41.6006Z"
                  fill="#2D8067"
                />
                <path
                  d="M144.812 49.0847C150.15 54.5445 156.213 60.3703 159.089 63.11C162.21 60.0117 168.902 53.3272 171.693 50.2102C172.465 49.347 173.281 48.4647 174.068 47.6119C175.188 46.3989 176.315 45.1774 177.402 43.9326C173.917 44.266 169.986 45.2244 165.671 46.5798C147.865 52.1713 140.687 44.6453 140.687 44.6453L142.421 46.5798C143.207 47.4281 144.008 48.2621 144.812 49.0847Z"
                  fill="#7FCDB5"
                />
                <path
                  d="M140.688 44.645L142.421 46.5795C143.207 47.4277 144.008 48.2617 144.812 49.0844C144.817 49.0895 144.822 49.0944 144.828 49.1002C148.65 50.6868 155.444 51.9342 165.915 48.6463C169.274 47.5912 172.4 46.7783 175.264 46.312C175.985 45.5257 176.702 44.7345 177.403 43.9326C173.917 44.266 169.986 45.2244 165.672 46.5798C147.865 52.1709 140.688 44.645 140.688 44.645Z"
                  fill="#7FCDB5"
                />
                <path
                  d="M182.957 15.9401C182.936 15.8928 182.914 15.8461 182.892 15.7991C182.642 15.2705 182.375 14.7517 182.092 14.2427C182.066 14.1963 182.04 14.1506 182.014 14.1045C181.729 13.5984 181.427 13.1036 181.109 12.6191C181.079 12.574 181.049 12.529 181.02 12.4839C180.7 12.003 180.365 11.5329 180.015 11.075C179.981 11.0313 179.948 10.9868 179.914 10.9437C179.562 10.4888 179.195 10.0458 178.815 9.61523C178.762 9.61523 169.681 13.85 160.406 26.5967C150.438 40.2955 135.98 38.1395 135.98 38.1395C135.98 38.1395 149.875 41.406 159.632 33.8613C171.19 24.9246 173.069 20.4541 183.314 16.7375C183.2 16.469 183.08 16.2037 182.957 15.9401Z"
                  fill="#66C3A7"
                />
                <path
                  d="M160.141 62.0634C160.229 61.9759 160.317 61.8886 160.407 61.7982C160.42 61.7862 160.432 61.7735 160.444 61.7615C160.612 61.5949 160.786 61.4214 160.963 61.2453C161.065 61.1422 161.169 61.0388 161.274 60.9331C161.328 60.8799 161.383 60.8254 161.436 60.7716C161.593 60.6146 161.753 60.4554 161.915 60.2933C161.928 60.28 161.941 60.2667 161.955 60.2528C162.142 60.066 162.332 59.8753 162.525 59.6821C162.547 59.66 162.569 59.6377 162.59 59.6156C165.047 57.1513 167.897 54.2622 169.987 52.0527C170.007 52.0313 170.029 52.0083 170.049 51.9875C170.151 51.8779 170.335 51.6831 170.356 51.6607C170.357 51.6594 170.362 51.6555 170.363 51.6526C170.865 51.1189 171.315 50.6305 171.693 50.2093C172.184 49.6597 172.693 49.1036 173.201 48.5508C173.201 48.5521 173.201 48.5521 173.201 48.5521C161.876 58.3137 150.028 54.3196 150.016 54.3102H150.017C150.017 54.3108 150.018 54.3115 150.018 54.3121C152.595 56.8277 157.637 61.7249 159.089 63.1094C159.369 62.8322 159.677 62.5255 160.008 62.1964C160.052 62.1523 160.096 62.1085 160.141 62.0634Z"
                  fill="#66C3A7"
                />
                <path
                  d="M173.775 5.18955C173.545 5.03456 173.312 4.88507 173.078 4.73721C173.023 4.70284 172.968 4.66847 172.913 4.63443C172.671 4.48397 172.427 4.33709 172.181 4.19506C172.177 4.19344 172.173 4.1915 172.17 4.18955C171.928 4.05012 171.681 3.91588 171.434 3.78391C171.375 3.75278 171.317 3.72165 171.258 3.69117C171.006 3.5592 170.752 3.42982 170.495 3.30596C170.491 3.30401 170.487 3.30207 170.484 3.30077C170.232 3.17918 169.977 3.06277 169.72 2.94928C169.657 2.92172 169.595 2.89416 169.532 2.86692C169.27 2.75343 169.007 2.64286 168.741 2.53812C168.737 2.53586 168.732 2.53456 168.728 2.53261C168.467 2.42982 168.204 2.33255 167.937 2.23787C167.872 2.21452 167.806 2.19053 167.74 2.16783C167.469 2.07347 167.197 1.98235 166.923 1.89675C166.918 1.89546 166.913 1.89416 166.909 1.89254C166.64 1.80855 166.367 1.73073 166.094 1.65551C166.025 1.63638 165.957 1.61789 165.888 1.59974C165.609 1.52548 165.328 1.45382 165.046 1.38865C165.043 1.388 165.039 1.38702 165.035 1.38605C164.757 1.32217 164.476 1.26348 164.194 1.20804C164.123 1.19442 164.052 1.18048 163.981 1.16718C163.694 1.11368 163.407 1.06277 163.118 1.01835C163.115 1.01802 163.112 1.0177 163.11 1.01737C162.823 0.9736 162.534 0.935988 162.245 0.901941C162.172 0.893186 162.098 0.884431 162.026 0.876324C161.732 0.844223 161.438 0.815366 161.142 0.792344C161.141 0.79202 161.138 0.792018 161.137 0.792018C160.843 0.769644 160.547 0.754081 160.251 0.741435C160.176 0.738192 160.101 0.735274 160.026 0.733004C159.727 0.722952 159.427 0.71582 159.126 0.71582C156.246 0.71582 153.388 1.21128 150.656 2.11692C140.313 5.64934 132.854 15.4635 132.854 26.9865C132.854 30.2677 133.625 33.2488 134.89 36.0105C134.195 33.8883 133.796 31.6409 133.796 29.2378C133.796 14.2259 146.01 2.01186 161.023 2.01186C165.628 2.01251 169.968 3.16329 173.775 5.18955Z"
                  fill="#7FCDB5"
                />
              </svg>
            </span>
          </Link>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          {(role && role == "manager") || role == "company" ? (
            <div className="hidden  md:flex">
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  className={`link ${
                    pathname === "/"
                      ? "text-green-600 border rounded-full border-transparent	 bg-green-50 px-5 py-2.5"
                      : ""
                  } text-gray-500`}
                  href={"/"}
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                    textAlign="center"
                    className="flex items-center"
                    // style={{ color: "#677B92" }}
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="ml-1">Companies</span>
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href={"/order/myorders"}
                  className={`link ${
                    pathname === "/order/myorders"
                      ? "text-green-600 border rounded-full border-transparent	 bg-green-50 px-5 py-2.5"
                      : ""
                  } text-gray-500`}
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                    textAlign="center"
                    className="flex items-center"
                    // style={{ color: "#677B92" }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className="ml-1">Orders</span>
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href={"/order/sales"}
                  className={`link ${
                    pathname === "/order/sales"
                      ? "text-green-600 border rounded-full border-transparent	flex items-center justify-center bg-green-50 px-5 py-2.5"
                      : ""
                  } text-gray-500`}
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                    textAlign="center"
                    className="flex justify-center items-center"
                    // style={{ color: "#677B92" }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className="ml-1">Sales</span>
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href={"/account/company/employees"}
                  className={` ${
                    pathname === "/account/company/employees"
                      ? "text-green-600 border rounded-full border-transparent	flex items-center justify-center bg-green-50 px-5 py-2.5"
                      : ""
                  } text-gray-500`}
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                    textAlign="center"
                    className="flex items-center"
                    // style={{ color: "#677B92" }}
                  >
                    <FontAwesomeIcon icon={faUser} />

                    <span className="ml-1">Employees</span>
                  </Typography>
                </Link>
              </MenuItem>
            </div>
          ) : null}
          {!role ? (
            <>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key={"signup"} onClick={handleCloseNavMenu}>
                  <Link href={"/auth/signup"}>
                    <Typography textAlign="center">Register</Typography>
                  </Link>
                </MenuItem>

                <MenuItem key={"login"} onClick={handleCloseNavMenu}>
                  <Link href={"/auth/login"}>
                    <Typography textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : null}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {!role ? (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            ) : null}
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* <Link href={"/"}>GoTrip</Link> */}
          </Typography>
          {!role ? (
            <>
              <Box
                className="	d-flex justify-end	"
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                <Button
                  style={{ color: "#677B92" }}
                  key={"signup"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link href={`/auth/signup`}>Register</Link>
                </Button>

                <Button
                  style={{ color: "#677B92" }}
                  key={"login"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link href={`/auth/login`}>Login</Link>
                </Button>
              </Box>
            </>
          ) : null}
          {role ? (
            <>
              {role !== "driver" ? (
                <Link
                  href={`/card`}
                  className={`link ${
                    pathname === "/card"
                      ? "text-green-600 border rounded-full border-transparent	flex items-center justify-center bg-green-50 px-5 py-2.5"
                      : ""
                  } text-gray-500`}
                >
                  <MenuItem key={"home"} onClick={handleCloseUserMenu}>
                    <Typography
                      sx={{
                        display: { xs: "none", md: "flex" },
                      }}
                      textAlign="center"
                      className="flex justify-center items-center"
                    >
                      <CartIcon />
                      <span className="ml-1">Card</span>
                    </Typography>
                  </MenuItem>
                </Link>
              ) : null}
              <Box sx={{ flexGrow: 0 }} className="ml-auto	">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      className="object-contain"
                      alt="Remy Sharp"
                      // src={` "/client.jpg"}`}
                      src={logoSrc}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link href={`/`}>
                    <MenuItem key={"home"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                  </Link>
                  {userRole == "company" && (
                    <Link className="md:hidden block" href={`/order/myorders`}>
                      <MenuItem key={"Companies"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Orders</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole == "company" && (
                    <Link className="md:hidden block" href={`/order/sales`}>
                      <MenuItem key={"Companies"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Sales</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole == "company" && (
                    <Link
                      className="md:hidden block"
                      href={`/account/company/employees`}
                    >
                      <MenuItem key={"Companies"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Employees</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {/* {userRole == "company" && (
                    <Link className="md:hidden block" href={`/`}>
                      <MenuItem key={"Companies"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Companies</Typography>
                      </MenuItem>
                    </Link>
                  )}
 */}
                  {/* <Link href={`/card`}>
                    <MenuItem key={"home"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <CartIcon />
                      </Typography>
                    </MenuItem>
                  </Link> */}
                  <Link href={`/account/profile`}>
                    <MenuItem key={"progile"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  {userRole == "company" && (
                    <Link href={`/account/myservices`}>
                      <MenuItem
                        key={"myServices"}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">My Services</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole == "company" && (
                    <Link href={`/account/address`}>
                      <MenuItem
                        key={"addServices"}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">Locations</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {/* {userRole == "company" && (
                    <Link href={`/account/company/employees`}>
                      <MenuItem
                        key={"companyEmployees"}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          Company Employees
                        </Typography>
                      </MenuItem>
                    </Link>
                  )} */}
                  {userRole == "company" && (
                    <Link href={`/account/company/vehicles`}>
                      <MenuItem key={"vehicles"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Vehicles</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole == "driver" && (
                    <Link href={`/trips/drivertrips`}>
                      <MenuItem key={"trips"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">My Trips</Typography>
                      </MenuItem>
                    </Link>
                  )}

                  {/* {userRole == "company" && (
                    <Link href={`/order/sales`}>
                      <MenuItem key={"saled"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          company Sales
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole == "company" && (
                    <Link href={`/order/myorders`}>
                      <MenuItem key={"saled"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          company Orders
                        </Typography>
                      </MenuItem>
                    </Link>
                  )} */}
                  <MenuItem key={"logout"} onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
