/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
  useCallback, useState,
} from 'react';

import { FaStar } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';
import { getMovieByName } from '../../services/endpoints/movies';
import {
  Wapper, Heard, Search, BtnGo, NextAndPrev, BtnNext, BtnPrev, Body, BoxMovie,
  TitleAndSubTitle, Favorite, Loading, Stars,
} from './styles';

// let signal = false;

interface MovieData {
  Title?: string,
  Poster?: string,
  Year?: string,
  Type?: string,
  imdbID: string,
  favorite?: boolean,
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState([] as Array<MovieData>);
  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moviesFavorite, setMoviesFavorite] = useState([] as Array<MovieData>);

  const addOrRemoveFavorite = useCallback((imdbID: string) => {
    const newList: Array<MovieData> = movies.map((movie: MovieData) => {
      if (movie.imdbID === imdbID) {
        if (movie.favorite) {
          const list = moviesFavorite.filter(
            (favorite: MovieData) => favorite.imdbID !== imdbID,
          );

          if (list.length > 0) {
            setMoviesFavorite(list);
          } else {
            setMoviesFavorite([]);
          }

          return { ...movie, favorite: false };
        }

        setMoviesFavorite([...moviesFavorite, { ...movie, favorite: true }]);
        return { ...movie, favorite: true };
      }

      return movie;
    });

    setMovies(newList);
  }, [movies, moviesFavorite]);

  const loadMovies = useCallback(async () => {
    const { apiCall } = getMovieByName();

    if (movieName === '') {
      setTotalPages(0);
      setMovies([]);
    } else {
      try {
        setLoading(true);

        const { data } = await apiCall({ movieName, page });

        const { Search: listMovies, totalResults, Response } = data;

        if (Response === 'True') {
          const numberPages = Math.round(parseInt(totalResults, 10) / 10);

          setTotalPages(numberPages);

          const newList = listMovies.map((movie: MovieData) => (
            { ...movie, favorite: false }));

          let listAddFavorite = [];

          if (moviesFavorite.length > 0) {
            listAddFavorite = newList.map((movie: MovieData) => {
              const movieFavorite = moviesFavorite.filter(
                (favorite) => favorite.imdbID === movie.imdbID,
              );

              if (movieFavorite.length) {
                return movieFavorite[0];
              }

              return movie;
            });
          } else {
            listAddFavorite = newList;
          }

          setMovies(listAddFavorite);
        } else {
          setTotalPages(0);
          setMovies([]);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [page, movieName, moviesFavorite]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
      loadMovies();
    }
  }, [page, loadMovies, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1 && page < totalPages) {
      setPage(page - 1);
      loadMovies();
    }
  }, [page, loadMovies, totalPages]);

  const renderListMovies = useCallback(() => {
    const newList = movies.map(({
      Title, Poster, Year, Type, imdbID, favorite,
    }: MovieData) => (
      <BoxMovie>

        <img src={Poster} alt={Title} />
        <TitleAndSubTitle>
          <span>{Title}</span>
          <p>{`${Year} - ${Type}`}</p>
        </TitleAndSubTitle>
        <Favorite
          type="button"
          onClick={() => addOrRemoveFavorite(imdbID)}
        >
          <FaStar className={`is${favorite}`} size={30} />
        </Favorite>
      </BoxMovie>
    ));

    return newList;
  }, [movies, addOrRemoveFavorite]);

  const handleFavorites = useCallback(() => {
    setLoading(true);
    setMovies(moviesFavorite);
    setLoading(false);
  }, [moviesFavorite]);

  return (
    <>
      <Wapper>
        <Heard>
          <Search>
            <input
              type="text"
              placeholder="Search movie"
              onChange={(e) => setMovieName(e.target.value)}
            />
            <BtnGo type="button" onClick={() => loadMovies()}>Go</BtnGo>
            <Stars onClick={() => handleFavorites()}>
              {moviesFavorite
              && (
              <>
                <FaStar size={30} />
                <span>{moviesFavorite.length}</span>
              </>
              )}
            </Stars>
          </Search>
          {movies.length > 0 && (
          <NextAndPrev>
            <BtnNext
              disabled={page <= 1}
              type="button"
              onClick={handlePrevPage}
            >
              Prev

            </BtnNext>
            <BtnPrev
              disabled={page >= totalPages}
              type="button"
              onClick={handleNextPage}
            >
              Next

            </BtnPrev>
          </NextAndPrev>
          )}
        </Heard>
        {loading ? (
          <Loading>
            <ImSpinner10 size={50} />
          </Loading>
        ) : (
          <Body>
            {!loading && renderListMovies()}
          </Body>
        )}
      </Wapper>
    </>
  );
};
export default Dashboard;
