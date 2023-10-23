#!/usr/bin/sh
docker compose down && git pull && npm install && sudo docker compose build && sudo docker compose up -d
