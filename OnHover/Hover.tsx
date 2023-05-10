import * as React from "react";

export interface IHoverProps {
  label?: string,
  height?: string,
  width?: string,
  parentContainerId: string,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}

export class Hover extends React.Component<IHoverProps> {
	private _element: HTMLDivElement | null = null;

	componentDidMount(): void {
		const targetElement = this._element?.closest(`[data-control-name="${this.props.parentContainerId}"]`);
		if (targetElement) {
			targetElement.addEventListener("mouseenter", this.props.onMouseEnter);
			targetElement.addEventListener("mouseleave", this.props.onMouseLeave);
		}
	}

	componentWillUnmount(): void {
		const targetElement = this._element?.closest(`[data-control-name="${this.props.parentContainerId}"]`);
		if (targetElement) {
			targetElement.removeEventListener("mouseenter", this.props.onMouseEnter);
			targetElement.removeEventListener("mouseleave", this.props.onMouseLeave);
		}
	}

	render(): React.ReactNode {
		const { label, height, width } = this.props;

		return (
			<div
				ref={(ref) => this._element = ref}
				style={{ height: `${height}px`, width: `${width}px` }}
			>
				{label}
			</div>
		);
	}
}