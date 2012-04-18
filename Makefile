TARGET = build/Visual.js

all: $(TARGET)

$(TARGET): $(shell find src lib -name "*.js" -type f)
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
		src/objects/Cone.js \
		> $(TARGET)

watch:
	@watch -n0.5 $(MAKE)

minify:
	@uglifyjs -o $(TARGET) $(TARGET)

clean:
	@rm -f $(TARGET)

.PHONY: watch minify clean
