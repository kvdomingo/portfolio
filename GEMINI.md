# Project: Personal Portfolio

## General Instructions

- When generating code, follow existing coding style.
- Ensure all props, functions, classes, etc. are properly typed.
- Prefer functional programming paradigms and modern ES syntax where appropriate.
- Keep new implementations simple.
- Commit often, and keep each commit self-contained. Follow conventional-commits for commit messages.
- Assume the tools needed are already installed, i.e. don't run diagnostic checks like `bun --version`. Just call the commands directly.
- Use `bun` instead of `npm` or other Node managers.
- When running `bun` scripts, always force the latest version (e.g. `bunx --bun shadcn@latest`, `bun create @tanstack/start@latest`).

## Coding Style

- Always follow industry best practices.
- Use 2 spaces for indentation.
- When checking if an object is `null` or `undefined`, use the double equality syntax (e.g. `myObj == null`/`myObj != null`). Otherwise, always use strict equality `===`/`!==`.
