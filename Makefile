SHELL := /bin/sh
COMPOSE ?= docker compose
CONTAINER ?= steam-headless
IMAGE_VERSION ?= 1.4.13
GIT_REVISION ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo unknown)
SH2_DIR ?= $(shell grep -m1 '^SH2_DIR=' .env 2>/dev/null | cut -d= -f2)

.DEFAULT_GOAL := help
.PHONY: help env dirs up build down restart ps logs health verify shell mode-gaming mode-desktop \
        reset-sunshine reset-auth backup

help: ## Show available targets
	@awk 'BEGIN{FS=":.*## "} /^[a-z-]+:.*## /{printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

env: ## Create .env from .env.example when missing
	@[ -f .env ] || { cp .env.example .env; echo "created .env from .env.example"; }

dirs: env ## Create host directories and the metric seed files compose mounts
	@SH2_DIR="$(SH2_DIR)" ./scripts/prepare-host.sh

build: env ## Build the image and tag it with IMAGE_VERSION
	IMAGE_VERSION="$(IMAGE_VERSION)" GIT_REVISION="$(GIT_REVISION)" $(COMPOSE) build
	docker tag steam-headless-bc250:2 steam-headless-bc250:$(IMAGE_VERSION)

up: dirs ## Start, or apply compose changes to, the container
	$(COMPOSE) up -d

down: ## Remove the container; home, state, journal and games stay on disk
	$(COMPOSE) down

restart: ## Restart the running container
	$(COMPOSE) restart

ps: ## Show container status
	$(COMPOSE) ps

logs: ## Follow the container log
	$(COMPOSE) logs -f --tail 100

health: ## Raw health report from inside the container
	docker exec $(CONTAINER) /usr/local/bin/steam-headless-healthcheck

verify: ## Readiness check: units, health, portal, stream ports, cursor fix
	./scripts/health.sh

shell: ## Shell inside the container (as steamheadless)
	docker exec -it $(CONTAINER) bash

mode-gaming: ## Switch the live session to gamescope + gamepad UI
	docker exec $(CONTAINER) steam-headless-session-mode gaming
	@docker exec $(CONTAINER) cat /run/steam-headless/session/state.json

mode-desktop: ## Switch the live session back to KDE
	docker exec $(CONTAINER) steam-headless-session-mode desktop
	@docker exec $(CONTAINER) cat /run/steam-headless/session/state.json

reset-sunshine: ## Clear a stuck Sunshine session (Error 400 / RTSP 111 / UDP 47999)
	docker exec $(CONTAINER) systemctl restart steam-headless-sunshine

reset-auth: ## Drop the appliance password and show a fresh bootstrap password
	docker exec $(CONTAINER) rm -f /var/lib/steam-headless/auth/state.json
	docker restart $(CONTAINER) >/dev/null
	@sleep 5
	docker logs $(CONTAINER) 2>&1 | sed -n '1,12p'

backup: ## Archive home, state and journal into ./backups
	@mkdir -p backups
	tar -czf backups/sh2-$$(date +%F-%H%M).tar.gz -C $(SH2_DIR) data/home state journal
	@ls -lh backups | tail -n +2
