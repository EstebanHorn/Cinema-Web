import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Detail() {
  let token = sessionStorage.getItem("token");

  const [movie, setMovie] = useState(null);

  const [credit, serCredit] = useState(null);

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=62b54f7fd6c3989f0e9614f5044f1cae&language=es-ES`;
    axios
      .get(endPoint)
      .then((res) => {
        const movieData = res.data;
        setMovie(movieData);
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Oops...",
          text: "intentalo mas tarde",
        });
      });
  },[movieID]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=62b54f7fd6c3989f0e9614f5044f1cae&language=es-ES`;
    axios
      .get(endPoint)
      .then((res) => {
        const creditData = res.data;
        serCredit(creditData.cast);
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Oops...",
          text: "intentalo mas tarde",
        });
      });
  },[movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}

      {movie && (
        <>
        {credit && (
          <div className="flex flex-row p-4 my-5 font-ran text-white mb-32">
            <img
              src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="border-2 rounded-lg border-gray-700 shadow-sm mr-10 flex-none h-fit"
            />
            <div className="flex flex-col">
              <h1 className="text-red-600 text-6xl mb-10 flex flex-wrap">
                {movie.title}
              </h1>
              <div className=" absolute float-right right-5 select-none rounded-full w-28 h-10 bg-neutral-900 py-2 px-3.5 text-sm  text-white shadow shadow-black/60 flex flex-row justify-center">
                <img
                  src={require("../assets/star-icon.png")}
                  alt="star icon"
                  className="w-4 h-5 mr-1.5"
                />
                {movie.vote_average} / 10
              </div>
              <div className="">
                <h1 className="text-3xl">Descripcion</h1>
                <p className="text-white mt-2">{movie.overview}</p>
              </div>
              <div className="mt-10 ">
                <h1 className="text-3xl">Generes</h1>
                <ul className="flex flex-row mt-2">
                  {movie.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="mr-2 text-lg bg-gray-500 bg-opacity-10 p-2 border rounded-lg border-gray-200"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              <h1 className="text-3xl mt-10">Reparto</h1>
              <ul className="flex flex-row mt-2">
                {credit.slice(0, 6).map((act) => (
                  <li
                    key={act.id}
                    className="mr-2 text-lg bg-gray-500 bg-opacity-10 p-2  rounded-lg justify-center text-center"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w400/${act.profile_path}`}
                      alt={`${act.name} poster`}
                      className=" rounded-lg shadow-sm mb-2"
                    />
                    {act.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )}
        </>
      )}
    </>
  );
}

export default Detail;
