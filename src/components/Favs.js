import { Link, Navigate } from "react-router-dom";


function Favs(props) {
  let token = sessionStorage.getItem("token");

  return (
    <>
          {!token && <Navigate to="/" />}

      <div className=" mb-24 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 font-ran">
        {props.favorites.map((movie, idx) => {
          return (
            <div
              key={idx}
              className="border rounded-lg border-gray-700 m-5 group relative items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
            >
              <div className="w-auto">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                  src={movie.imgURL}
                  alt={`${movie.title} poster`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className=" text-3xl text-white ">{movie.title}</h1>
                <p className="mb-3 mt-3 font-light tracking-wide text-lg text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {movie.overview.substring(0, 150)}...
                </p>
                <div className="select-none rounded-full w-24 bg-neutral-900 py-2 px-3.5 text-sm  text-white shadow shadow-black/60 flex flex-row justify-center">
                  <img
                    src={require("../assets/star-icon.png")}
                    alt="star icon"
                    className="w-4 h-5 mr-1.5"
                  />
                  {movie.vote_average} / 10
                </div>
                <button className="rounded-full mt-5 w-20 bg-red-600 py-2 px-3.5 text-sm  text-white shadow shadow-black/60 flex flex-row justify-center">
                  <Link to={`/detail?movieID=${movie.id}`}>See More</Link>
                </button>
              </div>
              <button
                onClick={props.addOrRemoveFav}
                data-movie-id={movie.id}
                className="right-2 top-2 absolute bg-gray-300 p-1 rounded-xl border shadow-black/60 hover:cursor-pointer"
              >
                {props.favorites.find((fav) => fav.id == movie.id) ? (
                  <>
                    <img
                      src={require("../assets/fav-icon-select.png")}
                      alt="fav icon"
                      className="w-4 h-4"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={require("../assets/fav-icon.png")}
                      alt="fav icon"
                      className="w-4 h-4"
                    />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Favs;
