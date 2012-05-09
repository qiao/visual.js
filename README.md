Visual.js
=========


Visual.js is an extremely easy to use JavaScript 3D library.
It's based on [Three.js](https://github.com/mrdoob/three.js), 
but hides all the fancy stuff, and provides a simple API
(which is highly inspired by [vpython](http://vpython.org/) and [raphael](http://raphaeljs.com/))
for you.

With Visual.js, you can rapidly build up a scene without mastering much high level 3D knowledge. 
Therefore, it's great to be used for quick prototyping, scientific or educational purpose.

NOTE: still under heavy development

Download
--------

Visual.js bundled with Three.js: https://raw.github.com/qiao/visual.js/master/build/Visual.js

A quick example
---------------

See how simple it is to create a bouncing ball. 


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
    if (ball.y < ball.radius + floor.height / 2) {
        velocity *= -1;
    } else {
        velocity -= 9.8 * dt;
    }
}

setInterval(step, dt * 1000);
```

See, it's just that simple. 

Online demo:

[![bouncing ball](http://i.imgur.com/AJWrds.png)](http://jsfiddle.net/qiao/fS6m3/2/)


More examples
-------------

[![](http://i.imgur.com/Z5vmfs.png)](http://jsfiddle.net/qiao/rqf3q/)
[![](http://i.imgur.com/oSET2s.png)](http://jsfiddle.net/qiao/kU6HX/)
[![](http://i.imgur.com/fJhzWs.png)](http://jsfiddle.net/qiao/uuZ93/)


License
-------

[MIT License](http://www.opensource.org/licenses/mit-license.php)

&copy; 2012 Xueqiao Xu &lt;xueqiaoxu@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
