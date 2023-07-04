import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { isSignUp } from "../../Redux/isAuthReducer";
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => {
    return state.isAuth;
  });
  console.log(isAuth, "isAuthhhh");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    err = validation(loginInfo);
    if (Object.keys(err).length === 0) {
      console.log("valid login info move to authentication");
      axios
        .post("/userlogin", loginInfo)
        .then((response) => {
          console.log(response);
          if (response.data.status === false) {
            err.user = response.data.message;
            setErrors(err);
          } else {
            console.log(response.data.accessToken, "responseeeee");
            localStorage.setItem("userjwt", response.data.accessToken);
            dispatch(isSignUp());
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err, "error found");
        });
    } else {
      setErrors(err);
      console.log(errors, ":errors");
    }
  };

  const handleChange = (e) => {
    console.log(loginInfo);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const viewPassword = () => {
    let password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  //---------------------------///validation///-------------------------
  const validation = (data) => {
    console.log(data, "dataa");
    let err = {};
    const email = data?.email;
    const password = data?.password;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!data) {
      err.email = "enter your email";
    } else if (!email) {
      err.email = "enter your email";
    } else if (!emailFormat) {
      err.email = "enter a valid email";
    } else if (!password) {
      err.password = "enter the password";
    }
    return err;
  };
  //----------------------------------///validationends///---------

  return (
    <div>
      <div>
        <section className="bg-gray-50  min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 m-4">
            <div className="md:w-1/2 px-16">
              <h3 className="font-bold text-2xl text-[#464B87] ">Login</h3>
              
              {errors?.user && (
                <p className="text-sm m-3 text-red-500 text-center">
                  {errors?.user}
                </p>
              )}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Email</label>
                <input
                  className="mt-6 p-2 rounded-xl border  focus:outline-none"
                  type="text"
                  value={loginInfo.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email ID"
                />
                {errors?.email && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.email}
                  </p>
                )}
              </div>
              
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Password</label>
                  <input
                    id="password"
                    className="w-full p-2 rounded-xl border  focus:outline-none "
                    type="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter Password"
                  />
                  
                </div>
                {errors?.password && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.password}
                  </p>
                )}

                <button className="bg-[#464B87] text-white py-2 rounded-xl mb-3 shadow-lg hover:scale-105 duration-300">
                  Login
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>
             

              <div className="mt-3 text-xs flex justify-between items-center text-[#464B87]">
                <p>Don't have Account?</p>
                <button
                  className="py-2 border px-5 bg-white rounded-xl text-black  hover:scale-110 duration-300"
                  onClick={navigateToSignUp}
                >
                  Register
                </button>
              </div>
            </div>

            <div className="md:block hidden w-1/2 ">
              <img
                className=" rounded-2xl "
                src="https://img.freepik.com/free-vector/gradient-ssl-illustration_23-2149247155.jpg?w=740&t=st=1685005936~exp=1685006536~hmac=a83a9b847d2420fc4b91bbfb99cc527ee28db8d18a9ed887ceccab15e2680c57"
                alt="carimage"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
