import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCards,
  LoadMoreTest,
  searchInput,
  resetSearch,
  fetchCardsAll,
} from '../store/cards/action';
import CourseCard from './CourseCard';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonLoadMore from '../containers/ButtonLoadMore';

const num2str = (n, text_forms) => {
  n = Math.abs(n) % 100;
  var n1 = n % 10;

  if (n > 10 && n < 20) return text_forms[2];
  if (n1 > 1 && n1 < 5) return text_forms[1];
  if (n1 === 1) return text_forms[0];
  return text_forms[2];
};

class Courses extends Component {
  state = {
    searchText: '',
  };

  async componentDidMount() {
    await this.props.fetchCards();
    await this.props.fetchCardsAll();
  }

  _handleTextChange = (e) => {
    const value = e.target.value;
    this.setState({ searchText: value });
    this.props.searchInput(value);
  };

  _resetSearchResult = () => {
    this.setState({ searchText: '' });
    this.props.resetSearch();
  };

  _noVisibleDIV = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(<div className="course-card-none"></div>);
    }
    return arr;
  };

  render() {
    const { data, filter_data, loading } = this.props;
    const { searchText } = this.state;

    return (
      <>
        <div className="container mt-5 mb-4 search_pc">
          <div className="">
            <div className="t838__blockinput">
              <div className="u-search">
                <input
                  placeholder="Введите название"
                  className="u-input"
                  type="search"
                  name=""
                  id=""
                  onChange={this._handleTextChange}
                  value={searchText}
                  autoComplete="off"
                />
                <button
                  className="u-search-loupe"
                  type="button"
                  onClick={this._resetSearchResult}
                ></button>
              </div>
              {/* <input
                type="text"
                className=" t-input"
                placeholder="Введите название курса"
                onChange={this._handleTextChange}
                value={searchText}
                autoComplete="off"
              />
              {searchText.length > 0 && (
                <svg
                  className="t-site-search-close show_close"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100.4 100.4"
                  onClick={this._resetSearchResult}
                  role="button"
                  aria-label="Очистить поиск"
                >
                  <path d="M99.6 97.4L52.1 49.9 99.3 2.6c0.6-0.6 0.6-1.5 0-2.1 -0.6-0.6-1.5-0.6-2.1 0L50 47.8 2.7 0.5c-0.6-0.6-1.5-0.6-2.1 0 -0.6 0.6-0.6 1.5 0 2.1l47.3 47.3L0.4 97.4c-0.6 0.6-0.6 1.5 0 2.1 0.3 0.3 0.7 0.4 1 0.4s0.7-0.1 1-0.4l47.5-47.5 47.5 47.5c0.3 0.3 0.7 0.4 1 0.4s0.7-0.1 1-0.4C100.1 98.9 100.1 98 99.6 97.4z" />
                </svg>
              )} */}
            </div>
          </div>
        </div>

        <div className="container pb-3 mb-3 margin-custom-catalog_1">
          {/* {!loading && filter_data.length !== 0 && (
            <div className="d-flex flex-row justify-content-between">
              <h3 className="text-custom-dark mb-3 pl-3">
                {num2str(filter_data.length, ['Найден ', 'Найдено ', 'Найдено '])}
                {filter_data.length}
                {num2str(filter_data.length, [' курс ', ' курса ', ' курсов '])}
              </h3>
            </div>
          )} */}

          <div className="flex-row">
            <div className="d-flex flex-wrap flex-row justify-content-between">
              {loading && data.length === 0 ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ width: '100%', height: '350px' }}
                >
                  <div className="u-preloader-mini">
                    <svg
                      className="u-preloader-mini-container"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="24" cy="24" r="23" stroke="#1E4391" strokeWidth="2" />
                      <circle
                        className="u-preloader-mini-dot"
                        cx="6.5"
                        cy="6.5"
                        r="6.5"
                        fill="#1E4391"
                      />
                    </svg>
                  </div>
                </div>
              ) : null}

              {!loading && data.length === 0 ? (
                <h3
                  className="text-custom-dark d-flex flex-row justify-content-center align-items-center"
                  style={{ width: '100%', height: '350px' }}
                >
                  Ничего не найдено
                </h3>
              ) : (
                data.map((item, key) => <CourseCard value={item} key={key} />)
              )}
              {this._noVisibleDIV(data.length % 4)}
            </div>
          </div>

          {!loading && data.length !== 0 && filter_data.length > data.length && (
            <ButtonLoadMore />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.cards.items,
  filter_data: state.cards.filter_data,
  test: state.cards.input,
  loading: state.cards.loading,
});

const mapDispatchToProps = {
  fetchCards,
  LoadMoreTest,
  searchInput,
  resetSearch,
  fetchCardsAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
