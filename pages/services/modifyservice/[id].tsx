import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@configs/envs";
import { Service } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
import { AccountServiceSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountServiceSchemaInterface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountServiceSchema } from "@zod_schemas/accountServiceSchema";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import EditeService from "@components/account/Service/EditeService";

const EditeServicePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AccountServiceSchemaInterface>({
    resolver: zodResolver(accountServiceSchema),
  });
  const formErrorHandler =
    useFormErrorHandler<AccountServiceSchemaInterface>(setError);

  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<Service | null>(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/logistics/services/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setService(response.data);
        setValue("title", response.data.title);
        setValue("description", response.data.description);
        setValue("unit", response.data.unit);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching service details:", error);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const EditeServiceDataHandler = async (
    data: AccountServiceSchemaInterface
  ) => {
    try {
      setIsLoading(true);
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const res = await axios.patch(
        `${API_BASE_URL}/logistics/services/${id}/`,
        {
          title: data.title,
          description: data.description,
          unit: data.unit,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      router.push("/account/myservices");
    } catch (error: any) {
      console.log("error from account service", error);
      formErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(id);
  return (
    <div>
      {service ? (
        <EditeService
          EditeServiceDataHandler={EditeServiceDataHandler}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoading={isLoading}
          service={service}
        />
      ) : (
        // <div>
        //   <h1>{service.name}</h1>
        //   <p>{service.description}</p>
        //   {/* Render other details of the service */}
        // </div>
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditeServicePage;
