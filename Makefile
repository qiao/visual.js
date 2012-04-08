build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat lib/Three.js > build/Visual.js
	@cat src/Visual.js >> build/Visual.js
	@cat src/Vector.js >> build/Visual.js
	@cat src/Scene.js >> build/Visual.js
	@cat src/Primitive.js >> build/Visual.js
	@cat src/Box.js >> build/Visual.js
	@cat src/Sphere.js >> build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: clean
