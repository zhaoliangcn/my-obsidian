# MyObsidian

> A modern, open-source Markdown knowledge base tool inspired by Obsidian. Built with Electron, React, and TypeScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue)
![Electron](https://img.shields.io/badge/Electron-39.2-47848F?logo=electron)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

English | [简体中文](README_zh-CN.md)

## Features

- **Markdown Editing** - Full-featured Markdown editor with live preview
- **Knowledge Graph** - Visualize connections between your notes with an interactive force-directed graph
- **Mind Map** - Auto-generate mind maps from note headings with collapsible nodes
- **AI-Powered** - AI-assisted writing (continue, expand, grammar check, summarize, reformat) with configurable Ollama support
- **File-Based Storage** - All notes stored as local `.md` files, fully portable and editable
- **Bidirectional Links** - Create connections between notes with `[[wikilink]]` syntax
- **Backlinks Panel** - See which notes reference the current note
- **Tag System** - Organize notes with `#tags` for quick filtering
- **File Explorer** - Browse and manage your knowledge base with a folder tree
- **Dark/Light Theme** - Switch between themes for comfortable editing
- **Export** - Export notes as Markdown files

## Screenshots

> ![screenshots](screenshots.png)

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9

### Development

```bash
# Clone the repository
git clone https://github.com/zhaoliangcn/my-obsidian.git
cd my-obsidian

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Start Electron app (Vite + Electron)
npm run electron:start
```

### Build

```bash
# Build web version
npm run build

# Build Electron desktop app
npm run electron:build
```

### One-Click Build & Run

```bash
./scripts/build-and-run.sh
```

## Project Structure

```
my-obsidian/
├── electron/               # Electron main process
│   ├── main.ts             # Main process entry point
│   └── preload.ts          # Preload script (IPC bridge)
├── src/
│   ├── components/         # React components
│   │   ├── editor/         # Markdown editor & AI panel
│   │   ├── explorer/       # File explorer
│   │   ├── graph/          # Knowledge graph & mind map
│   │   ├── layout/         # App layout (sidebar, panels)
│   │   ├── search/         # Search functionality
│   │   └── tags/           # Tags panel
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   │   ├── ai.ts           # AI/Ollama integration
│   │   ├── filesystem.ts   # File system operations (IPC)
│   │   ├── markdown.ts     # Markdown parsing
│   │   └── mindmap.ts      # Mind map generation
│   └── App.tsx             # Main app component
├── scripts/
│   └── build-and-run.sh    # One-click build & run script
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Desktop | Electron 39 |
| State Management | Zustand 5 |
| Markdown | Marked 18 |
| Visualization | D3.js 7 |
| Icons | Lucide React |
| AI Integration | Ollama (configurable) |

## Configuration

### AI / Ollama

Configure your Ollama endpoint in the app settings:

1. Open the AI panel (right sidebar)
2. Click the settings icon
3. Set your Ollama URL (default: `http://localhost:11434`)
4. Choose your preferred model

### Vault Directory

On first launch, you'll be prompted to select a folder for your knowledge base. All notes will be stored as `.md` files in this directory.

## Roadmap

- [ ] Full-text search with fuzzy matching
- [ ] Canvas / whiteboard view
- [ ] Plugin system
- [ ] Sync across devices
- [ ] Mobile support
- [ ] PDF export
- [ ] Template system
- [ ] Git integration for version control

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Obsidian](https://obsidian.md/) - Inspiration for the knowledge management concept
- [D3.js](https://d3js.org/) - Data visualization library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
