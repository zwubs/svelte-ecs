export type Updatee = () => void;

export const createUpdater = () => {

    const updatees = $state(new Set<Updatee>());

    const update = () => {
        updatees.forEach(updatee => {
            updatee();
        })
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    return {
        add: (updatee: Updatee) => { updatees.add(updatee); }
    }
}

export type Updater = ReturnType<typeof createUpdater>;