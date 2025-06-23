import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMoreCards } from "../store/cards/cardsSlice";

const ButtonLoadMore = () => {
  const dispatch = useDispatch();
  const buttonState = useSelector(state => state.cards.isHideButton);

  const handleLoadMore = () => {
    dispatch(loadMoreCards());
  };

  return (
    <div className="d-flex flex-row justify-content-center p-3 m-3 load-container ">
      <button
        className="btn btn-primary loadmore"
        id="loadmore-btn"
        onClick={handleLoadMore}
      >
        Показать ещё
      </button>
    </div>
  );
};

export default ButtonLoadMore;
