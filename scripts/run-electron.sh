#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "=========================================="
echo "  MyObsidian Electron 启动脚本"
echo "=========================================="
echo ""

APP_PATH="release/mac/MyObsidian.app"

if [ -d "$APP_PATH" ]; then
    echo "正在启动: $APP_PATH"
    open "$APP_PATH"
    echo "应用已启动"
else
    echo "未找到已打包的应用: $APP_PATH"
    echo ""
    echo "请先运行打包脚本："
    echo "  ./scripts/build-and-run.sh"
    echo ""
    echo "或使用开发模式："
    echo "  ./scripts/start-electron.sh"
    exit 1
fi
