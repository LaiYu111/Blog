import useGet from "@/hooks/useGet.js";
import {useDispatch, useSelector} from "react-redux";
import s from "@/pages/AdminPanelPage/TagManagement/index.module.scss";
import Panel from "@/components/Panel/index.jsx";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useEffect} from "react";
import {BACKEND_URL} from "@/config.js";
import {initArticle} from "@/redux/actions/management/articleAction.js";
import PropTypes from "prop-types";
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined.js";
import {useNavigate} from "react-router-dom";


function ArticleRow({ id, title, createdDate, modifiedDate }) {
  const navigator = useNavigate()

  const handleRouting = () => {
    navigator(`/admin_panel/publication/article/?modify_mode=true&article_id=${id}`)
  }

  return (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{createdDate}</TableCell>
      <TableCell>{modifiedDate}</TableCell>
      <TableCell>
        {/* Add icons or buttons for actions */}
        <IconButton><DeleteOutlineOutlinedIcon/></IconButton>
        <IconButton onClick={handleRouting}><HandymanOutlinedIcon /></IconButton>
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