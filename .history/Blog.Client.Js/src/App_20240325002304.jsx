import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "@mui/material";
import style from './App.module.scss';
import {setNav} from "./redux/actions/navAction.js";
import {setDevice} from "./redux/actions/deviceAction.js";
import {Device, messages} from "./util.js";
import Nav from "./components/Nav/index.jsx";
import Panel from "./components/Panel/index.jsx";
import Profile from "./components/Profile/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import ArticlePage from "./pages/ArticlePage/index.jsx";
import {IntlProvider} from "react-intl";
import ArticleNav from "./components/ArticleNav/index.jsx";
import backgroundAuckland from './assets/background_auckland.jpg';
import backgroundChongqing from './assets/background_chongqing.jpg';
import backgroundHangzhou from './assets/background_hangzhou.jpg';
import backgroundJiangying from './assets/background_jiangying.jpg';
import backgroundYunnan from './assets/background_yunnan.jpg';

// const backgrounds = [
//   'url(./src/assets/background_auckland.jpg)',
//   'url(./src/assets/background_chongqing.jpg)',
//   'url(./src/assets/background_hangzhou.jpg)',
//   'url(./src/assets/background_jiangying.jpg)',
//   'url(./src/assets/background_yunnan.jpg)',
// ]
const backgrounds = [
  `url(${backgroundAuckland})`,
  `url(${backgroundChongqing})`,
  `url(${backgroundHangzhou})`,
  `url(${backgroundJiangying})`,
  `url(${backgroundYunnan})`,
];

function App() {
  const isMobile = useMediaQuery(`(max-width: 700px)`);
  const isTablet = useMediaQuery('(min-width: 701px) and (max-width: 1240px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const dispatch = useDispatch()
  const hidden = useSelector((state) => state.componentReducers.nav.hidden)
  const device = useSelector((state) => state.systemReducers.media.device )
  const locale = useSelector(state => state.systemReducers.language.currentLang)





  useEffect(() => {
    document.getElementById('root').style.backgroundImage =  backgrounds[Math.floor(Math.random() * backgrounds.length)];
  
    return () => {
      document.getElementById('root').style.backgroundImage = ''
  
    }
  }, []);



  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0 && !hidden) {
        dispatch(setNav(true));
      } else if (event.deltaY < 0 && hidden) {
        dispatch(setNav(false));
      }
    };

    // desktop
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [hidden]);

  useEffect(() => {
    switch (true){
      case isMobile:
        dispatch(setDevice(Device.mobile))
        break
      case isTablet:
        dispatch(setDevice(Device.tablet))
        break
      case isDesktop:
        dispatch(setDevice(Device.desktop))
        break
      default:
        break
    }
  }, [isMobile, isDesktop, isTablet]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <Nav/>
        <div
          className={`${style.root} ${device === Device.tablet && style.rootTablet} ${device === Device.mobile && style.rootMobile}`}
          tabIndex={0}
        >
          <div className={`${style.articleNev}`}>
           <ArticleNav />

            { (device === Device.tablet || device === Device.mobile)  && (
              <div className={`${style.profile}`}>
                <Panel>
                  <Profile/>
                </Panel>
              </div>
            )}
          </div>

          <div className={style.content}>
            <Routes>
              <Route path={'/'} element={<Navigate to={'/1'} /> }/>
              <Route path={'/:page'} index={true} element={<HomePage/>}/>
              <Route path={'/article/:id'} element={<ArticlePage/>}/>
            </Routes>
          </div>

          <div className={`${style.profile}`}>
            <Panel>
              <Profile/>
            </Panel>
          </div>
        </div>
      </BrowserRouter>
    </IntlProvider >
  )
}

export default App
