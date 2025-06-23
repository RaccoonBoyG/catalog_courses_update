import React, { useEffect } from 'react';
import Courses from './Courses';
// import HeaderBackground from '../containers/HeaderBackground';
// import HeaderTitle from '../containers/HeaderTitle';
import scroll from './scroll';
import ButtonScrollToTop from '../containers/ButtonScrollToTop';

const Catalog = () => {
  useEffect(() => {
    scroll();
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      {/* <HeaderBackground /> */}
      {/* <HeaderTitle title={'Онлайн-курсы УрФУ'} className={'top-txt-container-sub'} /> */}
      <Courses />
      <ButtonScrollToTop />
    </React.Fragment>
  );
};

export default Catalog;
