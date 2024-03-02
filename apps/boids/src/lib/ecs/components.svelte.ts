import { Component } from './component.svelte';

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

export class EnemyComponent extends Component { }

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