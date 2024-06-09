import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "@zod_schemas/addVehicleSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { VehicleSchemaInterface } from "@app_types/interfaces/forms_schemas/VehicleSchemaInterface";
import AddVehicle from "@components/account/Company/AddVehicle";
import { toast } from "react-hot-toast";

const Addvehicle = () => {
  const notifySuccess = (message: string) => toast.success(`${message}`);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleSchemaInterface>({
    resolver: zodResolver(vehicleSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<VehicleSchemaInterface>(setError);

  async function addVehicleHandler(data: VehicleSchemaInterface) {
    console.log(data);
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.post(
        `${API_BASE_URL}/logistics/vehicles/`,
        {
          plate_number: data.plate_number,
          type: data.type,
          model: data.model,
          examination_date: data.examination_date,
          application_date: data.application_date,
          insurance_date: data.insurance_date,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      notifySuccess("vehicle Added");
      console.log(res.data);

      router.push("/account/company/vehicles");
    } catch (error) {
      console.error("error from account info", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AddVehicle
        errors={errors}
        register={register}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        addVehicleHandler={addVehicleHandler}
      />
    </>

    // <AddEmplyees
    //   errors={errors}
    //   register={register}
    //   isLoading={isLoading}
    //   handleSubmit={handleSubmit}
    //   accountInfoSubmitHandler={accountInfoSubmitHandler}
    // />
  );
};

export default Addvehicle;
