import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector

import {
  CompanyAccount,
  DriverAccount,
  ManagerAccount,
} from "@app_types/interfaces/forms_schemas/ProfileInfoInterface";
import CompanyInfo from "@components/account/accountInfo/CompanyInfo";

const ProfileInfo = () => {
  const userRole = useSelector((state: any) => state.user.userRole);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [companyRes, setCompanyRes] = useState<CompanyAccount | null>(null);
  const [driverRes, setDriverRes] = useState<DriverAccount | null>(null);
  const [managerRes, setManagerRes] = useState<ManagerAccount | null>(null);

  async function myAccountInfo() {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${API_BASE_URL}/accounts`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (userRole === "company") {
        setCompanyRes(response.data);
      } else if (userRole === "driver") {
        setDriverRes(response.data);
      } else if (userRole === "manager") {
        setManagerRes(response.data);
      }
      console.log(response);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditeClick = (id: any) => {
    router.push(`/services/modifyservice/${id}`);
  };

  useEffect(() => {
    myAccountInfo();
  }, []);
  console.log(userRole);
  return (
    <>
      {userRole === "company" && <CompanyInfo />}

      {userRole === "driver" && (
        <>
          {/* will add driver component info */}
          <h1>g5</h1>
        </>
      )}

      {userRole === "manager" && (
        <>
          {/* will add manager component info */}
          <h1>g5</h1>
        </>
      )}

      {/* <div className="service-btn flex justify-center mt-10">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link href={"/account/accountServices"}>
              <Typography textAlign="center">Edit Profile Info</Typography>
            </Link>
          </span>
        </button>
      </div> */}
      {/* Conditionally render the spinner */}
      {/* {isLoading ? (
        <div className="flex justify-center items-center h-screen ">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          {userRole === "driver" && driverRes && (
            <div className=" flex justify-center">
              <Card sx={{ maxWidth: 345 }} className="m-4    ">
                <CardActionArea>
                  <CardMedia
                    className="w-1-6"
                    component="img"
                    height="70"
                    image="/favicon1.jpg/"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {driverRes.first_name} {driverRes.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {driverRes.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {driverRes.address}
                    </Typography>
                    {userRole === "driver" && (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          National ID: {driverRes.national_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          License Number: {driverRes.license_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          License Expiry Date: {driverRes.license_expiry_date}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          )}

          {userRole === "manager" && managerRes && (
            <div>
              <Card sx={{ maxWidth: 345 }} className="m-4    ">
                <CardActionArea>
                  <CardMedia
                    className="w-1-6"
                    component="img"
                    height="70"
                    image="/favicon1.jpg/"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {managerRes.first_name} {managerRes.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {managerRes.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {managerRes.address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            </div>
          )}

          {userRole === "company" && companyRes && (
            <div className=" flex justify-center">
              <Card sx={{ maxWidth: 345 }} className="m-4    ">
                <CardActionArea>
                  <CardMedia
                    className="w-1-6"
                    component="img"
                    height="70"
                    image="/favicon1.jpg/"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {companyRes.organization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Register Number: {companyRes.register_number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tax Number: {companyRes.tax_number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bio: {companyRes.bio}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {companyRes.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {companyRes.address}
                    </Typography>
                    {companyRes.logo && (
                      <img src={companyRes.logo} alt="Company Logo" />
                    )}
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            </div>
          )}
        </>
      )} */}
    </>
  );
};

export default ProfileInfo;
