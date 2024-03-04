import { StatefulComponent, type Component, type ComponentConstructor } from "./component.svelte";

export class Entity {

    protected componentsByConstructors: Map<ComponentConstructor, Component>

    constructor(
        components: Component[] = []
    ) {
        this.componentsByConstructors = new Map(
            components.map(
                (component) => ([component.constructor as ComponentConstructor, component])
            )
        )
    }

    public get<T extends Component>(component: new () => T) {
        return this.componentsByConstructors.get(component) as T | undefined
    }

    public has<T extends Component>(component: new () => T) {
        return this.componentsByConstructors.has(component)
    }

    public add(component: Component) {
        this.componentsByConstructors.set(component.constructor as ComponentConstructor, component);
    }

    delete(component: Component) {
        this.componentsByConstructors.delete(component.constructor as ComponentConstructor)
    }

    get components() { return [...this.componentsByConstructors.values()]; }
}

export class StatefulEntity extends Entity {

    public componentArray: Component[] = $state([])
    public componentsByConstructor = $derived(
        new Map(
            this.components.map(
                (component) => ([component.constructor as typeof Component, component])
            )
        )
    )

    static fromEntity(entity: Entity) {
        if (entity instanceof StatefulEntity)
            throw new Error(`Can't create a ${this.name} from a ${entity.constructor.name}`);
        const components = entity.components.map(component => new StatefulComponent(component));
        return new StatefulEntity(components);
    }

    get components() { return this.componentArray; }

}   