#!/bin/bash

echo "Rocket.Chat FOSS - Quick Start"
echo "=============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "Docker and Docker Compose are installed"
echo ""

# Check if we're in the right directory
if [ ! -f "build-foss.sh" ]; then
    echo "Please run this script from the Rocket.Chat FOSS directory"
    echo "Make sure you're in the directory containing build-foss.sh"
    exit 1
fi

echo "Building Rocket.Chat FOSS..."
echo "This may take several minutes on first run..."
echo ""

# Build the application
if bash build-foss.sh; then
    echo ""
    echo "Build completed successfully!"
    echo ""
    echo "Starting Rocket.Chat FOSS..."
    echo ""

    # Start the services
    if docker-compose -f docker-compose.foss.yml up -d; then
        echo ""
        echo "Rocket.Chat FOSS is now running!"
        echo ""
        echo "Access your chat at: http://localhost:3000"
        echo "Default login: administrator / admin123"
        echo ""
        echo "To stop the services:"
        echo "  docker-compose -f docker-compose.foss.yml down"
        echo ""
        echo "To view logs:"
        echo "  docker-compose -f docker-compose.foss.yml logs -f"
        echo ""
        echo "Remember to change the default password!"
        echo ""
    else
        echo "Failed to start services"
        echo "Check the error messages above"
        exit 1
    fi
else
    echo "Build failed"
    echo "Check the error messages above"
    exit 1
fi
