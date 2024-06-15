import { SignUpInput } from "@harshitsharma1912/medium-common";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInput] = useState<SignUpInput>({
    name: "",
    userName: "",
    password: "",
  });

  async function sendRequest(){
   try {
     const response = await axios.post(`${BACKEND_URL}/api/v1/users/${type === "signup" ? "signup" : "signin"}`,
       postInputs
     );
     const token =await response.data;
     localStorage.setItem("JwtToken",token);
     navigate("/blogs");
     
   } catch (error) {
      console.log("Error while SignUp/SignIn ",error);
   }

  }
  return (
    <div className="h-screen flex flex-col justify-center w-full">
      <div className="flex justify-center flex-col items-center">
        <div className="px-10">
          <div className="text-2xl font-extrabold">Create An Account</div>
          <p className="text-sm font-semibold text-neutral-500">
            {type === "signin" ? "Don't have an account " : "Already have an account"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="underline text-slate-700 pl-2"
            >
              {type === "signin" ? "Sign Up" : "Login"}
            </Link>
          </p>
        </div>

        <div className="pt-1">
          {type === "signup" ?
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
            : null}
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
          <button onClick={sendRequest} type="button" className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"?"Sign Up":"Login" } </button>
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
