import useGet from "@/hooks/useGet.js";
import {useDispatch, useSelector} from "react-redux";
import s from "@/pages/AdminPanelPage/TagManagement/index.module.scss";
import Panel from "@/components/Panel/index.jsx";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useEffect} from "react";
import {BACKEND_URL} from "@/config.js";
import {deleteArticle, initArticle} from "@/redux/actions/management/articleAction.js";
import PropTypes from "prop-types";
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined.js";
import {useNavigate} from "react-router-dom";
import useDelete from "@/hooks/useDelete.js";
import useNotification from "@/hooks/useNotification.js";
import Notification from "@/components/Notification/index.jsx";


function ArticleRow({ id, title, createdDate, modifiedDate }) {
  const navigator = useNavigate()
  const { notifications, showNotification, hideNotification } = useNotification();
  const {deleteData} = useDelete()
  const dispatch = useDispatch()

  const handleRouting = () => {
    navigator(`/admin_panel/publication/article/?modify_mode=true&article_id=${id}`)
  }

  const handleDeleteArticle = async () => {
    try {
      const result = await deleteData(`${BACKEND_URL}/api/articles`, [id]);
      showNotification(result.message);
      handleDeleteDispatch()
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  const handleDeleteDispatch = () => {
    setTimeout(() => {
      dispatch(deleteArticle(id));
    }, 1000)
  }

  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{createdDate}</TableCell>
      <TableCell>{modifiedDate}</TableCell>
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
  title: PropTypes.string,
  createdDate: PropTypes.string,
  modifiedDate: PropTypes.string,
};

function ArticleManagement(){
  const { getData } = useGet()
  const dispatch = useDispatch()
  const articles = useSelector(state => state.management.articles)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/articles`)
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
                <TableCell><b>Article Title</b></TableCell>
                <TableCell><b>Created Date</b></TableCell>
                <TableCell><b>Modified Date</b></TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles?.map((article) => (
                <ArticleRow
                  key={article._id}
                  id={article._id}
                  title={article.title}
                  createdDate={article.createDate}
                  modifiedDate={article.modifyDate}
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