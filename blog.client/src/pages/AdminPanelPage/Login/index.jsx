import s from './index.module.scss'
import Button from "@/components/Button/index.jsx";
import {useEffect, useState} from "react";
import usePost from "@/hooks/usePost.js";
import {AUTH, BACKEND_URL, GUEST, NOTIFICATION} from "@/config.js";
import useNotification from "@/hooks/useNotification.js";
import Notification from "@/components/Notification/index.jsx";
import {useNavigate} from "react-router-dom";
function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {postData, error:postError} = usePost()
  const { notifications, showNotification, hideNotification } = useNotification();
  const navigator = useNavigate()

  useEffect(() => {
    const showErrorNotification = (error) => {
      if (error && error.response) {
        showNotification(`[${error.response.statusText}]: ${error.response.data.message}`, NOTIFICATION.WARNING);
      }
    };

    showErrorNotification(postError);
  }, [ postError]);

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    const result = await postData(`${BACKEND_URL}/api/auth/login`, {
      email: email,
      password: password
    })
    if (result){
      localStorage.setItem(AUTH.TOKEN, result.access_token)
      localStorage.setItem(AUTH.EXPIRE, result.expires_in)
      navigator('/admin_panel/analysis/dashboard')
      window.location.reload()
    }
  }

  const handleLoginAsGuest = async () => {
    const result = await postData(`${BACKEND_URL}/api/auth/login`, {
      email: GUEST.EMAIL,
      password: GUEST.PASSWORD
    })
    if (result){
      localStorage.setItem(AUTH.TOKEN, result.access_token)
      localStorage.setItem(AUTH.EXPIRE, result.expires_in)
      navigator('/admin_panel/analysis/dashboard')
      window.location.reload()
    }
  }

  return (
    <>
    <Notification onClose={hideNotification} notifications={notifications} />
      <div className={s.layout}>

        <div >

          <small>
            Guest user <b>can</b> <b>Create Articles</b>;
            <br/>
            Guest user <b>cannot</b>
            <ul>
              <li><b>Publish/Delete/Update Articles</b>;</li>
              <li><b>Create/Delete/Update Tags</b>;</li>
            </ul>
          </small>
          <Button onClick={handleLoginAsGuest}>
            Guest
          </Button>
        </div>

        <small>
          or
        </small>

        <form>
          <label>Email</label>
          <input type="text" value={email} onChange={handleEmail} required/>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePassword} required/>
          <Button onClick={handleLogin}>Login</Button>

        </form>
      </div>
    </>
  )
}

export default Login