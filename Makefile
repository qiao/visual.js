all: build/Visual.js

build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat \
		lib/Three.js \
		lib/Stats.js \
		src/Util.js \
		src/Visual.js \
		src/Vector.js \
		src/Scene.js \
		src/Controller.js \
		src/objects/Primitive.js \
		src/objects/Box.js \
		src/objects/Sphere.js \
		src/objects/Cylinder.js \
		src/objects/Cone.js \
		src/objects/Pyramid.js \
		> build/Visual.js

watch:
	@watch -n0.5 $(MAKE)

minify:
	@uglifyjs -o build/Visual.js build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: watch minify clean
