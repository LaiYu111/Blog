import {useEffect, useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  UnorderedListOutlined,
  TagsOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import HomePage from "./pages/HomePage/index.jsx";
import PublishPage from "./pages/PublishPage/index.jsx";
import AuthPage from "./pages/AuthPage/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {SetUserDetail, UserLogout} from "./redux/actions/userAction.js";
import ArticlesPage from "./pages/ArticlesPage/index.jsx";
import TagPage from "./pages/TagPage/index.jsx";
const { Header, Sider, Content } = Layout;



function App() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const userToken = useSelector( state => state.systemReducers.user.token)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    var useDetail = localStorage.getItem('token');
    var expirationTime = localStorage.getItem('tokenExpiration');

    const currentTime = new Date().getTime();

    if (currentTime > expirationTime) {
      // Token 过期，删除 localStorage 中的相关数据
      localStorage.removeItem('useDetail');
      localStorage.removeItem('tokenExpiration');

      // 清除当前数据
      // useDetail = null;
      expirationTime = null;
    }

    // token 没有过期，则设置
    if (expirationTime) {
      dispatch(SetUserDetail(JSON.parse(useDetail)))
    }
    else{
      navigator('/auth')
    }
  }, []);

  const handleLogout = () => {
    dispatch(UserLogout())
  }

  const handleLogin = () => {
    navigator('/auth')
  }

  return (
    <>
      <Layout style={{ height: "inherit"}}>
        <Sider trigger={null} collapsible collapsed={collapsed} breakpoint={"md"}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "1",
                label: <Link to="/" >Home</Link>,
                icon:<HomeOutlined />,
              },
              {
                key: "2",
                label: <Link to="/publish" >Publish</Link>,
                icon:<BookOutlined />,
              },
              {
                key: "3",
                label: <Link to="/articles" >Articles</Link>,
                icon: <UnorderedListOutlined />
              },
              {
                key: "4",
                label: <Link to="/tags" >Tags</Link>,
                icon: <TagsOutlined />
              }
            ]}
          >
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, display:'flex', justifyContent:"space-between" }}>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            {
              userToken !== "" ? (
                <div>
                  <Button
                    type="text"
                    icon={<LogoutOutlined/>}
                    onClick={handleLogout}
                    style={{
                      fontSize: '16px',
                      width: 64,
                      height: 64,
                    }}
                  />
                </div>
              ):(
                <div>
                  <Button
                    type="text"
                    icon={<UserOutlined />}
                    onClick={handleLogin}
                    style={{
                      fontSize: '16px',
                      width: 64,
                      height: 64,
                    }}
                  />
                </div>
              )
            }

          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              height: "inherit",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
            <Route path={'/'} element={<HomePage/>}/>
              <Route path={'/publish'} element={<PublishPage/>}/>
              <Route path={'/auth'} element={<AuthPage />} />
              <Route path={'/articles'} element={<ArticlesPage/>}/>
              <Route path={'/tag'} element={<TagPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
