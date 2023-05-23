install:
	npm ci

gendiff:
	node/gendiff.js

test: 
	npm test 

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test