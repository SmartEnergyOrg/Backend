#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root, either by logging in as root or by using sudo"
  exit
fi

# check if the user has an editor
check_editor() {
  echo "checking whether root has an editor"
  sleep 2
  if [[ -z "${EDITOR}" ]]; then
    echo "root does not have an editor. either set the editor for the root user or restart the script using EDITOR=<your editor program> ./install.sh"
    exit
  else
    echo "editor found! editor is ${EDITOR}"
    sleep 2
  fi
}

# check if the .env file exists
if [ ! -f ./.env ]; then
  check_editor
  echo "the .env file has not been created. Creating it for you..."
  cp sample.env .env
  sleep 2
  echo "please edit the .env file so that it contains the correct values"
  sleep 2
  echo "opening .env using ${EDITOR} in 3 seconds..."
  # give the user a moment just in case
  sleep 3
  ${EDITOR} .env
fi

echo "please make sure that the .env file contains the correct values"
sleep 2

echo "this script has only been tested with and was made for debian, if you use a different distro you're on your own"
sleep 4

# https://docs.docker.com/engine/install/debian/
apt-get remove --assume-yes docker docker-engine docker.io containerd runc

# Update the apt package index and install packages to allow apt to use a repository over HTTPS:
apt-get update
apt-get install --assume-yes \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# Add Docker's official GPG key:
mkdir -p /etc/apt/keyrings
if [ -f /etc/apt/keyrings/docker.gpg ]; then
  rm /etc/apt/keyrings/docker.gpg
fi
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Use the following command to set up the repository:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list >/dev/null

# Update the apt package index:
chmod a+r /etc/apt/keyrings/docker.gpg
apt-get update

# Install Docker Engine, containerd, and Docker Compose.
apt-get install --assume-yes docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose

# run the project's container
systemctl enable --now docker
docker-compose build
docker-compose up -d

status=$?

if test $status -eq 0
then
  echo "the website is running on http://$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'):12345"
fi
