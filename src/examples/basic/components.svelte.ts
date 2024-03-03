import { Component, HiddenComponent } from '$lib/ecs/component.svelte';

export class PositionComponent extends Component {
	x = 100;
	y = 100;
}

export class VelocityComponent extends Component {
	x = 0;
	y = 0;
}

export class RotationComponent extends Component {
	degrees = 0;
}

export class RotationalVelocityComponent extends Component {
	degreesPerFrame = 0;
}

export class ColorComponent extends Component {
	hex = '#ff0000';
}

export class BounceComponent extends Component { }
export class IsBouncingComponent extends HiddenComponent { }

export class RandomizeColorOnBounceComponent extends Component { }

export class SizeComponent extends Component {
	size = 50;
}

export class ScoreComponent extends Component {
	bounces = 0;
}
