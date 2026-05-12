#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "=========================================="
echo "  MyObsidian Electron 开发模式"
echo "=========================================="
echo ""

# 设置 Electron 下载镜像
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
export ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"

# 编译 preload 脚本
echo "[1/2] 编译 preload 脚本..."
npx tsc -p tsconfig.preload.json

# 启动 Electron 应用（Vite 热更新 + Electron）
echo "[2/2] 启动开发服务器..."
echo ""
npm run electron:start
