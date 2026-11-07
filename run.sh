#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="$DIR/.node/bin:$PATH"

echo "=================================================="
echo " Starting TransitGo.lk Development Server"
echo " Local URL: http://localhost:3000"
echo "=================================================="

npm run dev

