import useGet from "@/hooks/useGet.js";
import {useEffect, useState} from "react";
import {AUTH, BACKEND_URL} from "@/config.js";
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import Panel from "@/components/Panel/index.jsx";
import s from "@/pages/AdminPanelPage/TagManagement/index.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {initUsers} from "@/redux/actions/management/userAction.js";
import PropTypes from "prop-types";
import I18n from "@/components/i18n/index.jsx";

function UserRow({id}){
  const user = useSelector(state => state.management.users.find(x => x._id === id))

  return (
    <>
      <TableCell>{id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell >
        <div className={s.roleCell}>
        {user.roles.map((role, key) => (
          <span key={key}>
            {role}
          </span>
        ))}
        </div>
      </TableCell>
    </>
  )
}

UserRow.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,

};


function UserManagement() {
  const { getData } = useGet()
  const [token] = useState(localStorage.getItem(AUTH.TOKEN))
  const dispatch = useDispatch()
  const users = useSelector(state => state.management.users)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/users`, token)
      dispatch(initUsers(result.data))
    }
    fetchData()
  }, []);


  return(
    <div  className={s.layout}>
      <Panel>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Id</b></TableCell>
                <TableCell><b>{I18n.manageUsersEmail}</b></TableCell>
                <TableCell><b>{I18n.manageUsersRoles}</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users?.map((user)=>(
                <TableRow key={user._id}>
                  <UserRow id={user._id} />
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

export default UserManagement