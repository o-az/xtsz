#!/usr/bin/env bash

pnpm remove xtsz | true # <-- ignore error if not installed
pnpm clean
pnpm cache clean
pnpm build
pnpm pack
pnpm add --save-dev ./xtsz-0.0.1.tgz
