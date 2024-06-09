// pages/service/[id].tsx
////////////////////////////////////////////////////////////Not Working Now//////////////////////////////////////
////////////////////////////////////////////////////////////Not Working Now//////////////////////////////////////
////////////////////////////////////////////////////////////Not Working Now//////////////////////////////////////
////////////////////////////////////////////////////////////Not Working Now//////////////////////////////////////
////////////////////////////////////////////////////////////Not Working Now//////////////////////////////////////
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "@configs/envs";
// import { Service } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Grid,
//   Paper,
// } from "@mui/material";

// const ServiceDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [service, setService] = useState<Service | null>(null);
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchServiceDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/accounts/services/${id}`,
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         setService(response.data);
//       } catch (error) {
//         console.log("Error fetching service details:", error);
//       }
//     };

//     if (id) {
//       fetchServiceDetails();
//     }
//   }, [id]);

//   console.log(id);
//   return (
//     <Container maxWidth="md">
//       {service ? (
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="h2" gutterBottom align="center">
//                 {service.name}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Description:</strong> {service.description}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Unit:</strong> {service.unite}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Price:</strong> {service.price}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Available:</strong> {service.available ? "Yes" : "No"}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Created At:</strong> {service.created_at}
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper>
//               <Typography variant="body1" paragraph>
//                 <strong>Updated At:</strong> {service.updated_at}
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "50px",
//           }}
//         >
//           <CircularProgress />
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ServiceDetailsPage;

import React from "react";

function ServiceDetailsPage() {
  return <div>[id]</div>;
}

export default ServiceDetailsPage;
