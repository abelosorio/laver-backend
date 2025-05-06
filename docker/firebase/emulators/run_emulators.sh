#!/bin/bash

declare -ig SIGTERM_RECEIVED=0
declare -ig BUILD_PID=0
declare -ig FIREBASE_PID=0
_handle_SIGTERM () {
  if [ $SIGTERM_RECEIVED -ne 1 ]; then
    echo "Received SIGTERM for the first time, stopping sub-processes: $BUILD_PID $FIREBASE_PID"
    SIGTERM_RECEIVED=1
    [ $BUILD_PID -ne 0 ] && kill $BUILD_PID
    [ $FIREBASE_PID -ne 0 ] && kill $FIREBASE_PID
  else
    echo "Received another SIGTERM, ignoring..."
  fi
}

_handle_SIGKILL () {
  echo "Received SIGKILL, sending another SIGTERM to sub-processes: $BUILD_PID $FIREBASE_PID"
  [ $BUILD_PID -ne 0 ] && kill $BUILD_PID
  [ $FIREBASE_PID -ne 0 ] && kill $FIREBASE_PID
}

trap -- '_handle_SIGTERM' TERM
trap -- '_handle_SIGKILL' KILL


runFirebaseEmulators () {
  firebase emulators:start \
    --only auth,storage \
    --project demo-test \
    --export-on-exit \
    --import=./.data &
  FIREBASE_PID=$!
}

runFirebaseEmulators > /dev/null

echo "Waiting for sub-processes to finish: $BUILD_PID $FIREBASE_PID"
if [ $FIREBASE_PID -ne 0 ]; then
  wait $FIREBASE_PID || true
  while [ $? -ge 128 ]; do
    echo "Still waiting for sub-processes to finish: $BUILD_PID $FIREBASE_PID"
    wait $FIREBASE_PID || true
  done
fi

echo "All sub-processes finished"
