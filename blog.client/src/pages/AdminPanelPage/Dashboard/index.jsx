import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
function Dashboard(){
  return (
    <div className={s.dashboardLayout}>
      <Panel className={s.demo}>
        Dashboard
      </Panel>
      <Panel className={s.demo}>
        Dashboard
      </Panel>
      <Panel className={s.demo}>
        Dashboard
      </Panel>
    </div>
  )
}

export default Dashboard