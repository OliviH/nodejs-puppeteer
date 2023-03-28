# Color
COLOR_RED='\033[0;31m'
COLOR_GREEN='\033[0;32m'
COLOR_YELLOW='\033[0;33m'
COLOR_NC='\033[0m' # No Color

default: help
help:  ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

app-start: ## Start containers
	@echo "$(COLOR_GREEN)Starting containers...$(COLOR_NC)"
	@docker compose up -d

app-down: ## Stop containers
	@echo "$(COLOR_RED)Stoping containers...$(COLOR_NC)"
	@docker compose down

app-logs: ## Show logs
	@echo "$(COLOR_YELLOW)Show logs...$(COLOR_NC)"
	@docker compose logs -f

app-build: ## Build containers
	@echo "$(COLOR_GREEN)Building containers...$(COLOR_NC)"
	@docker compose --build
