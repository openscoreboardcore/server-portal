# ------------------------------
# Stage 1: Base with dependencies
# ------------------------------
FROM oven/bun:1 as base

WORKDIR /app

# Copy package files and install deps once (cached)
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# ------------------------------
# Stage 2: Runtime (build on container start)
# ------------------------------
FROM base as server

WORKDIR /app

# Copy everything (including source)
COPY . .

# Expose port
EXPOSE 3000

# On container start:
# 1. Rebuild with any env vars passed via docker-compose (VITE_* vars)
# 2. Serve built files with Bun
CMD bun run build && bun x serve dist --port 3000
