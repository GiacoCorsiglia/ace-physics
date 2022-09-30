# ACE Physics

Adaptable Curricular Exercises for Physics—online at [acephysics.net](https://acephysics.net)!

This [repository](https://github.com/GiacoCorsiglia/ace-physics) holds all the source code powering the ACE Physics website.

This README document describes some of the technology underlying ACE Physics and includes instructions for how to work on the ACE Physics code.

## Quick Reminders

Once you’ve read this document and completed the [One-Time Setup](#one-time-setup), you can run this command in the VS Code terminal to start ACE Physics on your computer:

```sh
npm run dev
```

Use these commands to get your local copy of ACE Physics up to date with changes other people may have made:

```sh
git pull -r
npm install
```

## Contents

- [Background Reading](#background-reading)
- [Terminology](#terminology)
- [One-Time Setup](#one-time-setup)
  - [Install Visual Studio Code](#install-visual-studio-code)
  - [Install Node.js](#install-nodejs)
  - [Install Git](#install-git)
  - [Set up Git/GitHub](#set-up-gitgithub)
  - [Download the ace-physics repository](#download-the-ace-physics-repository)
- [Everyday Steps and Setup](#everyday-steps-and-setup)
  - [Two commands to run sometimes](#two-commands-to-run-sometimes)
  - [One command to run every time](#one-command-to-run-every-time)
- [Editing Files and Committing Changes](#editing-files-and-committing-changes)
- [Optional: Local Database Setup](#optional-local-database-setup)

## Background Reading

If you’re new to any of the technologies described below, here are some recommended resources. **You don’t need all this background to work on the tutorials**—but the more you know the better. Plus, learning is fun.

- **Command Line**: You’ll have to run a few commands in the “command line” (aka “shell” aka “terminal”) to work on ACE Physics. If you’re brand new to that, here’s [a guide](https://www.digitalocean.com/community/tutorials/an-introduction-to-the-linux-terminal). The only command you need to understand is `cd`.
  - Command line things are typically easier on macOS than on Windows. If you really want to use Windows to work on ACE Physics, it has been done and can be done again. But you should reconsider your life choices.
- **Git and GitHub**: We use `git` and GitHub to manage our codebase. GitHub has lots of [documentation](https://docs.github.com/en/get-started/using-git/about-git), which you can skim.
  - I recommend using the Visual Studio Code user interface for interacting with Git. Check out their documentation [here](https://code.visualstudio.com/docs/sourcecontrol/overview).
- **HTML**: HTML is kind of like LaTeX (but you won’t have nightmares about it). If you don’t know HTML, check out [this guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started) from Mozilla.
- **CSS**: CSS lets you control the appearance of your HTML website. Working on the tutorials won’t require you to write CSS, but there is CSS code in the ACE Physics codebase. Learn about it [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS).
- **JavaScript**: There are many, many resources to teach you the JavaScript programming language. Lots of them are good! More of them are bad. I like [Eloquent JavaScript](https://eloquentjavascript.net), personally.
- **TypeScript**: Once you know JavaScript, you’ll need to learn TypeScript. Do so via the official [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html). At least read the first few sections.
- **React**: To learn to work with the React.js library, read their [documentation](https://reactjs.org/docs/getting-started.html). Don’t drown yourself in the millions of blog posts out there. [This post](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/), however, is in-depth and informative if you want an advanced understanding.
- **Next.js**: To work on the tutorials themselves, you don’t need to know about Next.js. To work on other ACE Physics features (or just to understand the whole picture), you should read the [Next.js documentation](https://nextjs.org/docs/getting-started) as well.
- **DynamoDB**: You likely won’t, but if you’re making changes to the behavior of the ACE Physics server, you may need to learn about our database, DynamoDB. Amazon’s [documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) is so verbose that it’s basically useless. Check out [this website](https://www.dynamodbguide.com) instead.

## Terminology

Here’s an overview of some relevant technical jargon:

- **Codebase**: All of the code that powers ACE Physics. The code is organized in many separate files.
- **Repository**: The folder in which the codebase lives. “Repository” also refers to the [ACE Physics project on GitHub](https://github.com/GiacoCorsiglia/ace-physics), which stores a copy of the code.
- **Production**: The “real” ACE Physics website, which is online at [acephysics.net](https://acephysics.net). Students use this version of the website. Real student data is stored in production.
- **Beta**: The version of ACE Physics that can be accessed at [beta.acephysics.net](https://beta.acephysics.net). We use this _environment_ to test new features and changes to tutorials before they are _deployed_ to production.
- **Local**: Your computer. The instructions below tell you how to run a copy of ACE Physics “locally”—i.e., offline, on your computer only. If you want to work on the ACE Physics code, you will want to test your changes by running the website locally first. “Development” is a synonym for “Local”.
- **Environment**: Any of _Production_, _Beta_ or _Local_. Each environment is completely isolated. Making changes to Local or Beta will _not_ affect Production.
- **Deploy**: The process of updating the Beta or Production versions of ACE Physics to include new or modified code. Saving changes to any of the ACE Physics code on your own computer will _not_ affect the version of the code running on Production. You must intentionally “deploy to Production”.
- **Database**: When students use ACE Physics, their responses to tutorial questions are saved. Course information is also saved. These data are stored in a “Database”. Each environment has its own database, which means that information saved on [beta.acephysics.net](https://beta.acephysics.net) (Beta) will _not_ be accessible via [acephysics.net](https://acephysics.net) (Production), and vice versa. By default, the Local environment does not include a database, meaning no data is saved (you must start from scratch every time you refresh a tutorial page). This is useful for testing.
- **Client**: The “client” is the part of the ACE Physics software that runs inside your web browser.
- **Server**: A “server” is an internet-connected computer that provides (or “serves”) data to your web browser whenever it loads `acephysics.net` or `acephysics.net/<anything>`. We also use the term “server” to refer to the part of the ACE Physics software that runs on this server computer. The ACE Physics client communicates with the ACE Physics server; for example, the client sends student responses to the server, which the server then saves in the database. Each environment has its own server.

These terms refer to various pieces of software:

- **VS Code**: [Visual Studio Code](https://code.visualstudio.com) is software for editing code. I recommend you use VS Code when working on ACE Physics.
- **TypeScript**: ACE Physics is written in the [TypeScript](https://www.typescriptlang.org/) programming language. TypeScript is just like JavaScript, but it allows you to specify the “types” of your data. For example:
  ```ts
  // This is JavaScript:
  const variable = "Hello";
  // This is TypeScript:
  const variable: string = "Hello";
  ```
  The TypeScript code we write is automatically converted to JavaScript so it can be executed.
- **JavaScript**: JavaScript is a programming language that runs on web pages inside your web browser. All interactive websites are powered by JavaScript.
- **Node.js**: [Node.js](https://nodejs.org/) is a “runtime” that allows executing JavaScript code _outside_ of a web browser. All of the ACE Physics code is written in TypeScript, then converted to JavaScript. Then, the “client” portion of the code is executed in a user’s web browser, but the “server” portion of the code is executed via Node.js on our server(s).
- **`npm`**: `npm`, or “Node Package Manager”, is a tool that comes with Node.js that facilitates installing (and updating/removing) third party libraries (a bunch of code written by other people that is free to use). Like nearly all software projects, we use a number of such libraries to power ACE Physics.
- **React**: [React](https://reactjs.org/) or “React.js” is an open-source library that makes it much easier to create interactive user interfaces in JavaScript. One feature of React is that it allows us to write HTML-like syntax in JavaScript/TypeScript, like this:
  ```tsx
  // This syntax is known as "JSX".
  const Component = () => {
    return (
      <div>
        <h1>Heading</h1>
        <p>Paragraph</p>
      </div>
    );
  };
  ```
  This might seem weird, but it is in fact quite useful! Learn more in the [React Documentation](https://reactjs.org/docs/introducing-jsx.html).
- **Next.js**: [Next.js](https://nextjs.org/) is an open-source library that works with React, which provides a structure for organizing our code across both the client and the server.
- **Vercel**: [Vercel](https://vercel.com) is a company that manages servers for their customers (i.e., it’s a web host—but a reliable one with a lot of useful features). The ACE Physics servers are managed by Vercel. This service is free for us because ACE Physics is a small website without many visitors. Vercel created Next.js.
- **AWS**: AWS, or Amazon Web Services, is a suite of services/technologies for creating/running websites offered by Amazon. We use some of these services for ACE Physics.
- **DynamoDB**: DynamoDB is database software that’s part of AWS. We use DynamoDB for the ACE Physics database. Different database softwares have different tradeoffs, but DynamoDB’s tradeoffs work pretty well for our needs. More importantly, the demands of ACE Physics are small and they fit within the free tier of DynamoDB services offered by Amazon.
- **SES**: AWS SES (Simple Email Service) is a service for sending emails reliably. SES is not free but it is quite cheap (less than $10 per year for our needs).
- **SendGrid**: [SendGrid](https://sendgrid.com) is an alternative to SES, another service for sending emails. SendGrid’s pricing structure allows 100 emails a day for free, but then it becomes expensive. I have switched ACE Physics to use SendGrid’s free tier, because it seems to deliver emails to university emails more reliably than did SES.

## One-Time Setup

If you want to work on ACE Physics locally on your own computer, you’ll need to follow these steps. Once you’ve done everything here, you shouldn’t have to repeat these steps unless you get a new computer.

> If you’re on a Mac and feel comfortable with the command line, install [HomeBrew](https://brew.sh/) and use that to install things.

### Install Visual Studio Code

> If using Homebrew:
>
> ```sh
> brew install --cask visual-studio-code
> ```

VS Code is a code editor created by Microsoft. It includes many useful features. If you don’t have strong opinions about text editors, I suggest you use VS Code when working on ACE Physics. Actually, I recommend you do so even if you do have strong opinions.

Follow the instructions here to download and install: <https://code.visualstudio.com/Download>.

### Install Node.js

> If using Homebrew:
>
> ```sh
> brew install node@14
> brew link node@14
> npm -g install npm@8
> ```

ACE Physics is primarily written in the JavaScript programming language. JavaScript typically runs inside your web browser, but Node.js allows you to execute JavaScript code outside of a web browser, too (similar to how you might execute a Python script).

**Download Node.js here**: https://nodejs.org/en/download/. **You must install _Version 14_**. If necessary, find old releases [here](https://github.com/nodejs/release#release-schedule).

**Once Node.js is installed**, run the following command in a command line (you can use the “Terminal” in VS Code for this—documentation [here](https://code.visualstudio.com/docs/terminal/basics)):

```sh
npm -g install npm@8
```

### Install Git

> If using Homebrew, install the latest version of `git`:
>
> ```sh
> brew install git
> ```

Git tracks all the changes we make to the ACE Physics code, and allows multiple people to edit the code without worrying about overwriting each other’s changes. Old versions of the code are saved, so you don’t have to worry about breaking things.

If you’re running a **Mac**, open up the Terminal in VS Code. Run the following command:

```sh
xcode-select --install
```

Some prompts will popup on the screen. Agree to them, and wait for the installation to finish (this might take a little while). This installs Apple’s “Developer Command Line Tools”—essentially it’s a bunch of software to aid in software development. Once this is done, you will be able to use the `git` command. You can close the Terminal after this has completed.

If you’re running **Windows** (I’m sorry), download and install git from <https://git-scm.com/download> instead.

### Set up Git/GitHub

Run the following in a terminal to set up `git` on your computer:

```sh
git config --global user.name "YOUR NAME"
git config --global user.email YOUR_EMAIL@EXAMPLE.COM
```

You can run one line at a time. Use the email address associated with your GitHub account.

Now we have to tell `git` how to communicate with GitHub. (Presumably you already have a GitHub account and have been given access to the ace-physics repository.) Follow [these steps](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to set up things on your own computer. Then follow [these steps](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) to set things up on the GitHub website.

### Download the ace-physics repository

“Repository” is just a fancy word for “folder with all the code in it”. It’s the root folder that holds all the sub-folders and code files that make up ACE Physics. It also holds this README file! If you’re reading this on GitHub, you’re looking at the ace-physics repository. To edit the code here, you need a “local” copy of the repository on your own computer. You’ll make changes to your local copy, then sync those changes up with the copy that lives on GitHub.

In your terminal, navigate (use the `cd` command) to the folder on your computer where you want to put the ace-physics repository folder. On a Mac, a good place is your Documents folder, so you can run:

```sh
cd ~/Documents
```

**DO NOT download the ace-physics repository into your DropBox/OneDrive/etc.** We already keep ace-physics synced/backed up on GitHub. We don’t want the syncing to conflict with that of DropBox/OneDrive/etc.

In the same Terminal, run

```sh
git clone git@github.com:GiacoCorsiglia/ace-physics.git
```

Once that’s done, the contents of this repository should have been downloaded into a new folder called “ace-physics”. You can run `ls` or `ls ace-physics` to confirm this.

Finally, run

```sh
git checkout beta
```

Now the changes you make will only affect beta.acephysics.net, and not the live/production version. But—nothing you do on your own computer will affect anything outside of your own computer unless you explicitly sync up with GitHub! The syncing is **NOT** automatic, which is for the best, because now you can proceed without worrying about breaking anything. There are also protections in place on GitHub to prevent you from inadvertently affecting the live/production version (i.e., the real acephysics.net).

## Everyday Steps and Setup

If you haven’t run the [One-Time Setup](#one-time-setup), you’ll need to do that first. Then come back here.

1. Launch Visual Studio Code.
2. Go to _File > Open_.
3. Locate the “ace-physics” folder on your computer, click it, and click “Open” (you want to open the entire folder).
4. In the “Explorer” sidebar in VS Code, you should now see the same list of folders and files that you see on the GitHub page for ace-physics.
5. Go to _View > Terminal_ or hit `^~` (Control-tilde) on your keyboard on a Mac.
6. This should open a new terminal at the bottom of the VS Code window. Run the below commands inside the new terminal.

### Two commands to run sometimes

You need to run these commands (a) the first time you’re getting setup; (b) periodically afterwards to get in sync with changes other people have made.

```sh
git pull -r
```

This command will download the latest version of the ACE Physics code to your computer. It’s always best to be working on the latest version, but the command may fail if you have changes on your local version that you haven’t “committed” yet . You’ll need to commit or discard those changes first (more on this [below](#editing-files-and-committing-changes)).

```sh
npm install
```

This command downloads and installs the latest versions of all the open source libraries that we use to help us build ACE Physics. You need to do this at least once, and then again any time we upgrade or add a new library. Definitely run it if you haven’t worked on ACE Physics before, or if it’s been a while. There’s no harm in running it repeatedly, you just have to wait for it to finish.

### One command to run every time

```sh
npm run dev
```

This command starts a version of ACE Physics running on your own computer. You can access this version by going to <http://localhost:3000> in your web browser. The URL is given in the output of the `npm run dev` command.

When you save your changes to any code, the localhost website will update to reflect your changes.

The localhost link will work until you terminate the `npm run dev` program. You can just let it run in the terminal inside VS Code until you’re done working. To quit it, either hit `^C` (Control-C) in the terminal, or just quit VS Code. Killing the localhost will not affect your code changes; you can always run `npm run dev` again to see those changes.

While you’re working, you may want to hide the terminal in VS Code so you have more room in the window. To do so, click the “X” in the upper-right of the terminal pane. Go to _View > Terminal_ to reveal the terminal again.

## Editing Files and Committing Changes

Now you’re ready to actually make some edits. You’ll probably be editing things inside the `pages/tutorials/<name-of-tutorial>` folders. You’ll need to save your changes (File > Save) in order for them to be reflected in the localhost version of the website.

Once you’re happy with your changes, you need to package them up into what’s called a “Commit”. A commit is a concept from `git`. Essentially, a commit is a frozen copy of all the files and folders inside the ace-physics repository. All the changes you’ve made have been made “on top” of the latest commit. Now you need to make a new commit to freeze in your latest changes and sync everything with GitHub. Git/GitHub keeps a history of every single commit, so we can always revert to previous versions.

You’ll probably want to use the VS Code interface to make your commit. [Here](https://code.visualstudio.com/docs/editor/versioncontrol#_commit) are some instructions on how to do that. [This video](https://code.visualstudio.com/docs/introvideos/versioncontrol) might be more helpful (you can mostly ignore the stuff about “branches”).

For your commit message, write a sentence/fragment in the active voice. Something like “Improve instructions in the Quantum Mouse tutorial” is great. It’s OK for multiple commits to have the same message. This style is just a convention and it doesn’t really matter if your commit message doesn’t follow it.

Once your commit has been created, you are ready to sync things with the master copy on GitHub. There is a button in VS Code to do this. It lives in the status bar at the bottom of the window, all the way to the left, just to the right of the word “beta” (which is the name of the git branch you’re on). You can also go to _View > Command Palette…_ and search for the Git: Sync action.

## Optional: Local Database Setup

ACE Physics saves user data in a database. By default, this behavior is disabled when running the website locally. This is convenient for testing, and makes the local setup simpler. However, if you need to test database-enabled features, you’ll need to run the database locally. Here’s how to do so:

1. Install **Docker** either from the website (https://www.docker.com) or via Homebrew (`brew install --cask docker`).
2. Open the Docker app you just downloaded. Back in your terminal (inside the `ace-physics` folder), run
   ```sh
   npm run dynamodb-setup
   ```

To enable the database locally, add the following line to the `.env.local` file inside the `ace-physics` folder:

```sh
NEXT_PUBLIC_ACE_DATABASE_ENABLED="yes"
```

If you need to create the `.env.local` file first, go ahead and do so. You can remove this line to disable the database locally again.

When the database is enabled, you will need to open the Docker app and then run

```sh
npm run dynamodb-start
```

every time before executing the `npm run dev` command to start ACE Physics locally.
