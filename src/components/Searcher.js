import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

function Searcher() {

  let token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swal({
        icon: "error",
        title: "Ingresar Busqueda",
        text: " ",
        buttons: false,
        timer: 1000,
      });
    } else if (keyword.length < 3) {
      swal({
        icon: "error",
        title: "Ingresar mas de 2 caracteres",
        text: " ",
        buttons: false,
        timer: 1000,
      });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/results?keyword=${keyword}`);
    }
  };

  return (
    <>
    {token && <form className="flex items-center font-ran" onSubmit={submitHandler}>
        <label>
          <input
            type="text"
            name="keyword"
            placeholder="Buscar"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-52 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <button
          type="submit"
          className="ml-1 bg-red-600 p-1 rounded-lg text-white h-7 items-center flex"
        >
          Buscar
        </button>
      </form>}
      
    </>
  );
}

export default Searcher;
