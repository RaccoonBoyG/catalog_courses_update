import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadMoreTest } from "../store/cards/action";

class ButtonLoadMore extends Component {
  render() {
    const { LoadMoreTest } = this.props;
    return (
      <div className="d-flex flex-row justify-content-center p-3 m-3 load-container ">
        <button
          className="btn btn-primary loadmore"
          id="loadmore-btn"
          onClick={LoadMoreTest}
        >
          Показать ещё
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buttonState: state.cards.isHideButton
});

const mapDispatchToProps = {
  LoadMoreTest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonLoadMore);
