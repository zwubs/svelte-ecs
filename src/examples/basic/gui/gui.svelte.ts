import { Component as ECSComponent } from "$lib/ecs/component.svelte";
import type { Component } from "svelte";
import { PositionComponent, VelocityComponent } from "../components.svelte";
import PositionComponentGuiItem from "./components/PositionComponentGuiItem.svelte";
import VelocityComponentGuiItem from "./components/VelocityComponentGuiItem.svelte";
import { createComponentGUI } from "$lib/ecs/gui.svelte";

const componentGUI = createComponentGUI();
componentGUI.add(PositionComponent, PositionComponentGuiItem)

new Map<ECSComponent, Component>([
    [PositionComponent, PositionComponentGuiItem],
    [VelocityComponent, VelocityComponentGuiItem],
]);
