
import Panel from "../../components/Panel";
import image from '../../assets/aaa.jpg'
import {Card} from "@mui/material";
import Cover from "../../components/Cover/index.jsx";

function HomePage () {



	return (
		<div>
			<div style={{ display: "grid", width: "100%", gridTemplateColumns:"70% 29% "}}>
				<div>
					<Card img={image } title={'1'} caption={'1'} />
				</div>
				<div style={{ display: "grid", width: "100%", gridGap:"10px", gridTemplateRows:"48% 48%", alignItems:"center"}}>
					<Card img={image} title={'1'} caption={'1'}/>
					<Card img={image} title={'1'} caption={'1'}/>
				</div>
			</div>

			<Panel>
				{ [1,2,3].map( (key , value) => (
					<div key={value}>
						<Cover title={"1"} content={"1"} author={"1"} like={1} articleID={key} image={image}  />
						<hr />
					</div>
				))}
			</Panel>
		</div>
	)
}

export default HomePage