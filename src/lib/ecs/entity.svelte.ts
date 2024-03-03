import type { Component } from "./component.svelte";

export const createEntity = (initialComponents: Component[]) => {

    let components = initialComponents;

    let componentsByConstructor = new Map(components.map((component) => ([component.constructor as typeof Component, component])));

    return {
        get<T extends Component>(component: new () => T) { return componentsByConstructor.get(component) as T | undefined },
        has<T extends Component>(component: new () => T) { return componentsByConstructor.has(component) },
        add(componentToAdd: Component) { components.push(componentToAdd); },
        delete(componentToDelete: Component) { components = components.filter(component => component !== componentToDelete) },
        get components() { return components; }
    }
}

export type Entity = ReturnType<typeof createEntity>;