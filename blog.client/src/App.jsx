import s from './App.module.scss'
import {Route, Routes} from "react-router-dom";
import ArticlePage from "@/pages/ArticlePage/index.jsx";
import AboutPage from "@/pages/AboutPage/index.jsx";
import Header from "@/components/Header/index.jsx";
import Settings from "@/components/Settings/index.jsx";
import ArticleContentPage from "@/pages/ArticleContentPage/index.jsx";
import {useSelector} from "react-redux";
import {IntlProvider} from "react-intl";
import {AUTH, BACKEND_URL, MESSAGES, PATH} from "@/config.js";
import {useEffect, useState} from "react";
import Footer from "@/components/Footer/index.jsx";
import AdminPanelPage from "@/pages/AdminPanelPage/index.jsx";
import useGet from "@/hooks/useGet.js";
import {isTokenExpired} from "@/utils.js";



function App() {
  const locale = useSelector( state => state.language._)
  const [ token ] = useState(localStorage.getItem(AUTH.TOKEN))
  const [expire] = useState(localStorage.getItem(AUTH.EXPIRE))
  const { getData } = useGet()

  useEffect(() => {
    if (!token || isTokenExpired(expire) ){
      localStorage.setItem(AUTH.TOKEN, '')
      localStorage.setItem(AUTH.EXPIRE, '') // 初始化 token
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`${BACKEND_URL}/api/system/version`) // Assuming version is defined elsewhere
        console.log(result);
      } catch (error) {
        console.error('Error fetching version:', error);
      }
    };

    fetchData();
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

            <Route path={`admin_panel`}>
              <Route path={PATH.analysis_dashboard} element={<AdminPanelPage destination={PATH.analysis_dashboard}/>} />

              <Route path={PATH.management_articles} element={<AdminPanelPage destination={PATH.management_articles}/> }/>
              <Route path={PATH.management_tags} element={<AdminPanelPage destination={PATH.management_tags}/> }/>
              <Route path={PATH.management_users} element={<AdminPanelPage destination={PATH.management_users}/> }/>

              <Route path={PATH.publication_article} element={<AdminPanelPage destination={PATH.publication_article}/> }/>

              <Route path={PATH.others_login} element={<AdminPanelPage destination={PATH.others_login}/> }/>
            </Route>
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
