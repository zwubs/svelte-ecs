import type { ComponentType } from "svelte"
import type { Component } from "./component.svelte"

export const createComponentGUI = () => {

	const guiItemsByComponentConstructors = new Map();

	return {
		add(component: typeof Component, gui: ComponentType) {
			guiItemsByComponentConstructors.set(component, gui)
		}
	}
}