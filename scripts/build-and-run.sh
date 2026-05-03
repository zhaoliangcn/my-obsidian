#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "=========================================="
echo "  MyObsidian Electron 打包运行脚本"
echo "=========================================="
echo ""

# 设置 Electron 下载镜像（解决 GitHub 下载失败问题）
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
export ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"

# 1. 清理旧构建
echo "[1/5] 清理旧构建..."
rm -rf dist dist-electron release

# 2. 构建前端
echo "[2/5] 构建前端 (Vite)..."
npm run build

# 3. 编译 Electron 主进程和 preload
echo "[3/5] 编译 Electron 主进程..."
npx tsc -p tsconfig.electron.json
echo "编译 preload (CommonJS)..."
npx tsc -p tsconfig.preload.json

# 4. 打包 Electron
echo "[4/5] 打包 Electron 应用..."
npx electron-builder --mac --dir

# 5. 运行
echo "[5/5] 启动应用..."
echo ""
APP_PATH="release/mac/MyObsidian.app"

if [ -d "$APP_PATH" ]; then
    echo "正在启动: $APP_PATH"
    open "$APP_PATH"
else
    echo "打包失败，未找到应用: $APP_PATH"
    exit 1
fi

echo ""
echo "=========================================="
echo "  完成！"
echo "=========================================="
