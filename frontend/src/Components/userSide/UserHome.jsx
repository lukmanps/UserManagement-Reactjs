import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJwt } from "../../Redux/jwtAuthReducer";
import { addUser } from "../../Redux/setUserData";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { isLogOut } from "../../Redux/isAuthReducer";
import { logedOut } from "../../Redux/setUserData";
import ProfileUploadModal from "./ProfileUploadModal";

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.userJwt.data;
  });
  const user = useSelector((state) => {
    return state.userData;
  });
  //----------
  const setLogOut = () => {
    localStorage.removeItem("userjwt");
    dispatch(isLogOut());
    dispatch(logedOut());
    navigate("/login");
  };
  //------------
  console.log(token, "token");
  console.log(user, "user is");

  //-----------------------------------------------
  useEffect(() => {
    dispatch(getJwt())
      .then((result) => {
        if (!result.payload) {
          navigate("/login");
        } else {
          const token = result.payload;
          axios
            .post("/apiverification", { token })
            .then((response) => {
              console.log(response.data, "response isss");
              if (response.data.status === false) {
                navigate("/login");
              } else {
                dispatch(addUser(response.data));
              }
            })
            .catch((err) => {
              console.log(err, "errorr iss");
            });
        }
      })
      .catch((error) => {
        console.log(error, "errorr");
      });
  }, [dispatch]);

  return (
    <div>
      <nav className="flex px-4 border-b md:shadow-lg items-center relative">
        <div className="text-lg font-bold md:py-0 py-4">{user?.userName}</div>
        <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">

          <li>
            <a
              className="flex md:inline-flex p-4 items-center hover:bg-gray-50 cursor-pointer"
              onClick={setLogOut}
            >
              <span>Logout</span>
            </a>
          </li>
        </ul>
        <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </nav>
      {/*---------------------------------- navbarends----------------------- */}

      <section
        style={{ fontFamily: "Montserrat" }}
        className="bg-gray-100 flex font-medium items-center justify-center h-screen"
      >
        <section className="w-64 mx-auto bg-gray-300 rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            
          </div>
          <div className="mt-6 w-fit mx-auto relative">
            <img
              src={
                user.image
                  ? user.image
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1685007081~exp=1685007681~hmac=114a3a9033554eb93766ba69e3e29e2f27f34ce8cb0e0da0baaf49e11bb11645"
              }
              className="rounded-full w-35 "
              alt="profile picture"
              srcSet=""
            />

            <span className="absolute bottom-0 right-0">
              <ProfileUploadModal />
            </span>
          </div>

          <div className="mt-8 ">
            <h2 className="text-dark font-bold text-2xl tracking-wide text-center">
              {user?.userName}
            </h2>
          </div>
          <p className="text-gray-400 font-semibold mt-2.5 text-center">
            {user?.designation}
          </p>

          <div className="mt-3 text-dark text-sm text-center">
            <p>{user?.email}</p>
            <p>&nbsp;{user?.phone}</p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default UserHome;
