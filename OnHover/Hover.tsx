import * as React from "react";

export interface IHoverProps {
  label?: string,
  height?: string,
  width?: string,
  parentContainerId: string,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
  onMouseClick: () => void,
}

export class Hover extends React.Component<IHoverProps> {
	private _element: HTMLDivElement | null = null;
	private _targetElement: HTMLDivElement |null | undefined = null;

	componentDidUpdate(prevProps: Readonly<IHoverProps>): void {
		if (this.props.parentContainerId === prevProps.parentContainerId) {
			// Skip if container id is the same
			return;
		}
      
		// Remove event listeners from previous element
		if (this._targetElement) {
			this._targetElement.removeEventListener("mouseenter", this.props.onMouseEnter);
			this._targetElement.removeEventListener("mouseleave", this.props.onMouseLeave);
			this._targetElement.removeEventListener("click", this.props.onMouseClick);
		}
      
		// Update target element reference based on current parentContainerId
		this._targetElement = this._element?.closest(`[data-control-name="${this.props.parentContainerId}"]`);
      
		// Add event listeners to the new element
		if (this._targetElement) {
			this._targetElement.addEventListener("mouseenter", this.props.onMouseEnter);
			this._targetElement.addEventListener("mouseleave", this.props.onMouseLeave);
			this._targetElement.addEventListener("click", this.props.onMouseClick);
		}
	}
      

	componentDidMount(): void {
		this._targetElement = this._element?.closest(`[data-control-name="${this.props.parentContainerId}"]`);
		if (this._targetElement) {
			this._targetElement.addEventListener("mouseenter", this.props.onMouseEnter);
			this._targetElement.addEventListener("mouseleave", this.props.onMouseLeave);
			this._targetElement.addEventListener("click", this.props.onMouseClick);
		}
	}

	componentWillUnmount(): void {
		const targetElement = this._element?.closest(`[data-control-name="${this.props.parentContainerId}"]`);
		if (targetElement) {
			targetElement.removeEventListener("mouseenter", this.props.onMouseEnter);
			targetElement.removeEventListener("mouseleave", this.props.onMouseLeave);
			targetElement.removeEventListener("click", this.props.onMouseClick);
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