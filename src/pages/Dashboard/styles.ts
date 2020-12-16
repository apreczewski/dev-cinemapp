import styled, { keyframes } from 'styled-components';

export const Btn = styled.button`
  height: 40px;
  border-radius: 25px;

  cursor: pointer;

  :hover {
    font-weight: bold;
  }
`;

const spin = keyframes`
  from {
      transform:rotate(0deg);
  }
  to {
      transform:rotate(360deg);
  }
`;

export const Loading = styled.div`
  width: 100vw;
  margin-top: 150px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation-name: ${spin};
    animation-duration: 3000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    color: rgb(139, 181, 172, 0.550);
  }
`;

export const Wapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Heard = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Search = styled.div`
  display: flex;

  > input {
    width: 350px;
    height: 40px;
    margin-right: 25px;
    padding: 5px 15px;

    border-radius: 25px;
    border: 1px solid white;
    transition: border 300ms;

    color: gray;

    :hover {
      border: 1px solid  rgb(139, 181, 172, 0.550);
    }
  }
`;

export const BtnGo = styled(Btn)`
  width: 100px;
  color: white;
  background: #6A978E;
  border: 1px solid #8BB5AC;
`;

export const NextAndPrev = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const BtnNext = styled(Btn)`
  width: 100px;
  color: white;
  background: #6A978E;
  border: 1px solid #8BB5AC;
  margin-right: 10px;
  display: initial;
`;

export const BtnPrev = styled(Btn)`
  width: 100px;
  color: white;
  background: #6A978E;
  border: 1px solid #8BB5AC;
`;

export const Body = styled.div`
  width: 800px;
`;

export const BoxMovie = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 9px;
  border: 1px solid rgb(112, 134, 98, 0.550);

  > img {
    height: 100%;
    width: 120px;
    border-bottom-left-radius: 9px;
    border-top-left-radius: 9px;
  }
`;

export const TitleAndSubTitle = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;


  > span {
    padding: 0 25px;
    font-weight: bold;
    font-size: 25px;
  }

  > p {
    padding: 0 25px;
    font-weight: lighter;
    font-size: 15px;
  }

`;

export const Favorite = styled.button`
  width: 200px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  border: none;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;


  > svg {
    cursor: pointer;
    transition: color 300ms;

    :hover {
      color: #EBEC75;
      /* box-shadow: 10px 10px 5px grey, */
    }
  }
`;

export const Container = styled.div`

`;
