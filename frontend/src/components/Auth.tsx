import { SignUpInput } from "@harshitsharma1912/medium-common";
import { ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInput] = useState<SignUpInput>({
    name: "",
    userName: "",
    password: "",
  });

  return (
    <div className="h-screen flex flex-col justify-center w-full">
      <div className="flex justify-center flex-col items-center">
        <div className="px-10">
          <div className="text-2xl font-extrabold">Create An Account</div>
          <p className="text-sm font-semibold text-neutral-500">
            Already have an account ?
            <Link to="signin" className="underline text-slate-700 pl-2">
              Login
            </Link>
          </p>
        </div>

        <div className="pt-1">
          <LabelledInput
            onChange={(e) => {
              setPostInput({
                ...postInputs,
                name: e.target.value,
              });
            }}
            placeholder="Enter your name"
            label="Name"
          />

          <LabelledInput
            onChange={(e) => {
              setPostInput({
                ...postInputs,
                userName: e.target.value,
              });
            }}
            placeholder="Enter your username"
            label="Username"
          />

          <LabelledInput
            onChange={(e) => {
              setPostInput({
                ...postInputs,
                password: e.target.value,
              });
            }}
            placeholder="Enter your password"
            label="Password"
            type="password"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="mt-2 block  text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
