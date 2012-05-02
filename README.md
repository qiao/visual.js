Visual.js
=========

Visual.js is an extremely easy to use JavaScript 3D library.
It's based on [Three.js](https://github.com/mrdoob/three.js), 
but hides all the fancy stuff, and provides a simple API
(which is highly inspired by [vpython](http://vpython.org/) and [raphael](http://raphaeljs.com/))
for you.

With Visual.js, you can rapidly build up a scene without mastering much high level 3D knowledge. 
Therefore, it's great to be used for quick prototyping, scientific or educational purpose.

A quick example
---------------


See how simple it is to create a bouncing ball. ([online demo]())

First of all, to create a scene, we simply indicate its container and size.

```js
var scene = Visual({
    container: document.body,
    width: 640,
    height: 480
});
```

Now let's try to add the floor.

```js
var floor = scene.box({
    pos: [0, 0, 0],
    width: 4,
    length: 4,
    height: 0.5,
    color: 'white'
});
```

To create a red ball above the floor:

```js
var ball = scene.sphere({
    pos: [0, 4, 0],
    radius: 1,
    color: 'red'
});
```

A static ball is boring, Let's make it bounce :)

```js
var velocity = -1;
var dt = 1.0 / 60;

function step() {
    ball.y += velocity * dt;
    if (ball.y < ball.radius) {
        velocity = -velocity;
    } else {
        velocity = velocity - 9.8 * dt;
    }
}

setInterval(step, dt * 1000);
```

See, it's just that simple.
