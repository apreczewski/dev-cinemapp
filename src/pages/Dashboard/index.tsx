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
  TitleAndSubTitle, Favorite, Loading,
} from './styles';

// let signal = false; //

interface BoxData {
  Title?: string,
  Poster?: string,
  Year?: string,
  Type?: string
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  // const handleListMovies = useCallback(() => {
  //   console.log(movies);

  //   movies.map(({
  //     Title, Poster, Year, Type,
  //   }: BoxData) => (
  //     <BoxMovie>
  //       <img src={Poster} alt={Title} />
  //       <Heard>
  //         <span>{Title}</span>
  //         <p>{`${Year} - ${Type}`}</p>
  //       </Heard>
  //       <Favorite>
  //         <FaStar size={30} />
  //       </Favorite>
  //     </BoxMovie>
  //   ));
  // }, [movies]);

  const loadMovies = useCallback(async (name) => {
    const { apiCall } = getMovieByName();

    if (name === '') {
      setTotalPages(0);
      setMovies([]);
    } else {
      try {
        setLoading(true);
        // signal = source;
        const { data } = await apiCall({ movieName: name, page });

        const { Search: listMovies, totalResults, Response } = data;

        console.log(Response);

        if (Response === 'True') {
          console.log(typeof Response);
          const numberPages = Math.round(parseInt(totalResults, 10) / 10);

          setTotalPages(numberPages);
          setMovies(listMovies);
        } else {
          setTotalPages(0);
          setMovies([]);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [page]);

  // const getMovies = useCallback((name) => {
  //   if (name !== '') {
  //     setMovieName(name);
  //   }
  // }, []);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      console.log('next', page);
      setPage(page + 1);
      loadMovies(movieName);
    }
  }, [movieName, page, loadMovies, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1 && page < totalPages) {
      console.log('prev', page);
      setPage(page - 1);
      loadMovies(movieName);
    }
    console.log('prev afet if', page);
  }, [movieName, page, loadMovies, totalPages]);

  // useEffect(() => {
  //   loadMovies();
  // }, [loadMovies]);

  // useEffect(() => () => signal && signal.cancel(), []);

  return (
    <>
      <Wapper>
        <Heard>
          <Search>
            <input type="text" placeholder="Search movie" onChange={(e) => setMovieName(e.target.value)} />
            <BtnGo type="button" onClick={() => loadMovies(movieName)}>Go</BtnGo>
          </Search>
          {movies.length > 0 && (
          <NextAndPrev>
            <BtnNext disabled={page <= 1} type="button" onClick={handlePrevPage}>Prev</BtnNext>
            <BtnPrev disabled={page >= totalPages} type="button" onClick={handleNextPage}>Next</BtnPrev>
          </NextAndPrev>
          )}
        </Heard>
        {loading ? (
          <Loading>
            <ImSpinner10 size={50} />
          </Loading>
        ) : (
          <Body>
            {movies.length > 0 && (
              movies.map(({
                Title, Poster, Year, Type,
              }: BoxData) => (
                <BoxMovie>
                  <img src={Poster} alt={Title} />
                  <TitleAndSubTitle>
                    <span>{Title}</span>
                    <p>{`${Year} - ${Type}`}</p>
                  </TitleAndSubTitle>
                  <Favorite>
                    <FaStar size={30} />
                  </Favorite>
                </BoxMovie>
              ))
            )}
          </Body>
        )}
      </Wapper>
    </>
  );
};
export default Dashboard;
