#!/bin/sh
set -eu
cd "$(dirname "$0")/backend-rs"
cargo build --release
install -m 0755 target/release/fantastic-rs ../bin/backend
printf '%s\n' "built $(cd .. && pwd)/bin/backend"
