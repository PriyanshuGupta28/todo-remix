import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import React from "react";
import { validate } from "../login/validate";
import { authCookie, createUserAccount } from "~/auth/auth";
import { connectDB } from "~/db/db";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const errors = validate(email, password);
  await await connectDB();
  if (errors) {
    return { errors };
  }
  const user = await createUserAccount(email, password);
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(user),
    },
  });
};

const Signup: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const emailError = actionData?.errors?.email;
  const passwordError = actionData?.errors?.password;
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
        <div
          className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
          style={{
            backgroundImage:
              "url(https://pixabay.com/get/g0b5d6babc510979057005955d79f41873cd6340e532d87105b1def10055a5140ebc35808658d87fc7981ae5e6596511a8a998758cace36339987a27241fe7e54_1280.jpg)",
          }}
        ></div>
        <div className="w-full sm:w-3/5">
          <div className="p-8">
            <h1 className="text-3xl font-black text-slate-700">Sign up</h1>
            <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
              Create an account to get access to 1000+ Freebies
            </p>
            <Form className="mt-8" method="post">
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Email{" "}
                  {emailError && (
                    <span className="text-red-500">{emailError}</span>
                  )}
                </label>
              </div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                >
                  Enter Your Password{" "}
                  {passwordError && (
                    <span className="text-red-500">{passwordError}</span>
                  )}
                </label>
              </div>
              <input
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                type="submit"
                value="Create account"
              />
            </Form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-blue-600 no-underline hover:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
