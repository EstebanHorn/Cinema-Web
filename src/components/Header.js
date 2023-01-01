import { Link } from "react-router-dom";
import Searcher from "./Searcher";

function Header() {
  let token = sessionStorage.getItem("token");

  return (
    <header className="mb-15">
      <nav className="bg-gray-800 mb-25 h-12 flex items-center font-ran w-full">
        <div className="relative flex h-16 items-center justify-between ml-2">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <img
              src={require("../assets/cine.png")}
              className="ml-3 h-6 sm:h-9 space-x-20"
              alt="logo"
            />
            <ul className="flex flex-row text-white mx-4">

              <li className="mx-5 hover:text-red-600">
                <Link to="/movies">Listado</Link>
              </li>
              <li className="mx-5 hover:text-red-600">
                <Link to="/favs">Favoritos</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end mr-8">
          <Searcher />
        </div>
      </nav>
    </header>
  );
}

export default Header;
