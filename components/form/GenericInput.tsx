import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// import { faBuilding } from "@fortawesome/free-solid-svg-icons";

interface GenericFormControlProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  errors: string[];
  register: UseFormRegister<T>;
  valueAsNumber: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
  iconName?: IconDefinition;
  disabled?: boolean;
}

function GenericFormControl<T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  register,
  errors,
  valueAsNumber,
  defaultValue,
  iconName,
  disabled,
}: GenericFormControlProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          required
          disabled={disabled ?? false}
          id={name}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue !== undefined ? defaultValue : ""}
          {...register(name, { valueAsNumber })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
        {iconName && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            <FontAwesomeIcon
              icon={iconName}
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            />
          </div>
        )}
      </div>
      {Array.isArray(errors) ? (
        <ul className={`${errors.length > 1 ? "list-disc" : ""}`}>
          {errors.map((error, index) => (
            <li key={index} className="text-red-500 text-sm">
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default GenericFormControl;
