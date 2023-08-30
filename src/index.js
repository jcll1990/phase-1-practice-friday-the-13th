document.addEventListener("DOMContentLoaded", function () {

    const navMovieList = document.getElementById("movie-list");
    const mDescription = document.getElementById("description");
    const mTitle = document.getElementById("title");
    const mYearRelased = document.getElementById("year-released");
    const mDetailImage = document.getElementById("detail-image");
    const mBAmount = document.getElementById("amount");
    const watchedButton = document.getElementById("watched");
    const formBloddAmount = document.getElementById("blood-form");
    const ctBloddAmount = document.getElementById("blood-amount");

    let currentBlood = 0;
    let addedBlood = 0;
    let movieIndexinit = 0;
    let variableMagica = 0;
    console.log(addedBlood)
     
    
    fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(moviesdata => {

        const moviesList = moviesdata;
        let movieIndex = 0;
       
        moviesList.forEach(moviedata => {
            const movieimg = document.createElement("img");
            movieimg.src = moviedata.image;
            navMovieList.appendChild(movieimg);
        });

        let currectMovie = moviesdata[movieIndexinit];
        mDescription.textContent = currectMovie.description;
        mTitle.textContent = currectMovie.title;
        mYearRelased.textContent = currectMovie.release_year;
        mDetailImage.src = currectMovie.image;
        mBAmount.textContent = currectMovie.blood_amount;

        let watchetYN = currectMovie.watched;
        if (!watchetYN) {
            watchedButton.textContent = "Unwatched"
        } else {
            watchedButton.textContent = "Watched"
        }


        const navMoviesimgs = document.querySelectorAll('img')
        navMoviesimgs.forEach((span, index) => {
            span.addEventListener("click", function () {

                movieIndex = index -1 ;

                let currectMovie = moviesdata[movieIndex];
                mDescription.textContent = currectMovie.description;
                mTitle.textContent = currectMovie.title;
                mYearRelased.textContent = currectMovie.release_year;
                mDetailImage.src = currectMovie.image;
                mBAmount.textContent = currectMovie.blood_amount;

                let watchetYN = currectMovie.watched;
                    if (!watchetYN) {
                        watchedButton.textContent = "Unwatched"
                    } else {
                        watchedButton.textContent = "Watched"
                    }

            });
        });

        watchedButton.addEventListener("click", () => {

            variableMagica = (movieIndex + 1 );
            currectMovie.watched = !currectMovie.watched;
    
            let watchetYN = currectMovie.watched;
            if (!watchetYN) {
                watchedButton.textContent = "Unwatched"
            } else {
                watchedButton.textContent = "Watched"
            }

            fetch(`http://localhost:3000/movies/${variableMagica}`, {       

            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ watched: currectMovie.watched })

            })
            .then(response => response.json())

            .then(updatedMovie => {
            })
            .catch(error => {
            console.error('Error updating movie:', error);
            });
           
        });

        formBloddAmount.addEventListener("submit", (event) => {
            event.preventDefault()

            variableMagica = (movieIndex + 1);
            addedBlood = parseInt(ctBloddAmount.value)

            console.log("#of movie :" + variableMagica)
            console.log("added Blood on submitt:     "+ addedBlood)

            console.log("old blood :" + moviesdata[`${movieIndex}`].blood_amount)
            console.log("new blood :" + `${moviesdata[`${movieIndex}`].blood_amount + addedBlood}`)

           

            mBAmount.textContent = parseInt(moviesdata[`${movieIndex}`].blood_amount) + parseInt(addedBlood)



            fetch(`http://localhost:3000/movies/${variableMagica}`, {       

            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ blood_amount: parseInt(moviesdata[`${movieIndex}`].blood_amount) + parseInt(addedBlood)  })

            })
            .then(response => response.json())

            .then(updatedMovie => {
            })
            .catch(error => {
            console.error('Error updating movie:', error);
            });

            

        })


    });
});


          /*
            fetch(`http://localhost:3000/movies/1`, {       

            method: 'PATCH',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify({ watched: currectMovie.watched })

          })
          .then(response => response.json())

          .then(updatedMovie => {
          })
          .catch(error => {
            console.error('Error updating movie:', error);
          });
*/