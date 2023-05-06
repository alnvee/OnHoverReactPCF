import * as React from "react";

export interface IHoverProps {
  label?: string,
  height?: string,
  width?: string,
  initEvents: () => void
}

export class Hover extends React.Component<IHoverProps> {
  
	componentDidMount(): void {
		//wait 1 second before initializing events
		setTimeout(()=>{
			console.log("component did mount");
			this.props.initEvents();
		}, 1000);
		
	}

	public render(): React.ReactNode {

		return (
		
			<div style={{ height: this.props.height + "px", width: this.props.width+ "px" }}
			>
				{this.props.label}
			</div>
		);
	}
}
