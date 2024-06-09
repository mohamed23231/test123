import contemplativeReptileImage from "@public/favicon.jpg";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Service } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface CardObj {
  data: any;
  children?: React.ReactNode;
}

const ServiceCard = ({ data, children }: CardObj) => {
  const router = useRouter();

  const handleCardClick = () => {
    notify();
    // router.push(`/core/companies/${data.id}`);
  };
  const notify = () => toast.error("Still under Development"); // Example notification

  console.log(data);
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="m-4	w-1/4">
        <CardActionArea onClick={handleCardClick}>
          <CardMedia
            className="w-1-6"
            component="img"
            height="70"
            image="/favicon1.jpg/"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.unit}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
        <div className="m-2">{children}</div>
      </Card>
    </>
  );
};

export default ServiceCard;
