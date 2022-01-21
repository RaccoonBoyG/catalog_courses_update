import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'; // Link
import withRouter from '../utils/withRouter';

// import logo from '../static/img/logo_full.png'
// import Search from './Search';
import { fetchUserState } from '../store/user/action';
import { searchInput, resetSearch } from '../store/cards/action';
import RenderProfileYes from '../containers/RenderProfileYes';
import RenderProfileNo from '../containers/RenderProfileNo';
import MyCourses from '../containers/MyCourses';
import { MEDIA_LS_URL } from '../services/openurfu';
import { IoIosSearch } from 'react-icons/io';
import { IconContext } from 'react-icons';
import $ from 'jquery';
import MobileFilter from '../containers/MobileFilter';
import MobileMenu from '../containers/MobileMenu';
import MobileButtonBack from '../containers/MobileButtonBack';

// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponentMenu: false,
      showComponentFilter: false,
      term: '',
    };
    this._onButtonClickMenu = this._onButtonClickMenu.bind(this);
    this._onButtonClickFilter = this._onButtonClickFilter.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this._onButtonClickMenuItem = this._onButtonClickMenuItem.bind(this);
  }

  componentDidMount() {
    // this.props.fetchEnrollState();
    // if(!this.props.loading_user && this.props.params.id !== undefined) {
    //   this.props.fetchEnrollState(this.props.params.id);
    //   console.log(this.props.params.id);

    // }
    var header = document.querySelector('.header');
    var icon = document.querySelector('.icon-container');
    var icon_search = document.querySelector('.icon-container-search');
    if (this.props.location.pathname === '/')
      icon_search.onclick = function () {
        header.classList.toggle('menu-open');
      };
    icon.onclick = function () {
      header.classList.toggle('menu-open');
    };
  }
  updateData(config) {
    this.setState(config);
  }

  _onButtonClickMenu() {
    this.updateData({ showComponentMenu: true, showComponentFilter: false });
  }

  _onButtonClickFilter() {
    var header = document.querySelector('.header');
    header.classList.toggle('menu-open', header)
    this.updateData({ showComponentFilter: true, showComponentMenu: false });
  }

  _onButtonClickMenuItem() {
    var header = $('.header');
    $(header).toggleClass("menu-open", header)
    this.updateData({ showComponentMenu: false, showComponentFilter: false });
  }

  _handleTextChange(e) {
    this.updateData({
      ...this.state,
      term: e.target.value,
    });
  }

  submitSearch() {
    this.props.searchInput(this.state.term);
    var header = document.querySelector('.header');
    header.classList.toggle('menu-open');
    this.updateData({ showComponentFilter: false, showComponentMenu: false });
    this.props.navigate('/');
  }

  resetInput() {
    this.props.resetSearch();
    $('.search-slt').val('');
    this.updateData({
      ...this.state,
      term: '',
    });
  }

  render() {
    const { isAuth } = this.props;
    return (
      <React.Fragment>
        {/* <div className="bg_img" style={backgroundImg}></div> */}
        {/* <img className="bg_img" src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt=""/> */}
        <div className="container-fluid shadow-sm">
          <nav className="navbar navbar-expand-lg navbar-light container pb-3 pl-0 pr-0">
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://openedu.urfu.ru/files/courses_catalog/urfu_logo.png"
                width="110"
                img-field="img"
                alt=""
              />
              {/* <svg version="1.0" className="brand_img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 490.000000 466.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,466.000000) scale(0.100000,-0.100000)">
                    <path d="M406 4228 c-3 -7 -11 -35 -20 -62 -25 -77 -22 -86 22 -86 52 0 142
                            -25 210 -58 73 -35 180 -141 253 -252 53 -80 284 -469 429 -725 25 -43 181
                            -311 260 -445 37 -63 94 -160 125 -215 121 -208 232 -399 336 -575 187 -318
                            233 -451 204 -592 -34 -162 -248 -291 -548 -329 -130 -16 -311 9 -460 65 -37
                            15 -69 26 -72 26 -2 0 -25 -27 -50 -61 -56 -72 -56 -86 5 -207 88 -176 205
                            -287 366 -348 64 -24 78 -26 184 -21 165 7 291 53 436 158 101 74 228 215 331
                            369 34 51 113 180 113 185 0 2 49 93 108 202 60 109 146 268 192 353 122 228
                            142 264 152 277 6 8 1 25 -15 50 -14 21 -93 157 -177 303 -85 146 -172 297
                            -195 335 -23 39 -77 131 -120 205 -78 134 -188 325 -250 430 -18 30 -65 111
                            -105 180 -40 69 -87 150 -105 180 -18 30 -57 98 -88 150 -82 142 -90 191 -41
                            264 23 36 123 86 186 93 27 3 52 11 54 17 2 6 13 41 23 79 l20 67 -880 0
                            c-695 0 -880 -3 -883 -12z" />
                    <path d="M3201 4203 c-5 -21 -13 -57 -19 -79 l-9 -41 76 -6 c42 -4 119 -18
                            171 -33 151 -41 231 -96 261 -179 l13 -35 161 0 160 0 20 36 c26 48 122 136
                            179 163 57 26 149 51 192 51 31 0 33 3 48 54 9 30 16 66 16 80 l0 26 -630 0
                            -629 0 -10 -37z" />
                </g>
            </svg> */}
              {/* <p className="navbar_text_small mt-2">
                Институт технологий <br />
                открытого образования
            </p> */}
            </NavLink>

            <div className="collapse navbar-collapse justify-content-md-center" id="navbarSupportedContent">
              <ul className="navbar-nav navigate is-show">
                <li className="nav-item">
                  {/* <a className="nav-link" href="#">Каталог<span className="sr-only"></span></a> */}
                  <NavLink to="/" className="nav-link">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" href="#">Организации</a> */}
                  <NavLink to="/orgs" className="nav-link">
                    Организации
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to='/programs' className="nav-link">Программы</NavLink>
                </li> */}
                {/* <li className="nav-item">
                  <NavLink to="/npr" className="nav-link">
                    Обучение НПР
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink to="/projects" className="nav-link">
                    Программы
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" href="#">О нас</a> */}
                  <NavLink to="/about" className="nav-link">
                    О нас
                  </NavLink>
                </li>
                {isAuth ? <MyCourses /> : null}

                {isAuth ? null : (
                  <li className="nav-item">
                    <a href={`${MEDIA_LS_URL}/register`} className="nav-link" id="href">
                      Регистрация
                    </a>
                  </li>
                )}
                {/* <li className="nav-item navigate-search">
                <button type="button" className="btn btn-primary btn-circle-search shadow-sm">
                  <IconContext.Provider value={{ size: '2rem', className: 'btn-circle-search-svg shadow-sm' }}>
                    <IoIosSearch />
                  </IconContext.Provider>
                </button>
              </li> */}
              </ul>
              {/* <ul className="navbar-nav navigate is-hidden">
              <li className="nav-item">
                <div className="t-site-search-input">
                  <div className="t838__blockinput">
                    <input
                      type="text"
                      className="form-control search-slt t-input"
                      placeholder="Введите название курса"
                      onChange={e => this._handleTextChangeBIG(e)}
                    />
                    <svg
                      className="t-site-search-close"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100.4 100.4"
                      onClick={this._resetSearchResult.bind(this)}
                    >
                      <path d="M99.6 97.4L52.1 49.9 99.3 2.6c0.6-0.6 0.6-1.5 0-2.1 -0.6-0.6-1.5-0.6-2.1 0L50 47.8 2.7 0.5c-0.6-0.6-1.5-0.6-2.1 0 -0.6 0.6-0.6 1.5 0 2.1l47.3 47.3L0.4 97.4c-0.6 0.6-0.6 1.5 0 2.1 0.3 0.3 0.7 0.4 1 0.4s0.7-0.1 1-0.4l47.5-47.5 47.5 47.5c0.3 0.3 0.7 0.4 1 0.4s0.7-0.1 1-0.4C100.1 98.9 100.1 98 99.6 97.4z" />
                    </svg>
                  </div>
                </div>
              </li>
            </ul> */}
              {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            </div>

            {/* <a href="" id="href">
                <button className="btn btn-outline-primary my-2 my-sm-0">Личный кабинет</button>
            </a> */}
            {isAuth ? <RenderProfileYes /> : <RenderProfileNo />}
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
          </nav>
          <div className="header">
            {this.props.location.pathname === '/' ? (
              <div style={{ float: 'left' }} className="icon-container-search" onClick={this._onButtonClickFilter}>
                {/* <div className="p-2"><FontAwesomeIcon icon={faSearch} size="2x" /></div> */}
                <div className="p-2 m-1" id="menuicon-search">
                  <IconContext.Provider value={{ size: '2em' }}>
                    <IoIosSearch />
                  </IconContext.Provider>
                </div>
              </div>
            ) : null}
            <div className="icon-container d-flex p-2 m-1" onClick={this._onButtonClickMenu}>
              <div id="menuicon" className="d-flex flex-column">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
              </div>
            </div>
            {this.props.location.pathname === `/orgs/${this.props.params.org}` ||
            this.props.location.pathname === `/${this.props.params.id}` ? (
              <MobileButtonBack navigate={this.props.navigate} />
            ) : null}
            {this.state.showComponentMenu ? <MobileMenu isAuth={isAuth} onButtonClickMenuItem={this._onButtonClickMenuItem}  /> : null}
            {this.state.showComponentFilter && this.props.location.pathname === '/' ? (
              <MobileFilter
                _handleTextChange={this._handleTextChange}
                submitSearch={this.submitSearch}
                resetInput={this.resetInput}
                term={this.state.term}
              />
            ) : null}
            {/* <div className="mobile-menu-filter">
                    <ul className='menu-filter'>
                    <li className="menu-item-filter">
                        <NavLink exact to='/' className="nav-link">Каталог</NavLink>
                    </li>
                    <li className="menu-item-filter">
                        <NavLink to='/orgs' className="nav-link">Организации</NavLink>
                    </li>
                    <li className="menu-item-filter">
                        <NavLink to='/about' className="nav-link">О нас</NavLink>
                    </li>
                    </ul>
                </div> */}
          </div>
        </div>
      </React.Fragment>
      // <div className="navbar-container">
      // <div className="filter-back"></div>
      //     <nav className="navbar navbar-expand-lg navbar-light ">

      //     <NavLink className="navbar-brand" exact to="/">
      //         <img className="logo" src={logo} alt="Открытые образовательные программы"/>
      //     </NavLink>
      //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      //         <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse justify-content-md-center" id="navbarTogglerDemo01">
      //         {/* <ul className="navbar-nav mr-auto">
      //             <Search />
      //         </ul> */}
      //         <ul className="navbar-nav">
      //             <li className="nav-item">
      //                 <NavLink exact to='/' className="nav-link">Каталог</NavLink>
      //             </li>
      //             <li className="nav-item">
      //                 <NavLink to='/org' className="nav-link">Организации</NavLink>
      //             </li>
      //             <li className="nav-item">
      //                 <NavLink to='/programs' className="nav-link">Программы</NavLink>
      //             </li>
      //             <li className="nav-item">
      //                 <NavLink to='/about' className="nav-link">О нас</NavLink>
      //             </li>
      //             { isAuth ? <MyCourses /> : null }
      //         </ul>
      //     </div>
      //         { isAuth ? <RenderProfileYes /> : <RenderProfileNo /> }
      //     </nav>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.user.items_user,
  isAuth: state.user.isAuth,
  loading_user: state.user.loading,
});

const mapDispatchToProps = {
  fetchUserState,
  searchInput,
  resetSearch,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
