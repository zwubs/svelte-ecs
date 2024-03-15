import { Component } from "$lib/ecs/component.svelte";
import type { ComponentType } from "svelte";
import { PositionComponent, VelocityComponent } from "../components.svelte";
import PositionComponentGuiItem from "./components/PositionComponentGuiItem.svelte";
import VelocityComponentGuiItem from "./components/VelocityComponentGuiItem.svelte";
import { createComponentGUI } from "$lib/ecs/gui.svelte";

const componentGUI = createComponentGUI();
componentGUI.add(PositionComponent, PositionComponentGuiItem)

new Map<Component, ComponentType>([
    [PositionComponent, PositionComponentGuiItem],
    [VelocityComponent, VelocityComponentGuiItem],
]);
