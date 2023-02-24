#!/usr/bin/sh
docker compose down && git pull && npm install && docker compose up -d
