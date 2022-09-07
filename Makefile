install:
	npm ci
gendiff:
	node gendiff
publish:
	npm publish --dry-run
lint:
	npx eslint
test:
    npm test
