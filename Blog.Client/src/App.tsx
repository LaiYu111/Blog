import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/Home";
import {useEffect} from "react";
import {setNav} from "./redux/actions/navAction.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./redux/interfaces.ts";
import {useMediaQuery} from "@mui/material";
import {setDevice} from "./redux/actions/deviceAction.ts";
import {Device} from "./util.ts";
import Article from "./pages/Article";

interface WheelEvent extends MouseEvent {
  deltaY: number
}

function App() {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1240px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const dispatch = useDispatch()
  const hidden = useSelector((state: AppState) => state.componentReducers.nav.hidden)

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
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
        <hr />

        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/article/{id}'} element={<Article />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
