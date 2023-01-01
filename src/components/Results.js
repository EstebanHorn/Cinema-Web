import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Results() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=62b54f7fd6c3989f0e9614f5044f1cae&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint)
      .then((res) => {
        const resultsArray = res.data.results;

        if(resultsArray.length === 0){
          swal({
            icon: "error",
            title: "Oops...",
            text: "No se encontraron resultados",
            buttons : false,
            timer: 2000
          });
          navigate('/movies')
        }

        setResults(resultsArray);
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Oops...",
          text: "intentalo mas tarde"
        });
      });
  });

  return (
    <>
        <div className=" mb-24 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 font-ran">
          {results.map((movie, idx) => {
            return (
              <div
                key={idx}
                className="border rounded-lg border-gray-700 m-5 group relative items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="w-auto">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
              </div>
            );
          })}
        </div>
    </>
  );
}

export default Results;
