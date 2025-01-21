import React, { useState } from "react";
import Button from "./Button";

const inputValues = ["Name of the person", "password", "confirmPassword"];

function SignUp() {
  const api = ""; // API endpoint (if applicable)
  const [form, setForm] = useState({});

  const handleOnSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form Data:", form);
    // Add API call logic here if required
  };

  return (
    <div className="flex items-center justify-center bg-gray-500 h-screen w-screen">
      <div className="formContainer flex items-center justify-center flex-col h-3/6 w-4/12 border-2 relative bg-gray-400">
        <label htmlFor="formSubmission" className="border-2 mb-4 text-lg">
          Sign Up 
        </label>

        <form
          action={api}
          onSubmit={handleOnSubmit}
          className="flex flex-col justify-center items-center  h-full w-full px-4"
        >
          {inputValues.map((item, index) => (
            <input
              type={item.toLowerCase().includes("password") ? "password" : "text"}
              className="border-2 border-black rounded-full text-black mb-4 p-2 w-full"
              name={item.replace(/\s+/g, "").toLowerCase()}
              placeholder={item}
              key={index}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          ))}

         <Button type="submit" text="Submit"  width="w-4/12" height="" onClick={()=>null} />
        </form>
        <Button type="submit" text="Google"  width="w-4/12" height="" onClick={()=>null} />

      </div>
    </div>
  );
}

export default SignUp;
