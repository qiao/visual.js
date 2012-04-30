all: build/Visual.js

build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat \
		lib/Three.js \
		lib/Stats.js \
		src/Visual.js \
		src/Util.js \
		src/Controller.js \
		src/objects/Primitive.js \
		src/objects/Box.js \
		src/objects/Sphere.js \
		src/objects/Cylinder.js \
		src/objects/Cone.js \
		src/objects/Pyramid.js \
		src/objects/Arrow.js \
		src/objects/Curve.js \
		src/objects/Convex.js \
		src/objects/Ring.js \
		> build/Visual.js

watch:
	@watch -n0.5 $(MAKE)

minify:
	@uglifyjs -o build/Visual.js build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: watch minify clean
