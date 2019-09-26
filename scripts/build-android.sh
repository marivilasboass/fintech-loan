#!/usr/bin/env bash

source ./secrets/envs.sh

turtle build:android --release-channel production --keystore-path ./secrets/mutual.jks --keystore-alias $EXPO_ANDROID_KEYSTORE_ALIAS
