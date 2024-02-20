export interface AppState{
	componentReducers: {
		nav: {
			hidden: boolean;
		};
		popup:{
			hidden: boolean
		}
	};
	systemReducers: {
		media: {
			device: string
		}
	}
}