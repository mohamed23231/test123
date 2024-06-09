import ServiceCard from "@components/ServiceCard/ServiceCard";
import { Service } from "@app_types/interfaces/forms_schemas/MyServicesInterface";
import DeleteButton from "@components/utilities/DeleteButton";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@configs/envs";
import axios from "axios";

interface MyServicesProp {
  isLoading: boolean;
  data: Service[] | null;
  onDeleteSuccess: () => void;
  handleEditeClick: (id: any) => void;
}
const MyServices = ({
  isLoading,
  data,
  onDeleteSuccess,
  handleEditeClick,
}: MyServicesProp) => {
  const router = useRouter();

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const handleDelete = async (id: any) => {
    console.log(`clicked delete`);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.delete(
        `${API_BASE_URL}/logistics/services/${id}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onDeleteSuccess();
      console.log(response.data);
    } catch (error: any) {
      console.log("error from account info", error);
    } finally {
    }
  };

  return (
    <>
      <div className="parent flex justify-center flex-wrap w-5/6 m-auto">
        {data.map((service) => (
          <ServiceCard key={service.id} data={service}>
            {/* <button onClick={() => handleDelete(service.id)}>delete</button> */}
            <DeleteButton
              onClick={() => handleDelete(service.id)}
              onDeleteSuccess={onDeleteSuccess}
              handleEditeClick={() => {
                handleEditeClick(service.id);
              }}
              cardId={service.id}
            />
          </ServiceCard>
        ))}
      </div>
    </>
  );
};

export default MyServices;
