# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Markdown editor with live preview
- Knowledge graph visualization (D3.js force-directed layout)
- Mind map generation from note headings
- AI-assisted editing (continue, expand, grammar check, summarize, reformat)
- Ollama integration for local AI models
- File-based storage (notes saved as local `.md` files)
- Bidirectional links with `[[wikilink]]` syntax
- Backlinks panel
- Tag system with filtering
- File explorer with folder tree
- Dark/Light theme support
- Note export to Markdown files
- Electron desktop application packaging
- One-click build and run script

### Changed
- Migrated from browser File System Access API to Electron IPC
- Improved mind map positioning and zoom controls

### Fixed
- Notes persistence across app restarts
- Mind map display position
- Vite relative path configuration for Electron

[Unreleased]: https://github.com/YOUR_USERNAME/my-obsidian/compare/v0.1.0...HEAD
