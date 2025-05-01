#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Install dependencies in main project
pnpm install

# Navigate to client directory, install deps and build
cd client
pnpm install
pnpm run build

# Return to root directory
cd ..

# Start the server
node server/index.js
