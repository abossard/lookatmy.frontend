#!/usr/bin/env bash
docker-compose build
docker-compose push
docker stack deploy --prune --compose-file docker-compose.yml lookatmy
echo done.