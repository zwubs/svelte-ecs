<script lang="ts">
    import { scale } from "../../constants";
    import type { Canvas } from "../canvas.svelte";
    import {
        MassComponent,
        NameComponent,
        PositionComponent,
    } from "../components.svelte";
    import type { Entity } from "../entity.svelte";
    import type { Updater } from "../updater.svelte";

    let { canvas, updater, entities } = $props<{
        canvas: Canvas;
        updater: Updater;
        entities: Set<Entity>;
    }>();
    updater.add(() => {
        canvas.context.font = "12px Arial";
        canvas.context.fillStyle = "#FFF";
        entities.forEach((entity) => {
            const position = entity.componentsByConstructor.get(
                PositionComponent,
            ) as PositionComponent;
            const name = entity.componentsByConstructor.get(
                NameComponent,
            ) as NameComponent;
            if (!position || !name) return;
            const x = canvas.width / 2 + position.x * scale;
            const y = canvas.height / 2 + position.y * scale;
            canvas.context.fillText(name.name, x + 12, y + 4);
        });
        canvas.context.fill();
    });
</script>

<slot />
