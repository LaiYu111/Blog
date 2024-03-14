import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1240px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const dispatch = useDispatch()
  const hidden = useSelector((state: AppState) => state.componentReducers.nav.hidden)

  const device = useSelector((state: AppState) => state.systemReducers.media.device )



  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const key = e.key;

    switch (key) {
      case 'Escape':
        dispatch(setPopup(false))
        break;
      default:
        break;
    }
  }

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
        <div
          className={`${style.root} ${device === Device.tablet && style.rootTablet} ${device === Device.mobile && style.rootMobile}`}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={`${style.articleNev}`}>
            <Panel>
              ss
            </Panel>
          </div>
          {/*<hr/>*/}

          <div className={style.content}>
            <Routes>
              <Route path={'/'} element={<HomePage/>}/>
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
