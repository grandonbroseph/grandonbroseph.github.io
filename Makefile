# GNU Make 3.8.2 and above

MAKEFLAGS += --no-print-directory
.PHONY: all start clean html css js assets

.EXPORT_ALL_VARIABLES:

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

all: clean assets
	svgo src/assets/*.svg -o dist/assets
	imagemin src/assets/*.jpg src/assets/*.png -o dist/assets
	esbuild src/main.js --bundle --minify --define:process.env.NODE_ENV=\"production\" --loader:.js=jsx > tmp/main.bundle.js
	tsc tmp/main.bundle.js --allowJs --lib DOM,ES2015 --target ES5 --outFile tmp/main.bundle.es5.js
	uglifyjs tmp/main.bundle.es5.js --toplevel -m -c drop_console=true,passes=3 > dist/main.js
	sass src/style.scss dist/style.css
	cleancss dist/style.css -o dist/style.css
	html-minifier --collapse-whitespace src/index.html -o dist/index.html
	rm dist/*.map

start: clean js css html assets
	chokidar "src/**/*.js" -c "$(MAKE) js" \
	& chokidar "src/**/*.scss" -c "$(MAKE) css" \
	& chokidar "src/*.html" -c "$(MAKE) html" \
	& chokidar "src/assets/*" -c "$(MAKE) assets"

clean:
	rm -rf dist
	mkdir -p {tmp,dist/assets}

html:
	cp src/index.html dist/index.html

css:
	sass src/style.scss dist/style.css

js:
	esbuild src/main.js --bundle --sourcemap --define:process.env.NODE_ENV=\"dev\" --loader:.js=jsx --outfile=dist/main.js

assets:
	cp src/assets/* dist/assets
