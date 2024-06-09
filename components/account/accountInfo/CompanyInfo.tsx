import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import GenericFormControl from "@components/form/GenericInput";
import { API_BASE_URL } from "@configs/envs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  faBuilding,
  faPhone,
  faFileLines,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";

import { EditCompanyAccount } from "@app_types/interfaces/forms_schemas/ProfileInfoInterface";
import { editCompanyAccountSchema } from "@zod_schemas/accountInfoSchema";
import Link from "next/link";

const CompanyInfo = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: File | null = event.target.files?.[0] ?? null; // Use default parameter
  //   console.log(file);
  //   setSelectedImage(file);
  //   setUploadError(null); // Clear any previous errors
  // };

  const [companyInfo, setCompanyInfo] = useState<EditCompanyAccount | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const notify = (message: string) => toast.success(`${message}`);
  const notifyIssue = () => toast.error("There's an issue with your order");

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCompanyAccount>({
    resolver: zodResolver(editCompanyAccountSchema),
  });
  const formErrorHandler = useFormErrorHandler<EditCompanyAccount>(setError);

  const fetchCompanyInfo = async () => {
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
      setCompanyInfo(res.data);
    } catch (error) {
      formErrorHandler(error);

      notifyIssue();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const onSubmit = async (data: EditCompanyAccount) => {
    console.log("data is", data);
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }
      const formData = new FormData();
      formData.append("organization", data.organization);
      formData.append("register_number", data.register_number);
      formData.append("tax_number", data.tax_number);
      formData.append("bio", data.bio);
      formData.append("phone", data.phone);
      formData.append("address", data.address);

      if (data.logo instanceof FileList) {
        console.log("ssssssssdsdsdsd");
        for (let i = 0; i < data.logo.length; i++) {
          formData.append("logo", data.logo[i]); // Append each image file with the same key
        }
      }

      await axios.put(`${API_BASE_URL}/accounts/`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      notify("your profile info changed Successfully");
      fetchCompanyInfo();
    } catch (error) {
      formErrorHandler(error);

      notifyIssue();
    } finally {
      setIsLoading(false);
    }
  };

  if (!companyInfo) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner color="success" />
      </div>
    );
  }
  return (
    <div className="main-container">
      <div className="content-header mx-2">
        <p className="font-semibold text-lg py-2">
          You can change your profile information.
        </p>
        <p className="text-sm py-2">
          Please review the information below about you and update your data.
        </p>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-containers flex flex-wrap">
          <div className="img-container w-full flex justify-start my-5 mx-2">
            <div className="w-1/4 flex">
              <div className="company-img w-1/3 flex items-center">
                {/* Check if companyInfo?.logo is a string */}
                {typeof companyInfo?.logo === "string" ? (
                  // If it's a string, use it as the src attribute
                  <img
                    className="w-full h-full border rounded-full "
                    src={companyInfo?.logo}
                    alt=""
                  />
                ) : (
                  // If it's not a string, use the fallback image
                  <img
                    className="w-full h-full border rounded-full object-contain"
                    src="/favicon-1.jpg"
                    alt=""
                  />
                )}
              </div>

              <div className="flex flex-col items-center justify-center pt-5 pb-6 w-2/3 mx-2">
                <label
                  htmlFor="logo"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-mainColor">
                      Click to upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    (MAX. 800x400px)
                  </p>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    {...register("logo")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full px-3">
            <GenericFormControl<EditCompanyAccount>
              label="Enter Organization Name"
              name="organization"
              placeholder="organization Name"
              type="email"
              register={register}
              errors={
                errors.organization?.message
                  ? [errors.organization.message]
                  : []
              }
              valueAsNumber={false}
              defaultValue={companyInfo?.organization}
              iconName={faBuilding}
            />
          </div>

          <div className="w-1/2 px-3">
            <GenericFormControl<EditCompanyAccount>
              label="Enter Register Number"
              name="register_number"
              placeholder="register number"
              type="string"
              register={register}
              errors={
                errors.register_number?.message
                  ? [errors.register_number.message]
                  : []
              }
              valueAsNumber={false}
              defaultValue={companyInfo?.register_number}
              iconName={faFileLines}
            />
          </div>
          <div className="w-1/2 px-3">
            <GenericFormControl<EditCompanyAccount>
              label="Enter phone number"
              name="phone"
              placeholder="phone"
              type="string"
              register={register}
              errors={errors.phone?.message ? [errors.phone.message] : []}
              valueAsNumber={false}
              defaultValue={companyInfo?.phone}
              iconName={faPhone}
            />
          </div>
          <div className="w-1/2 px-3">
            <GenericFormControl<EditCompanyAccount>
              label="Enter address"
              name="address"
              placeholder="address"
              type="string"
              register={register}
              errors={errors.address?.message ? [errors.address.message] : []}
              valueAsNumber={false}
              defaultValue={companyInfo?.address}
              iconName={faLocationDot}
            />
          </div>
          <div className="w-1/2 px-3">
            <GenericFormControl<EditCompanyAccount>
              label="Enter tax number"
              name="tax_number"
              placeholder="tax number"
              type="string"
              register={register}
              errors={
                errors.tax_number?.message ? [errors.tax_number.message] : []
              }
              valueAsNumber={false}
              defaultValue={companyInfo?.tax_number}
            />
          </div>
          <div className="w-full px-3 my-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note
            </label>
            <textarea
              id="message"
              rows={5}
              defaultValue={companyInfo?.bio}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your bio..."
              {...register("bio", { valueAsNumber: false })}
            ></textarea>
          </div>

          <div className="flex justify-end px-3">
            <button
              className=" mx-3 text-white bg-mainColor hover:bg-mainColor focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              {isLoading ? <Spinner size="sm" color="success" /> : "Update"}
            </button>
            <Link href={"/"}>
              <button
                className="text-white bg-mainColor hover:bg-mainColor focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyInfo;
