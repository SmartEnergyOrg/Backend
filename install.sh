#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root, either by logging in as root or by using sudo"
  exit
fi

echo "this script has only been tested with and was made for debian, if you use a different distro you're on your own"

# https://docs.docker.com/engine/install/debian/
apt-get remove docker docker-engine docker.io containerd runc -y

# Update the apt package index and install packages to allow apt to use a repository over HTTPS:
apt-get update
apt-get install --assume-yes \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key:
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Use the following command to set up the repository:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the apt package index:
chmod a+r /etc/apt/keyrings/docker.gpg
apt-get update

# Install Docker Engine, containerd, and Docker Compose.
apt-get install --assume-yes docker-ce docker-ce-cli containerd.io docker-compose-plugin

# run the project's container
docker-compose build
docker-compose up -d
