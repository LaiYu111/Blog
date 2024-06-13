import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: 'Frontend' },
  { id: 1, value: 15, label: 'Backend' },
  { id: 2, value: 20, label: 'Deployment' },
  { id: 3, value: 30, label: 'Deployment' },
  { id: 4, value: 40, label: 'Deployment' },
  { id: 5, value: 50, label: 'Deployment' },
  { id: 6, value: 60, label: 'Deployment' },
  { id: 7, value: 70, label: 'Deployment' },
  { id: 8, value: 80, label: 'Deployment' },
  { id: 9, value: 90, label: 'Deployment' }, { id: 6, value: 70, label: 'Deployment' },
  { id: 10, value: 100, label: 'Deployment' },
  { id: 11, value: 110, label: 'Deployment' },

];
function Dashboard(){

  return (
    <div className={s.dashboardLayout}>

      <Panel className={s.demo}>
        <PieChart
          slotProps={{
            legend: {hidden : false}
          }}
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            }
          ]}
          height={300}
        />
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