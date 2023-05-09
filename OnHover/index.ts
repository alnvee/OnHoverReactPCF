
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Hover, IHoverProps } from "./Hover";
import * as React from "react";

export class OnHover implements ComponentFramework.ReactControl<IInputs, IOutputs> {
	private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
	private _notifyOutputChanged: () => void;
	private _isHovered:boolean;
	private _isClicked:boolean;
	private _mouseX:number;
	private _mouseY:number;
	private _isInsideContainer:boolean;
	//private _rect: any;
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() { }
	public init(
		context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary
	): void {
		this._notifyOutputChanged = notifyOutputChanged;
		context.mode.trackContainerResize(true);
		this._isHovered = false;
		this._isClicked = false;
		this._mouseX = 0;
		this._mouseY = 0;
    
	}
	public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const width:number  = parseInt(context.mode.allocatedWidth.toString());
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const height:number  = parseInt(context.mode.allocatedHeight.toString());

		//attach event listeners tom target element
		const initEventListener = ():void => {

			const targetElement = document.querySelector(`[data-control-name="${context.parameters.TargetControlId.raw}"]`);

			if(targetElement != null){
				
				targetElement.addEventListener("mouseenter", () => {
					this._isInsideContainer = true;
				});
				targetElement.addEventListener("mouseleave", () => {
					this._isInsideContainer = false;
					
				});
				document.addEventListener("mousemove", (e) => {
					if(this._isInsideContainer && !this._isHovered){
				
						this._isHovered = true;
					}
					else if(!this._isInsideContainer && this._isHovered){
			
						this._isHovered = false;
					}
					this._mouseX = e.pageX;
					this._mouseY = e.pageY;

					this._notifyOutputChanged();
				});

				targetElement.addEventListener("mousedown", () => {
					if(!this._isClicked){ 
						this._isClicked = true;
						this._notifyOutputChanged();
					}
				});
				document.addEventListener("mouseup", () => {
					if(this._isClicked){ 
						this._isClicked = false;
						this._notifyOutputChanged();
					}
				});
			}
		};

		const props: IHoverProps = { 
			label: "", //for testing ,
			height: height.toString(),
			width: width.toString(),
			initEvents: initEventListener
		};
		return React.createElement(
			Hover, props
		);
	}
	
	public getOutputs(): IOutputs {
		return { 
			IsHovered: this._isHovered,
			IsClicked: this._isClicked,
			XCoordinate: this._mouseX,
			YCoordinate: this._mouseY,
		};
	}
	
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}
