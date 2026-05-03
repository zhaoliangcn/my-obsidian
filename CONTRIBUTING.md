# Contributing to MyObsidian

Thank you for your interest in contributing to MyObsidian! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating one:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/my-obsidian.git
cd my-obsidian

# Install dependencies
npm install

# Start development server
npm run electron:start
```

## Coding Standards

- Use TypeScript for all new code
- Follow existing code style (indentation, naming conventions)
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all imports are used

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add mind map export functionality
fix: resolve graph node overlap issue
docs: update README with new screenshots
refactor: simplify file system utilities
style: format code according to ESLint rules
test: add unit tests for markdown parser
chore: update dependencies
```

## Project Structure

See [README.md](README.md#project-structure) for an overview of the project architecture.

## Need Help?

- Open a [GitHub Discussion](https://github.com/YOUR_USERNAME/my-obsidian/discussions)
- Check existing issues and pull requests
