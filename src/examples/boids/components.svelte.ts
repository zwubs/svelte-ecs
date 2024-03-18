import { Component } from '$lib/ecs/component.svelte';

export class PositionComponent extends Component {
	constructor(
		public x: number = 0,
		public y: number = 0
	) {
		super();
	}
}

export class VelocityComponent extends Component {
	constructor(
		public x: number = 0,
		public y: number = 0
	) {
		super();
	}
}

export class BoidComponent extends Component { }

export class ColorComponent extends Component {
	hex = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

export class PlayerComponent extends Component { }

export class ChaseMouseComponent extends Component {
	constructor(
		public bias: number = 0.25,
	) {
		super();
	}
}

export class KillCountComponent extends Component {
	kills = $state(0);
}

export class ChirpComponent extends Component {
	private static max = 600;
	private _counter = (Math.random() * ChirpComponent.max);

	get counter() { return this._counter; }
	set counter(value: number) { this._counter = Math.max(value, ChirpComponent.max); }
}