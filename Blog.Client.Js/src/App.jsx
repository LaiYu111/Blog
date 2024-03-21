import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "@mui/material";
import style from './App.module.scss';
import {setNav} from "./redux/actions/navAction.js";
import {setDevice} from "./redux/actions/deviceAction.js";
import {Device} from "./util.js";
import Nav from "./components/Nav/index.jsx";
import Panel from "./components/Panel/index.jsx";
import Profile from "./components/Profile/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import ArticlePage from "./pages/ArticlePage/index.jsx";

function App() {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1240px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const dispatch = useDispatch()
  const hidden = useSelector((state) => state.componentReducers.nav.hidden)

  const device = useSelector((state) => state.systemReducers.media.device )



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
      <BrowserRouter>
        <Nav/>
        <div
          className={`${style.root} ${device === Device.tablet && style.rootTablet} ${device === Device.mobile && style.rootMobile}`}
          tabIndex={0}
        >
          <div className={`${style.articleNev}`}>
            <Panel>
              ss
            </Panel>
            { (device === Device.tablet || device === Device.mobile)  && (
              <div className={`${style.profile}`}>
                <Panel>
                  <Profile/>
                </Panel>
              </div>
            )}
          </div>
          {/*<hr/>*/}

          <div className={style.content}>
            <Routes>
              <Route path={'/'} element={<HomePage/>}/>
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
  )
}

export default App
