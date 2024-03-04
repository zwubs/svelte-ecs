export class Component { }

export type ComponentConstructor<T extends Component = Component> = new () => T

export class StatefulComponent {
    public component = $state<Component>()

    constructor(component: Component) {
        this.component = { ...component }
    }
}

export class HiddenComponent extends Component { }