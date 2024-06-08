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

function AdminPanelPage({destination}){
  const navigator = useNavigate()
  const handleClick = (path) => {
    navigator(`/admin_panel/${path}`)
  }


  return (
    <div className={s.layout}>
      <aside>
        <List>
          <small>Analysis</small>
          <ListItemButton isSelected={true} icon={<SpaceDashboardOutlinedIcon fontSize={"large"} />} onClick={() => handleClick(PATH.analysis_dashboard)}>
            <b>Dashboard</b>
          </ListItemButton>
          <br/>
          <small>Manage</small>
          <ListItemButton icon={<AutoStoriesOutlinedIcon />} onClick={() => handleClick(PATH.management_articles)}>
            <b>Articles</b>
          </ListItemButton>
          <ListItemButton icon={<BookOutlinedIcon />} onClick={() => handleClick(PATH.management_tags)}>
            <b>Tags</b>
          </ListItemButton>
          <ListItemButton icon={<ManageAccountsOutlinedIcon />} onClick={() => handleClick(PATH.management_users)}>
            <b>Users</b>
          </ListItemButton>
          <br/>
          <small>Publish</small>
          <ListItemButton icon={<HistoryEduOutlinedIcon /> }  onClick={() => handleClick(PATH.publication_article)}>
            <b>Article</b>
          </ListItemButton>
        </List>
      </aside>
      <hr />
      <section>
        { PATH.analysis_dashboard === destination && <Dashboard />}
        { PATH.management_articles === destination && <ArticleManagement /> }
        { PATH.management_tags === destination && <TagManagement /> }
        { PATH.management_users === destination && <UserManagement /> }
        { PATH.publication_article === destination && <ArticlePublication /> }
      </section>
    </div>
  )
}

AdminPanelPage.propTypes = {
  destination: PropTypes.string
}

export default AdminPanelPage