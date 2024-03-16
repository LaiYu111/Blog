import MyEditor from "../../components/MyEditor/index.jsx";
import {Button, Divider} from "antd";
import Preview from "../../components/Preview/index.jsx";

function PublishPage(){
  return(
    <div style={{height:"100%"}}>
      <div>
        <h3> Admin only </h3>
      </div>

      <div style={{display: 'flex', flexDirection: "row", height: "100%"}}>
        <div>
          <div>
            <MyEditor/>
          </div>
          <div>
            <Button>Publish</Button>
          </div>
        </div>

        <div>
          <Divider type={"vertical"} style={{height: "100%"}}/>
        </div>

        <div>
          <Preview/>
        </div>
      </div>
    </div>
  )
}

export default PublishPage