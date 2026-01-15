# Contributing to VTOP 2.0 🚀

First off, thank you for considering contributing to VTOP 2.0! It's people like you that make VTOP 2.0 such a great tool for the campus community.

## 🌈 Code of Conduct

This project and everyone participating in it is governed by the [VTOP 2.0 Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🏗️ How Can I Contribute?

### Reporting Bugs

- Check the [Issues](https://github.com/ArshVermaGit/Vtop2.0/issues) to see if the bug has already been reported.
- If not, open a new issue with a clear title and description, steps to reproduce, and any relevant logs or screenshots.

### Suggesting Enhancements

- Open a new issue with the tag `enhancement`.
- Describe the feature you'd like to see and why it would be useful.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue the pull request!

## 💻 Local Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArshVermaGit/Vtop2.0.git
   cd Vtop2.0
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment**
   Create a `.env` file in the root directory and add the necessary environment variables (refer to `README.md` for details).
4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🎨 Style Guide

- **TypeScript**: Use TypeScript for all new features.
- **Styling**: Use Tailwind CSS for styling.
- **Components**: Follow the existing component structure in `src/components`.
- **Commits**: Write descriptive commit messages.

## 🤔 Questions?

Feel free to open an issue or reach out to the maintainers if you have any questions.

Happy coding! ⚡
