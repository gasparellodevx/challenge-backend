#!/bin/bash

WORKING_DIR=$(pwd)/scripts/k6


node $WORKING_DIR/auth/k6.auth.preload.mjs
K6_PROMETHEUS_RW_SERVER_URL=http://prometheus:9090/api/v1/write k6 run $WORKING_DIR/auth/login-load-test.mjs --address 0.0.0.0:6565 --out experimental-prometheus-rw

node $WORKING_DIR/course/k6.course.preload.mjs
K6_PROMETHEUS_RW_SERVER_URL=http://prometheus:9090/api/v1/write k6 run $WORKING_DIR/course/list-courses-load-test.mjs --address 0.0.0.0:6565 --out experimental-prometheus-rw