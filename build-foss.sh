#!/bin/bash

echo "Building Rocket.Chat FOSS..."

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Ensure correct Node.js version
echo "Setting Node.js version to 22.16.0..."
nvm use 22.16.0 || {
    echo "Node.js 22.16.0 not found. Installing..."
    nvm install 22.16.0
    nvm use 22.16.0
}

# Check if meteor is installed
if ! command -v meteor &> /dev/null; then
    echo "Installing Meteor..."
    curl -s https://install.meteor.com/ | sh
    # Add meteor to PATH
    export PATH="$HOME/.meteor:$PATH"
    # Also add to current session
    export PATH="/usr/local/bin:$PATH"
fi

# Ensure meteor is in PATH
export PATH="$HOME/.meteor:/usr/local/bin:$PATH"

# Fix permissions for meteor directory
echo "Fixing permissions..."
sudo chown -R $USER:$USER apps/meteor/.meteor 2>/dev/null || true

# Build the Meteor bundle locally (following official process)
echo "Building Meteor bundle..."
cd apps/meteor

# Install dependencies using yarn (not npm)
yarn install

# Build the bundle
meteor build --server-only --directory ../../bundle

# Go back to root
cd ../..

# Check if bundle was created
if [ ! -d "bundle" ]; then
    echo "Error: Bundle was not created. Build failed."
    exit 1
fi

# Install npm dependencies in the bundle (official process)
echo "Installing bundle dependencies..."
cd bundle/bundle/programs/server
npm install
cd ../../../../

# Fix missing reify files
echo "Fixing missing reify files..."
if [ -d "bundle/bundle/programs/server/npm/node_modules/meteor/modules/node_modules/@meteorjs/reify" ]; then
    cp -r bundle/bundle/programs/server/npm/node_modules/meteor/modules/node_modules/@meteorjs/reify bundle/bundle/programs/server/npm/node_modules/@meteorjs/
fi

# Create missing runtime.js file
echo "Creating missing runtime.js file..."
mkdir -p bundle/bundle/programs/server/npm/node_modules/@meteorjs/reify/lib
echo "module.exports = require('./runtime/index.js');" > bundle/bundle/programs/server/npm/node_modules/@meteorjs/reify/lib/runtime.js

# Build Docker image
echo "Building Docker image..."
docker build -f Dockerfile.foss -t rocketchat-foss:latest .

echo "Done! You can now run:"
echo "docker-compose -f docker-compose.foss.yml up -d"
