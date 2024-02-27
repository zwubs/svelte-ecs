import { Component, HiddenComponent } from './component.svelte';

export class PositionComponent extends Component {
	x = $state(100);
	y = $state(100);
}

export class VelocityComponent extends Component {
	x = $state(0);
	y = $state(0);
}

export class RotationComponent extends Component {
	degrees = $state(0);
}

export class RotationalVelocityComponent extends Component {
	degreesPerFrame = $state(0);
}

export class ColorComponent extends Component {
	hex = $state('#ff0000');
}

export class BounceComponent extends Component { }
export class IsBouncingComponent extends HiddenComponent { }

export class RandomizeColorOnBounceComponent extends Component { }

export class SizeComponent extends Component {
	size = $state(50);
}

export class ScoreComponent extends Component {
	bounces = $state(0);
}
