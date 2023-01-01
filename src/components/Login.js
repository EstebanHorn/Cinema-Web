import axios from "axios";
import swal from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === "" || password === "") {
      swal({
        icon: "error",
        title: "Los campos no pueden estar vacios",
      });
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swal({
        icon: "error",
        title: "Correo electronico no valido",
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal({
        icon: "error",
        title: "Datos erroneos",
      });
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal({
          icon: "success",
          title: "Sesion Iniciada",
          buttons: false,
          timer: 2000,
        });
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/movies");
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/movies" />}
      <div className=" p-8 mt-36 mx-auto w-full rounded-lg shadow border max-w-md dark:bg-gray-800 dark:border-gray-700 flex flex-col ">
        <h2 className="font-ran text-xl md:text-6xl dark:text-white text-center mb-5">
          Iniciar Sesion
        </h2>
        <form
          onSubmit={submitHandler}
          className="font-ran space-y-4 md:space-y-6 py-2"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Correo electronico:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <span>Contraseña: </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="•  •  •  •  •  •"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
