import Panel from "@/components/Panel/index.jsx";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@mui/material";
import s from './index.module.scss'
import useGet from "@/hooks/useGet.js";
import {useEffect, useState} from "react";
import {BACKEND_URL, NOTIFICATION} from "@/config.js";
import Tag from "@/components/Tag/index.jsx";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from "prop-types";
import ColorPicker from "@/components/ColorPicker/index.jsx";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {useDispatch, useSelector} from "react-redux";
import {addTag, deleteTags, initTags, setTags} from "@/redux/actions/management/tagAction.js";
import usePut from "@/hooks/usePut.js";
import Notification from "@/components/Notification/index.jsx";
import useNotification from "@/hooks/useNotification.js";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import usePost from "@/hooks/usePost.js";
import useDelete from "@/hooks/useDelete.js";

function TagRow({id, name:t_name, bgColor: t_bgColor, textColor: t_textColor}) {
  const [name, setName] = useState(t_name)
  const [bgColor, setBgColor] = useState(t_bgColor)
  const [textColor, setTextColor] = useState(t_textColor)
  const dispatch = useDispatch()
  const { notifications, showNotification, hideNotification } = useNotification();
  const { putData, error:putError} = usePut()
  const {deleteData, error:deleteError} = useDelete()

  useEffect(() => {
    dispatch(setTags({
      id: id,
      name: name,
      bgColor: bgColor,
      textColor: textColor
    }))
  }, [name, bgColor, textColor]);

  useEffect(() => {
    const showErrorNotification = (error) => {
      if (error && error.response) {
        showNotification(`[${error.response.statusText}]: ${error.message}`, NOTIFICATION.WARNING);
      }
    };

    showErrorNotification(putError);
    showErrorNotification(deleteError);
  }, [putError, deleteError]);

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleUpdate = async () => {
    const result = await putData(`${BACKEND_URL}/api/tags`, {
      id: id,
      tag: {
        name: name,
        bgColor: bgColor,
        textColor: textColor
      }
    })
    showNotification(result.message, NOTIFICATION.INFORMATION)
  }

  const handleDelete = async () => {
    const result = await deleteData(`${BACKEND_URL}/api/tags`, [id]);
    if(result){
      showNotification(result.message, NOTIFICATION.INFORMATION);
      handleDeleteDispatch()
    }
  }

  const handleDeleteDispatch = () => {
    setTimeout(() => {
      dispatch(deleteTags(id))
    }, 1000)
  }

  return (

    <>
      <TableCell>{id}</TableCell>
      <TableCell><Tag name={name} bgColor={bgColor} textColor={textColor}/> </TableCell>
      <TableCell><input value={name} onChange={handleChange}/></TableCell>
      <TableCell>
        <span className={s.rowItems}>
          <ColorPicker onChange={setBgColor} color={bgColor} />
          {bgColor}
        </span>
      </TableCell>
      <TableCell>
        <span className={s.rowItems}>
          <ColorPicker color={textColor} onChange={setTextColor} />
          {textColor}
        </span>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}><DeleteOutlineOutlinedIcon/></IconButton>
        <IconButton onClick={handleUpdate}><CheckOutlinedIcon/></IconButton>
        <Notification onClose={hideNotification} notifications={notifications} />
      </TableCell>
    </>
  )
}

TagRow.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};


function TagManagement() {
  const { getData } = useGet()
  const dispatch = useDispatch()
  const tags = useSelector(state => state.management.tags)
  const { notifications, showNotification, hideNotification } = useNotification();
  const { postData, error } = usePost()

  // new tag
  const [name, setName] = useState('Tag')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/tags`)
      dispatch(initTags(result.data))
    }
    fetchData()
  }, []);

  useEffect(() => {
    if(error){
      showNotification(`[${error.response.statusText}]: ${error.message}`, NOTIFICATION.WARNING)
    }
  }, [error]);

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const newTag = () =>{
    return {
      name: name,
      bgColor: bgColor,
      textColor: textColor
    }
  }

  const handleCreateTag = async () => {
    const result = await postData(`${BACKEND_URL}/api/tags`, newTag())
    if (result){
      showNotification(result.message)
      dispatch(addTag(result.data))
    }
  }

  return(
    <div className={s.layout}>
      <Notification onClose={hideNotification} notifications={notifications} />
      <Panel>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Id</b></TableCell>
                <TableCell><b>Tag</b></TableCell>
                <TableCell><b>Tag name</b></TableCell>
                <TableCell><b>Background Color</b></TableCell>
                <TableCell><b>Text Color</b></TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell><b>Create a tag</b></TableCell>
                <TableCell><Tag name={name} bgColor={bgColor} textColor={textColor}/></TableCell>
                <TableCell><input value={name} onChange={handleChange}/></TableCell>
                <TableCell>
                  <span className={s.rowItems}>
                    <ColorPicker onChange={setBgColor} color={bgColor} />
                    {bgColor}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={s.rowItems}>
                    <ColorPicker color={textColor} onChange={setTextColor} />
                    {textColor}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleCreateTag}><AddCircleOutlineOutlinedIcon/></IconButton>
                </TableCell>
              </TableRow>


              {tags?.map((tag)=>(
                <TableRow key={tag._id}>
                  <TagRow name={tag.name} bgColor={tag.bgColor} textColor={tag.textColor} id={ tag._id} />
                </TableRow>
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

export default TagManagement