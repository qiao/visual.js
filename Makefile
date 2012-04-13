build/Visual.js: $(shell find src lib -name "*.js" -type f)
	@cat \
		lib/Three.js \
		src/Visual.js \
		src/Vector.js \
		src/Scene.js \
		src/Interaction.js \
		src/objects/BaseObject.js \
		src/objects/Box.js \
		src/objects/Sphere.js \
		> build/Visual.js

clean:
	@rm -f build/Visual.js

.PHONY: clean
