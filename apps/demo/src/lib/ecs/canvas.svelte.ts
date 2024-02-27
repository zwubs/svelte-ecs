const contextError = (): never => { throw new Error("Cannot access context prior to initialization, make sure you access it within onMount.") }

export const createCanvas = (element: HTMLCanvasElement) => {

    let context = $state<CanvasRenderingContext2D>(element.getContext('2d') ?? contextError());

    let width = $state(window.innerWidth);
    let height = $state(window.innerHeight);
    let pixelRatio = $state(window.devicePixelRatio);

    return {
        get context() { return context ?? contextError(); },
        get width() { return width; },
        set width(value) { width = value; },
        get height() { return height; },
        set height(value) { height = value; },
        get pixelRatio() { return pixelRatio; },
        set pixelRatio(value) { pixelRatio = value; }
    }
}

export type Canvas = ReturnType<typeof createCanvas>;