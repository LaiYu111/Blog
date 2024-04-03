import Panel from "../Panel/index.jsx";
import style from './index.module.scss'
import {useSelector} from "react-redux";
import {useIntl} from "react-intl";


function TableOfContent(){
  const toc = useSelector(state => state.componentReducers.toc.tableOfContent)
  const intl = useIntl()

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const indentMap = {
    H1: 0,
    H2: 20,
    H3: 40,
    H4: 60,
  };

  return (
    <div >
      <Panel>
        <div className={`${style.root}`}>
          <div className={`${style.title}`}>
            {intl.formatMessage({id:"tableOfContent"})}
          </div>

          <div className={`${style.header}`}>
            {toc.map((value, index) => (
              <div
                key={index}
                onClick={() => scrollToId(value.anchorId)}
                className={`${style.link}`}
                style={{marginLeft: `${indentMap[value.level]}px`}}
              >
                {value.name}
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default TableOfContent