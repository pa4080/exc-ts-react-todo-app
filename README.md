# Create TODO App with ReactJs and Typescript Exercise

This exercise is based on the FreeCodeCamp's tutorial [How to Code Your React App with TypeScript](https://www.freecodecamp.org/news/how-to-code-your-react-app-with-typescript/) - YouTube video: [React & TypeScript - Course for Beginners](https://youtu.be/FJDVKeh7RJI).

## Setup the Project

### Install ReactJs and Typescript by Vite

```bash
npm create vite@latest
# ✔ Project name: … exc-ts-react-todo-app
# ✔ Select a framework: › React
# ✔ Select a variant: › TypeScript
cd exc-ts-react-todo-app/
npm install
```

- Create start command in [`package.json`](package.json) file as follows:

    ```json
    "scripts": {
        "start": "vite --host 0.0.0.0 --port 3000",
    }
    ```

- Clean the `src/` and `public/` directories and start working on the project.

### Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Setup the Git Repository and Push to GitHub

```bash
git config --global init.defaultBranch master
git init
git add -A
git commit -m "Initial commit"
git branch -M master
git remote add origin git@github.com:metalevel-tech/exc-ts-react-todo-app.git
git push -u origin master
```
