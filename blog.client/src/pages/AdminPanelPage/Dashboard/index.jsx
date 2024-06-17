import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import { PieChart } from '@mui/x-charts/PieChart';
import Switch from "@/components/Switch/index.jsx";
import {useEffect, useState} from "react";
import useGet from "@/hooks/useGet.js";
import {BACKEND_URL} from "@/config.js";
import TagSelector from "@/components/TagSelector/index.jsx";

// const data = [
//   { id: 0, value: 10, label: 'Frontend' },
//   { id: 1, value: 15, label: 'Backend' },
//   { id: 2, value: 20, label: 'Deployment' },
//   { id: 3, value: 30, label: 'Deployment' },
//   { id: 4, value: 40, label: 'Deployment' },
//   { id: 5, value: 50, label: 'Deployment' },
//   { id: 6, value: 60, label: 'Deployment' },
//   { id: 7, value: 70, label: 'Deployment' },
//   { id: 8, value: 80, label: 'Deployment' },
//   { id: 9, value: 90, label: 'Deployment' },
//   { id: 10, value: 100, label: 'Deployment' },
//   { id: 11, value: 110, label: 'Deployment' },
//
// ];
function Dashboard(){
  const {getData} = useGet()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/statistic/tag/tag-distribution`)
      const tempData = result.data.distribution.map((data, index) => {
        let id;
        let value;
        let label;
        if (data.name === null) {
          id = index;
          label = "Untagged"
          value = data.count
        }else{
          id = data.tagId
          label = data.name
          value = data.count
        }
        return {
          id: id,
          label: label,
          value: value
        }
      })
      setData(tempData)
    }
    fetchData()
  }, []);

  return (
    <div className={s.dashboardLayout}>
      {/*<TagSelector/>*/}

      <Panel className={s.demo}>
        <b>Distribution</b>
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
    </div>
  )
}

export default Dashboard