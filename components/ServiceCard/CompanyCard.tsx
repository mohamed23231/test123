import contemplativeReptileImage from "@public/favicon.jpg";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Company } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface CardObj {
  data: Company;
  children?: React.ReactNode;
  closeMakeOrderTabHandler: any;
}
let SelectedCompany: number;
const CompanyCard = ({ data, children, closeMakeOrderTabHandler }: CardObj) => {
  const router = useRouter();
  SelectedCompany = data.id;
  const handleCardClick = () => {
    // router.push(`/core/companies/${data.id}`);
  };
  // console.log(data);
  return (
    <>
      <div
        className={`company-card w-full p-5 transition-transform duration-300 hover:translate-y-[-2px] hover:translate-x-[2px]   hover:shadow-md cursor-pointer hover:bg-green-50 `}
        onClick={() => {
          closeMakeOrderTabHandler();
        }}
      >
        <div className="company-head flex">
          <div className="company-img min-w-24 ">
            <div className="w-20 h-20 overflow-hidden">
              <img
                className="w-full h-full border rounded-full object-contain"
                src={data.logo ?? "/favicon1.jpg"}
                alt={data.organization}
              />
            </div>
          </div>
          <div className="company-img max-w-5/6">
            <h3 className="font-semibold	">{data.organization}</h3>
            <p>
              <FontAwesomeIcon
                className="text-mainColor"
                icon={faLocationDot}
              />{" "}
              {data.address}
            </p>
          </div>
        </div>
        <h4 className="my-2">{data.bio}</h4>
      </div>
      {/* <Card
        className="m-4	w-full transition-transform duration-300 hover:translate-y-[-10px] hover:translate-x-[10px] hover:shadow-md"
        // sx={{ maxWidth: 345 }}
      >
        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            className=" "
            component="img"
            height="140"
            image="/favicon1.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span>Company Name</span> : {data.organization}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span>Company Bio</span> : {data.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> */}
    </>
  );
};

export default CompanyCard;
