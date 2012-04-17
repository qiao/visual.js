build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat \
		lib/Three.js \
		src/Util.js \
		src/Visual.js \
		src/Vector.js \
		src/Scene.js \
		src/Controller.js \
		src/objects/Primitive.js \
		src/objects/Box.js \
		src/objects/Sphere.js \
		src/objects/Cylinder.js \
		> build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: clean
