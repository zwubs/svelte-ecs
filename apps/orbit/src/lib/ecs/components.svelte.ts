import { Component } from './component.svelte';

export class NameComponent extends Component {
	constructor(
		public name: string = "Unknown"
	) {
		super();
	}
}

export class PositionComponent extends Component {
	x = 0;
	y = 0;
	z = 0;

	constructor(x?: number, y?: number, z?: number) {
		super();
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}
}

export class VelocityComponent extends Component {
	x = 0;
	y = 0;
	z = 0;

	constructor(x?: number, y?: number, z?: number) {
		super();
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}
}

export class AccelerationComponent extends Component {
	x = 0;
	y = 0;
	z = 0;

	constructor(x?: number, y?: number, z?: number) {
		super();
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}
}

export class MassComponent extends Component {
	mass = 0;

	constructor(mass?: number) {
		super();
		this.mass = mass ?? 0;
	}
}

export class PerviousPositionsComponent extends Component {
	positions: {
		x: number,
		y: number;
	}[] = [];

	private incrementer = 0;

	constructor(
		public max: number = 10,
		public skip: number = 1
	) {
		super();
	}

	add({ x, y }: PositionComponent) {
		this.incrementer += 1;
		if (this.incrementer % this.skip !== 0) return;
		this.positions.push({
			x,
			y
		})
		if (this.positions.length > this.max) this.positions.shift();
	}
}