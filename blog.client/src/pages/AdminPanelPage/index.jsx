import s from './index.module.scss'
import List from "@/components/List/index.jsx";
import ListItemButton from "@/components/List/ListItemButton/index.jsx";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate} from "react-router-dom";
import ArticleManagement from "@/pages/AdminPanelPage/ArticleManagement/index.jsx";
import {AUTH, PATH} from "@/config.js";
import TagManagement from "@/pages/AdminPanelPage/TagManagement/index.jsx";
import UserManagement from "@/pages/AdminPanelPage/UserManagement/index.jsx";
import Dashboard from "@/pages/AdminPanelPage/Dashboard/index.jsx";
import ArticlePublication from "@/pages/AdminPanelPage/ArticlePublication/index.jsx";
import {useEffect, useState} from "react";
import Login from "@/pages/AdminPanelPage/Login/index.jsx";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";




function AdminPanelPage({ destination }) {
  const [selectedPath, setSelectedPath] = useState(destination); // 定位
  const navigator = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token] = useState(localStorage.getItem(AUTH.TOKEN))

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const navigationList = [
    {
      category: <FormattedMessage id={"base.analysis"}/>,
      listItemButton: [
        {
          icon: <SpaceDashboardOutlinedIcon />,
          text: <FormattedMessage id={"base.dashboard"}/>,
          path: PATH.analysis_dashboard
        }
      ]
    },
    {
      category: <FormattedMessage id={"base.manage"}/>,
      listItemButton: [
        {
          icon: <AutoStoriesOutlinedIcon />,
          text: <FormattedMessage id={"base.articles"}/>,
          path: PATH.management_articles
        },
        {
          icon: <BookOutlinedIcon />,
          text: <FormattedMessage id={"base.tags"}/>,
          path: PATH.management_tags
        },
        {
          icon: <ManageAccountsOutlinedIcon />,
          text: <FormattedMessage id={"base.users"}/>,
          path: PATH.management_users
        }
      ]
    },
    {
      category: <FormattedMessage id={"base.create"}/>,
      listItemButton: [
        {
          icon: <HistoryEduOutlinedIcon />,
          text: <FormattedMessage id={"base.article"}/>,
          path: PATH.publication_article
        }
      ]
    },
    {
      category: <FormattedMessage id={"base.others"}/>,
      listItemButton: isAuthenticated
        ? [
          {
            icon: <LogoutIcon />,
            text: <FormattedMessage id={"base.logout"}/>,
            path: PATH.others_logout
          }
        ]
        : [
          {
            icon: <LoginIcon />,
            text: <FormattedMessage id={"base.login"}/>,
            path: PATH.others_login
          }
        ]
    },
  ];

  const handleClick = (path) => {
    if (path === PATH.others_logout){
      localStorage.setItem(AUTH.TOKEN, "")
      localStorage.setItem(AUTH.EXPIRE, "")
      window.location.reload() // 刷新 Adminpanel 状态， 否则组件状态不更新
    }else{
      setSelectedPath(path);
      navigator(`/admin_panel/${path}`);
    }
  };

  return (
    <div className={s.layout}>
      <div className={`${s.navigation}`}>
        <aside>
          <List>
            {navigationList.map((section, index) => (
              <div key={index}>
                <small>{section.category}</small>
                {section.listItemButton.map((item, idx) => (
                  <ListItemButton
                    key={idx}
                    icon={item.icon}
                    isSelected={selectedPath === item.path}
                    onClick={() => handleClick(item.path)}
                  >
                    <b>{item.text}</b>
                  </ListItemButton>
                ))}
                <br/>
              </div>
            ))}
          </List>
        </aside>
        <hr/>
      </div>

      <section >
        {PATH.others_login === destination && <Login />}
        {PATH.analysis_dashboard === destination && <Dashboard/>}
        {PATH.management_articles === destination && <ArticleManagement/>}
        {PATH.management_tags === destination && <TagManagement/>}
        {PATH.management_users === destination && <UserManagement/>}
        {PATH.publication_article === destination && <ArticlePublication/>}
      </section>
    </div>
  );
}

AdminPanelPage.propTypes = {
  destination: PropTypes.string
}

export default AdminPanelPage