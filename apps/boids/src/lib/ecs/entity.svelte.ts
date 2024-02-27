import type { Component } from "./component.svelte";

export const createEntity = (initialComponents: Component[]) => {

    let components = initialComponents;

    let componentsByConstructor = new Map(components.map((component) => ([component.constructor as typeof Component, component])));

    return {
        get components() { return components; },
        get componentsByConstructor() { return componentsByConstructor; },
        add(componentToAdd: Component) { components.push(componentToAdd); },
        delete(componentToDelete: Component) { components = components.filter(component => component !== componentToDelete) }
    }
}

export type Entity = ReturnType<typeof createEntity>;