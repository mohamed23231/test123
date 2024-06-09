// import {
//   FieldErrors,
//   UseFormRegister,
//   UseFormHandleSubmit,
// } from "react-hook-form";
// import { Spinner } from "@nextui-org/spinner";
// import GenericFormControl from "@components/form/GenericInput";
// import { OrderInfoSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderInfoSchemaInterface";

// interface OrderInfoProp {
//   isLoading: boolean;
//   errors: FieldErrors<OrderInfoSchemaInterface>;
//   register: UseFormRegister<OrderInfoSchemaInterface>;
//   handleSubmit: UseFormHandleSubmit<OrderInfoSchemaInterface, undefined>;
//   makeOrederHandler: (data: OrderInfoSchemaInterface) => void;
//   loadingAddress: any;
// }
// const BuyService = ({
//   isLoading,
//   errors,
//   register,
//   handleSubmit,
//   makeOrederHandler,
//   loadingAddress,
// }: OrderInfoProp) => {
//   <div className="mt-20 flex justify-center items-center">
//     <form
//       noValidate
//       className="max-w-sm mx-auto grow"
//       onSubmit={handleSubmit(makeOrederHandler)}
//     >
//       <GenericFormControl<OrderInfoSchemaInterface>
//         label="Enter your the Quantity from the unite of service"
//         name="quantity"
//         placeholder="quantity"
//         type="number"
//         register={register}
//         errors={errors.quantity?.message ? [errors.quantity.message] : []}
//         valueAsNumber={false}
//       />
//       <GenericFormControl<OrderInfoSchemaInterface>
//         label="bio ..."
//         name="bio"
//         placeholder="bio"
//         type="string"
//         register={register}
//         errors={errors.bio?.message ? [errors.bio.message] : []}
//         valueAsNumber={false}
//       />
//       <div className="mb-5">
//         <label
//           htmlFor="available"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Available
//         </label>
//         <select
//           id="unloading_location"
//           {...register("unloading_location")}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         >
//           {loadingAddress?.map((address: any) => {
//             <option value={address}>{address?.name}</option>;
//           })}
//         </select>
//       </div>

//       <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2.5">
//         {isLoading ? <Spinner size="sm" color="primary" /> : "Submit"}
//       </button>
//     </form>
//   </div>;
// };

// export default BuyService;
