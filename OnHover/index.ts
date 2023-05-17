import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Hover, IHoverProps } from "./Hover";
import * as React from "react";

export class OnHover implements ComponentFramework.ReactControl<IInputs, IOutputs> {
	private _notifyOutputChanged: () => void;
	private _isHovered: boolean;
	private _isClicked: boolean;

	constructor() {
		this._isHovered = false;
	}

	public init(
		context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary
	): void {
		this._notifyOutputChanged = notifyOutputChanged;
		context.mode.trackContainerResize(true);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
		const width: number = parseInt(context.mode.allocatedWidth.toString());
		const height: number = parseInt(context.mode.allocatedHeight.toString());

		const handleMouseEnter = (): void => {
			this._isHovered = true;
			this._isClicked = false;
			this._notifyOutputChanged();
		};

		const handleMouseLeave = (): void => {
			this._isHovered = false;
			this._isClicked = false;
			this._notifyOutputChanged();
		};

		const handleMouseClick = (): void => {
			this._isClicked = true;
			this._notifyOutputChanged();
		};


		const props: IHoverProps = { 
			label: "", //for testing ,
			height: height.toString(),
			width: width.toString(),
			parentContainerId: context.parameters.ParentContainerId.raw || "",
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onMouseClick: handleMouseClick
		};
		return React.createElement(
			Hover, props
		);
	}

	public getOutputs(): IOutputs {
		return { 
			IsHovered: this._isHovered,
			IsClicked: this._isClicked,
		};
	}

	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}
