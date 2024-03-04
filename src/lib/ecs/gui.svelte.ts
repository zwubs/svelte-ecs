import type { ComponentType } from "svelte";
import { PositionComponent } from "./components.svelte";
import PositionIcon from 'virtual:icons/lucide/locate-fixed';
import type { Component } from "./component.svelte";

type ComponentGui<T extends Component> = {
	title: string;
	icon: ComponentType;
	properties: {
		[key in keyof T]: { type: 'slider', name: string, max?: number, min?: number, unit?: string };
	}
}

const PositionComponentGui: ComponentGui<PositionComponent> = {
	title: 'Position',
	icon: PositionIcon,
	properties: {
		x: { type: "slider", name: "X" },
		y: { type: "slider", name: "Y" }
	}
}

export default new Map([
	[PositionComponent, { title: 'Position', icon: PositionIcon, properties: { x: { type: 'slider', name: 'X', max: 100, unit: 'px' }, y: { type: 'slide', max: 100 } } }]
])