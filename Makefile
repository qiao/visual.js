build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat lib/Three.js \
		src/Visual.js \
		src/Vector.js \
		src/Scene.js \
		src/Primitive.js \
		src/Box.js \
		src/Sphere.js > build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: clean
