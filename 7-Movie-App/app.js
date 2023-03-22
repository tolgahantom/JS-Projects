const ApiURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bded7bd39b47aefcd7446dcd72a45d78&page=1";
const ImgPath = "https://image.tmdb.org/t/p/w1280";

const movieContainer = document.querySelector(".movies-container");
const searchInput = document.querySelector("#search");
const showDetailIcon = document.querySelector("#showDetailIcon");

searchInput.addEventListener("input", (e) => {
  let search = e.target.value.toLowerCase();
  let movies = document.querySelectorAll(".movie-name");

  movies.forEach((movie) => {
    movie.parentElement.parentElement.style.display = "block";
    if (!movie.innerHTML.toLowerCase().includes(search)) {
      movie.parentElement.parentElement.style.display = "none";
    }
  });
});

getClassByRate = (rating) => {
  if (rating >= 8) return "green";
  else if (rating >= 6.5) return "orange";
  else return "red";
};

showMovies = (movies) => {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    let movieCardEl = `
    <div class="movie-card">
      <div class="movie-detail">
        ${movie.overview}
      </div>
      <div class="movie-img">
        <img
          src="${ImgPath + movie.backdrop_path}"
        />
      </div>
      <div class="detail">
        <div class="movie-name">${movie.original_title}</div>
        <div class="movie-rating ${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</div>
      </div>
    </div>  
  `;

    movieContainer.innerHTML += movieCardEl;
  });
};

getMovies = async (url) => {
  const response = await (await fetch(url)).json();
  await showMovies(response.results);
};

getMovies(ApiURL);
