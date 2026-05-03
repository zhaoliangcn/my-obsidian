# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of MyObsidian seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please open a [GitHub Security Advisory](https://github.com/YOUR_USERNAME/my-obsidian/security/advisories/new).

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information:

- Type of issue (e.g., buffer overflow, XSS, injection, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Best Practices

When contributing to this project, please follow these security guidelines:

1. **Never commit secrets** - API keys, tokens, or credentials should never be committed
2. **Validate all user input** - Sanitize file paths, note content, and configuration values
3. **Use IPC securely** - Electron IPC handlers should validate and sanitize all arguments
4. **Avoid path traversal** - File system operations should use path resolution and validation
5. **Keep dependencies updated** - Regularly run `npm audit` and update vulnerable packages
