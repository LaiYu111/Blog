import s from './App.module.scss'
import {Route, Routes, useNavigate} from "react-router-dom";
import ArticlePage from "@/pages/ArticlePage/index.jsx";
import AboutPage from "@/pages/AboutPage/index.jsx";
import Header from "@/components/Header/index.jsx";
import Settings from "@/components/Settings/index.jsx";
import ArticleContentPage from "@/pages/ArticleContentPage/index.jsx";
import {useSelector} from "react-redux";
import {IntlProvider} from "react-intl";
import {MESSAGES} from "@/config.js";
import {useEffect} from "react";
import Footer from "@/components/Footer/index.jsx";



function App() {
  const locale = useSelector( state => state.language._)
  const navigator = useNavigate()

  useEffect(() => {
    navigator('/about')
  }, []);

  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <div className={s.layout}>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path={`/article`} element={<ArticlePage />} />
            <Route path={`/article/:id`} element={<ArticleContentPage />} />
            <Route path={`/about`} element={<AboutPage />} />
          </Routes>
        </div>
        <div>
          <Footer/>
        </div>
        <Settings />
      </div>
    </IntlProvider>
  )
}

export default App
