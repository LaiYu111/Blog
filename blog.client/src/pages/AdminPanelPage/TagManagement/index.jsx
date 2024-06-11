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
import {BACKEND_URL} from "@/config.js";
import Tag from "@/components/Tag/index.jsx";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from "prop-types";
import ColorPicker from "@/components/ColorPicker/index.jsx";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {useDispatch, useSelector} from "react-redux";
import {deleteTags, initTags, setTags} from "@/redux/actions/management/tagAction.js";
import usePut from "@/hooks/usePut.js";
function TagRow({id, name:t_name, bgColor: t_bgColor, textColor: t_textColor}) {
  const [name, setName] = useState(t_name)
  const [bgColor, setBgColor] = useState(t_bgColor)
  const [textColor, setTextColor] = useState(t_textColor)
  const dispatch = useDispatch()
  const { putData} = usePut()

  useEffect(() => {
    dispatch(setTags({
      id: id,
      name: name,
      bgColor: bgColor,
      textColor: textColor
    }))
  }, [name, bgColor, textColor]);

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleUpdate = () => {
    putData(`${BACKEND_URL}/api/tags`, {
      id: id,
      tag: {
        name: name,
        bgColor: bgColor,
        textColor: textColor
      }
    })
  }

  const handleDelete = () => {
    dispatch(deleteTags(id))
  }

  return (
    <>
      <TableCell>{id}</TableCell>
      <TableCell><Tag name={name} bgColor={bgColor} textColor={textColor}/> </TableCell>
      <TableCell><input value={name} onChange={handleChange}/></TableCell>
      <TableCell>
        <div className={s.rowItems}>
          <ColorPicker onChange={setBgColor} color={bgColor} />
          {bgColor}
        </div>
      </TableCell>
      <TableCell>
        <div className={s.rowItems}>
          <ColorPicker color={textColor} onChange={setTextColor} />
          {textColor}
        </div>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}><DeleteOutlineOutlinedIcon/></IconButton>
        <IconButton onClick={handleUpdate}><CheckOutlinedIcon/></IconButton>
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/tags`)
      dispatch(initTags(result.data))
    }
    fetchData()
  }, []);

  return(
    <div className={s.layout}>
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