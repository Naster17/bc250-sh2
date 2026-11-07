SHELL := /bin/sh
COMPOSE ?= docker compose
CONTAINER ?= steam-headless
IMAGE ?= steam-headless-bc250:2
SH2_DIR ?= $(shell grep -m1 '^SH2_DIR=' .env 2>/dev/null | cut -d= -f2)

.DEFAULT_GOAL := help
.PHONY: help env dirs up build down restart ps logs health verify shell mode-gaming mode-desktop \
        reset-sunshine reset-auth backup

help: ## Show available targets
	@awk 'BEGIN{FS=":.*## "} /^[a-z-]+:.*## /{printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

env: ## Create .env from .env.example when missing
	@[ -f .env ] || { cp .env.example .env; echo "created .env from .env.example"; }

dirs: env ## Create host directories and the metric seed files compose mounts
	@set -e; \
	base="$${SH2_DIR:-$$(grep -m1 '^SH2_DIR=' .env 2>/dev/null | cut -d= -f2)}"; \
	base="$${base:-/opt/steam-headless}"; \
	mkdir -p "$$base/data/home" "$$base/games" "$$base/state" "$$base/journal" "$$base/metrics"; \
	[ -f "$$base/metrics/gpu_busy_percent" ] || printf '00\n' > "$$base/metrics/gpu_busy_percent"; \
	if [ ! -s "$$base/metrics/gpu_metrics" ]; then \
		if [ -r /sys/class/drm/card0/device/gpu_metrics ]; then \
			cp /sys/class/drm/card0/device/gpu_metrics "$$base/metrics/gpu_metrics"; \
		else \
			{ printf '\\200\\000\\002\\002'; head -c 124 /dev/zero | tr '\\0' '\\377'; } \
				> "$$base/metrics/gpu_metrics"; \
			printf '\\000\\000' | dd of="$$base/metrics/gpu_metrics" bs=1 seek=28 conv=notrunc 2>/dev/null; \
		fi; \
	fi; \
	echo "host paths ready under $$base"

build: env ## Build the image from this repository
	$(COMPOSE) build

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
