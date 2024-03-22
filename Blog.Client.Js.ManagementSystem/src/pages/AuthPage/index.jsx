import {Button, Input, Space} from "antd";
import {useEffect, useState} from "react";
import usePost from "../../hooks/usePost.js";
import {BACKEND_URL} from "../../config.js";
import {useDispatch} from "react-redux";
import {UserLogin} from "../../redux/actions/userAction.js";
import {useNavigate} from "react-router-dom";

function AuthPage(){
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { postData, data } = usePost()

  useEffect(() => {
    if (data){
      dispatch(UserLogin(data))
      navigator("/")
    }
  }, [data]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    postData(`${BACKEND_URL}/api/User/Login`, {
      "userName": username,
      "password": password
    })
  }

  return (
    <div style={{ height: "100%", display:"flex",justifyContent: "space-evenly"}}>
      <div>
        <p> Username: Guest</p>
        <p> Password: 123</p>
      </div>

      <Space direction={'vertical'}>
        <Input placeholder={"Username/Email"} value={username} onChange={handleUsernameChange} />
        <Input.Password placeholder="Password" value={password}  onChange={handlePasswordChange}  />

        <Space>
          <Button onClick={handleClick}> Login </Button>
        </Space>
      </Space>
    </div>
  )
}

export default AuthPage