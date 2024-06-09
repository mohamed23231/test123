import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-hot-toast";

const useFormErrorHandler = <T extends FieldValues>(
  setError: UseFormSetError<T>
) => {
  const handleError = (error: any) => {
    if (error?.response?.data) {
      const data = error.response.data;
      console.log(data);
      Object.keys(data).forEach((key) => {
        console.log("error key", key); //
        toast.error(data[key]);
      });

      // toast.error(data);
      // if (Array.isArray(data)) {
      //   // Check if data is an array
      //   if (data.length > 1) {
      //     data.map((err: any) => {
      //       toast.error(err); // Example notification
      //     });
      //   } else {
      //     toast.error(data); // Example notification
      //   }
      // } else {
      //   console.error("Data is not an array:", data);
      //   // Handle the case where data is not an array (if needed)
      // }
      console.log(data);
      if (data.detail) return data.detail;
      Object.keys(data).map((field) => {
        setError(field as Path<T>, {
          message: data[field],
        });
      });
    }
  };

  return handleError;
};

export default useFormErrorHandler;
