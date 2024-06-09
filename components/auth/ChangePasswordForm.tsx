// import { Spinner } from "@nextui-org/spinner";

// export default function ChangePasswordForm({ formData, handleChange, handleSubmit, formErrors, isLoading }) {
//     return (
//         <div className="mt-20 flex justify-center items-center">
//             <form className="max-w-sm mx-auto grow">
//                 <h2 className="font-semibold text-4xl mb-7 text-center">Change Password</h2>

//                 <div className="mb-5 ">
//                     <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
//                     <input onChange={handleChange} name="old_password" value={formData.old_password} id="old_password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Old Password" required />
//                     {formErrors?.old_password && <p className="text-red-500 text-sm">{formErrors?.old_password}</p>}
//                 </div>

//                 <div className="mb-5 ">
//                     <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
//                     <input onChange={handleChange} name="new_password" value={formData.new_password} id="new_password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required />
//                     {formErrors?.new_password && <p className="text-red-500 text-sm">{formErrors?.new_password}</p>}
//                 </div>

//                 <div className="mb-5 ">
//                     <label htmlFor="re_new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter New Password</label>
//                     <input onChange={handleChange} name="re_new_password" value={formData.re_new_password} id="re_new_password" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Re-enter New Password" required />
//                     {formErrors?.re_new_password && <p className="text-red-500 text-sm">{formErrors?.re_new_password}</p>}
//                 </div>

//                 {formErrors?.serverError && <div className="text-center border bg-red-600 text-white rounded-lg mb-5 p-3">{formErrors?.serverError}</div>}
//                 <button disabled={isLoading} onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     {isLoading ? <Spinner color="white" size="sm" /> : 'Change Password'}
//                 </button>
//             </form>
//         </div>
//     );
// }
import React from "react";

function ChangePasswordFormComponent() {
  return <div>ChangePasswordForm</div>;
}

export default ChangePasswordFormComponent;
