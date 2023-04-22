#!/usr/bin/env bash

pnpm remove xtsz | true # <-- ignore error if not installed
pnpm clean
pnpm cache clean
pnpm build
pnpm pack
VERSION=$(node --print "require('./package.json').version")
pnpm add --save-dev ./xtsz-$VERSION.tgz
