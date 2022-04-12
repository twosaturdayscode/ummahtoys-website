import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

export const FormInput = ({
  name,
  control,
  rules = {},
  type = "text",
  placeholder,
  errorMessage = "",
  disabled = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
    defaultValue: "",
    shouldUnregister: true,
  });
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        {...field}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className="w-full border-[0.5px] border-zinc-300 focus:ring-4 focus:ring-indigo-400 rounded self-start placeholder:font-light"
      />
      {error && (
        <span className="text-sm text-red-500 pl-2">{errorMessage}</span>
      )}
    </div>
  );
};

export const FormField = ({ children }) => (
  <div className="w-full flex gap-4">{children}</div>
);

export const FormSection = ({ title, children, className }) => (
  <div className={`w-full flex flex-col gap-3 my-2 ${className}`}>
    <div className="flex flex-col gap-1">
      <span className="text-sm text-zinc-700">{title}</span>
      <hr className="h-[0.5px]" />
    </div>
    {children}
  </div>
);

export const FormRadio = ({ name, control, options, defaultValue }) => {
  const { field } = useController({ name, control, defaultValue });
  return (
    <div className="border-[0.5px] border-zinc-300 flex flex-col gap-1 rounded">
      {options.map((option) => (
        <label
          key={option.value}
          className="p-3 w-full flex gap-3 items-center first:border-b-[0.5px] border-zinc-300 cursor-pointer"
        >
          <input
            {...field}
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            type={"radio"}
            className="focus:ring-indigo-500 peer checked:text-indigo-500"
          />
          {option.icon}
          <span className="peer-checked:text-indigo-500">{option.text}</span>
        </label>
      ))}
    </div>
  );
};

export const FormRadioWithAccordion = ({
  name,
  control,
  options,
  defaultValue,
  currentSelection,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: true,
  });
  return (
    <div className="border-[0.5px] border-zinc-300 flex flex-col gap-1 rounded">
      {options.map((option) => (
        <div
          key={option.id}
          className="border-b-[0.5px] last:border-b-0 border-zinc-300 select-none"
        >
          <label className="p-3 w-full flex gap-3 items-center peer cursor-pointer">
            <div className="w-full flex gap-3 items-center justify-between">
              <input
                {...field}
                name={name}
                value={option.value}
                defaultChecked={defaultValue === option.value}
                type={"radio"}
                className="focus:ring-indigo-500 focus:ring-2 checked:text-indigo-500 peer"
              />
              <span className="w-full peer-checked:text-indigo-500">
                {option.text}
              </span>
              <div className="flex items-center justify-end gap-2">
                {option.icons &&
                  option.icons.map((icon, i) => (
                    <span key={i} className="w-10 h-10">
                      {icon}
                    </span>
                  ))}
              </div>
            </div>
          </label>
          <div
            className={`p-3 px-8 border-t-[0.5px] bg-zinc-100 text-zinc-600 text-sm ${
              currentSelection === option.value ? "flex" : "hidden"
            }`}
          >
            {option.body}
          </div>
        </div>
      ))}
    </div>
  );
};

export const FormSelectProvincia = ({
  name,
  control,
  rules,
  errorMessage,
  defaultValue,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister: true,
  });
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://comuni-ita.herokuapp.com/api/province"
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="w-full flex flex-col gap-1">
      <select
        name={name}
        placeholder="Provincia"
        defaultValue={defaultValue}
        {...field}
        className="w-full border-[0.5px] border-zinc-300 focus:ring-4 focus:ring-indigo-400 rounded"
      >
        <option value="" disabled>
          Provincia...
        </option>
        {options &&
          options.map((option) => (
            <option key={option.sigla} value={option.nome}>
              {option.sigla}
            </option>
          ))}
      </select>
      {error && (
        <span className="text-sm text-red-500 pl-2">{errorMessage}</span>
      )}
    </div>
  );
};

export const PickupRadio = ({ name, control, options, defaultValue }) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister: true,
  });
  return (
    <div className="w-full flex flex-col gap-2">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            {...field}
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            type={"radio"}
            className="hidden peer"
          />
          <div className="w-full h-full border-2 peer-checked:border-indigo-500 peer-checked:text-indigo-500 rounded p-3 px-6 text-zinc-700 flex flex-col gap-1 select-none transition">
            <div className="flex justify-between items-center">
              <span>Ritiro a {option.name}</span>
              <span>{option.price === "0" ? "Gratis" : option.price}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span>{option.location}</span>
              <span className="text-right">Di solito pronto in 24h</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};
