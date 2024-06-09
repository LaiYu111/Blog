import s from './index.module.scss'
import List from "@/components/List/index.jsx";
import ListItemButton from "@/components/List/ListItemButton/index.jsx";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useNavigate} from "react-router-dom";
import ArticleManagement from "@/pages/AdminPanelPage/ArticleManagement/index.jsx";
import {PATH} from "@/config.js";
import TagManagement from "@/pages/AdminPanelPage/TagManagement/index.jsx";
import PropTypes from "prop-types";
import UserManagement from "@/pages/AdminPanelPage/UserManagement/index.jsx";
import Dashboard from "@/pages/AdminPanelPage/Dashboard/index.jsx";
import ArticlePublication from "@/pages/AdminPanelPage/ArticlePublication/index.jsx";
import {useState} from "react";

const navigationList = [
  {
    category: "Analysis",
    listItemButton: [
      {
        icon: <SpaceDashboardOutlinedIcon />,
        text: "Dashboard",
        path: PATH.analysis_dashboard
      }
    ]
  },
  {
    category: "Manage",
    listItemButton: [
      {
        icon: <AutoStoriesOutlinedIcon />,
        text: "Articles",
        path: PATH.management_articles
      },
      {
        icon: <BookOutlinedIcon />,
        text: "Tags",
        path: PATH.management_tags
      },
      {
        icon: <ManageAccountsOutlinedIcon />,
        text: "Users",
        path: PATH.management_users
      }
    ]
  },
  {
    category: "Publish",
    listItemButton: [
      {
        icon: <HistoryEduOutlinedIcon />,
        text: "Article",
        path: PATH.publication_article
      }
    ]
  }
];


function AdminPanelPage({ destination }) {
  const [selectedPath, setSelectedPath] = useState(PATH.analysis_dashboard); // 定位
  const navigator = useNavigate();

  const handleClick = (path) => {
    setSelectedPath(path);
    navigator(`/admin_panel/${path}`);
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