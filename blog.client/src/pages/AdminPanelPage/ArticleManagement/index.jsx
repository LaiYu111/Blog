import useGet from "@/hooks/useGet.js";
import {useDispatch, useSelector} from "react-redux";
import s from "@/pages/AdminPanelPage/TagManagement/index.module.scss";
import Panel from "@/components/Panel/index.jsx";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {AUTH, BACKEND_URL, NOTIFICATION} from "@/config.js";
import {
  deleteArticle,
  initArticle,
  setArticlePublication
} from "@/redux/actions/management/articleAction.js";
import PropTypes from "prop-types";
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined.js";
import {useNavigate} from "react-router-dom";
import useDelete from "@/hooks/useDelete.js";
import useNotification from "@/hooks/useNotification.js";
import Notification from "@/components/Notification/index.jsx";
import Switch from "@/components/Switch/index.jsx";
import usePut from "@/hooks/usePut.js";
import I18n from "@/components/i18n/index.jsx";


function ArticleRow({ id }) {
  const navigator = useNavigate()
  const { notifications, showNotification, hideNotification } = useNotification();
  const {deleteData, error: deleteError} = useDelete()
  const {putData, error: putError} = usePut()
  const article = useSelector(state => state.management.articles.find(x => x._id === id))
  const dispatch = useDispatch()
  const [token] = useState(localStorage.getItem(AUTH.TOKEN))

  useEffect(() => {
    const showErrorNotification = (error) => {
      if (error && error.response) {
        showNotification(`[${error.response.statusText}]: ${error.message}`, NOTIFICATION.WARNING);
      }
    };

    showErrorNotification(deleteError);
    showErrorNotification(putError);
  }, [deleteError, putError]);

  const handleRouting = () => {
    navigator(`/admin_panel/publication/article/?modify_mode=true&article_id=${id}`)
  }

  const handleDeleteArticle = async () => {
    const result = await deleteData(`${BACKEND_URL}/api/articles`, [id],token);
    if (result){
      showNotification(result.message);
      handleDeleteDispatch()
    }
  }


  const handleDeleteDispatch = () => {
    setTimeout(() => {
      dispatch(deleteArticle(id));
    }, 1000)
  }

  const handlePublication = async () => {
    const result = await putData(`${BACKEND_URL}/api/articles/published`, {
      id: id,
      isPublished: !article.isPublished
    }, token)
    if (result){
      dispatch(setArticlePublication(id))
      showNotification(result.message);
    }
  }

  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>{article.title}</TableCell>
      <TableCell>{article.createDate}</TableCell>
      <TableCell>{article.modifyDate}</TableCell>
      <TableCell><Switch value={article.isPublished} onChange={handlePublication}/> </TableCell>
      <TableCell>
        <IconButton onClick={handleDeleteArticle}><DeleteOutlineOutlinedIcon/></IconButton>
        <IconButton onClick={handleRouting}><HandymanOutlinedIcon /></IconButton>
        <Notification onClose={hideNotification} notifications={notifications} />
      </TableCell>
    </TableRow>
  );
}

ArticleRow.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

function ArticleManagement(){
  const { getData } = useGet()
  const dispatch = useDispatch()
  const [token] = useState(localStorage.getItem(AUTH.TOKEN))
  const articles = useSelector(state => state.management.articles)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/articles`, token)
      dispatch(initArticle(result.data))
    }
    fetchData()
  }, []);

  return (
    <div className={s.layout}>
      <Panel>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Id</b></TableCell>
                <TableCell><b>{I18n.manageArticlesTitle}</b></TableCell>
                <TableCell><b>{I18n.manageArticlesCreatedDate}</b></TableCell>
                <TableCell><b>{I18n.manageArticlesModifiedDate}</b></TableCell>
                <TableCell><b>{I18n.manageArticlesPublish}</b></TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles?.map((article) => (
                <ArticleRow
                  key={article._id}
                  id={article._id}
                />
              ))}
            </TableBody>
            <TableFooter>

            </TableFooter>
          </Table>
        </TableContainer>
      </Panel>
    </div>
  )
}

export default ArticleManagement