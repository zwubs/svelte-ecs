import { Component } from './component.svelte';

export class PositionComponent extends Component {
	x = 0;
	y = 0;
}

export class VelocityComponent extends Component {
	x = 0;
	y = 0;
}

export class BoidComponent extends Component { }

export class BoidBiasComponent extends Component {
	bias = Math.random() / 100;
}

export class BoidScoutGroupComponent extends Component {
	group = Math.round(Math.random()) + 1;
}

export class ColorComponent extends Component {
	hex = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}