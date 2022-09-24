# ACEPhysics.net

Adaptable Curricular Exercises for Physics—online!

## Working on ACE Physics on Your Computer

### Everyday Steps to Get Started

If you haven't run the [One-Time Setup](#one-time-setup) below, you'll need to do that first. Then come back here.

1. Launch Visual Studio Code.
2. Go to File > Open.
3. Locate the "ace-physics" folder on your computer, click it, and click "Open" (you want to open the entire folder).
4. In the "Explorer" sidebar in VS Code, you should now see the same list of folders and files that you see on the GitHub page for ace-physics.
5. Go to View > Terminal or hit `^~` (Control-tilde) on your keyboard on a Mac.
6. This should open a new terminal at the bottom of the VS Code window. Run the below commands inside the new terminal.

**There are two commands to run sometimes:**

You need to run these commands (a) the first time you're getting setup; (b) periodically afterwards to get in sync with changes other people have made.

```sh
git pull -r
```

This command will download the latest version of the ACE Physics code to your computer. It's always best to be working on the latest version, but the command may fail if you have changes on your local version that you haven't "committed" yet. You'll need to commit or discard those changes first (see more on this below).

```sh
npm install
```

This command downloads and installs the latest versions of all the open source libraries that we use to help us build ACE Physics. You need to do this at least once, and then again any time we upgrade or add a new library. Definitely run it if you haven't worked on ACE Physics before, or if it's been a while. (There's no harm in running it, you just have to wait for it to finish).

**And two other commands to run every time:**

_Make sure the Docker app is running,_ then run:

```sh
npm run dynamodb-start
```

This command starts a database server, running in the background. Now, run

```sh
npm run dev
```

This command starts a version of ACE Physics running on your own computer. You can access this version by going to <http://localhost:3000> in your web browser. (The URL is given in the output of the `npm run dev` command.)

When you save your changes to any code, the localhost website will update to reflect your changes.

The localhost link will work until you terminate the `npm run dev` program. You can just let it run in the terminal inside VS Code until you're done. To quit it, either hit `^C` (Control-C) in the terminal, or just quit VS Code. Killing the localhost will not affect your code changes; you can always run `npm run dev` again to see those changes.

While you're working, you may want to hide the terminal in VS Code so you have more room in the window. To do so, click the "X" in the upper-right of the terminal pane. Go to View > Terminal to reveal the terminal again.

#### Editing Files and Committing Changes

Now you're ready to actually make some edits. You'll probably be editing things inside the `pages/tutorials/<name-of-tutorial>` folders. You'll need to save your changes (File > Save) in order for them to be reflected in the localhost version of the website.

Once you're happy with your changes, you need to package them up into what's called a "Commit". A "Commit" is a concept from `git`. Essentially, a "Commit" is a frozen copy of all the files and folders inside the ace-physics repository. All the changes you've made have been made "on top" of the latest commit. Now you need to make a new commit to freeze in your latest changes and sync everything with GitHub. Git/GitHub keeps a history of every single commit, so we can always revert to previous versions.

You'll probably want to use the VS Code interface to make your commit. [Here](https://code.visualstudio.com/docs/editor/versioncontrol#_commit) are some instructions on how to do that. [This video](https://code.visualstudio.com/docs/introvideos/versioncontrol) might be more helpful (you can mostly ignore the stuff about "branches").

For your commit message, write a sentence/fragment in the active voice. Something like "Improve instructions in the Quantum Mouse tutorial" is great. It's OK for multiple commits to have the same message. This style is just a convention and it doesn't really matter if your commit message doesn't follow it.

Once your commit has been created, you are ready to sync things with the master copy on GitHub. There is a button in VS Code to do this. It lives in the status bar at the bottom of the window, all the way to the left, just to the right of the word "beta" (which is the name of the git branch you're on). You can also go to View > Command Pallette and search for the Git: Sync action.

### One-Time Setup

If you want to work on ACE Physics on your own computer, you'll need to follow these steps. Once you've done everything here, you shouldn't have to repeat these steps unless you get a new computer.

#### Install git, Node.js, and VS Code

**To install git:**

If you're running a **Mac**, open up the Terminal app (it's inside Applications/Utilities). Run the following command:

```sh
xcode-select --install
```

Some prompts will popup on the screen. Agree to them, and wait for the installation to finish (this might take a little while). This installs Apple's "Developer Command Line Tools"—essentially it's a bunch of software to aid in software development. Once this is done, you will be able to use the `git` command.

If you're running **Windows** (I'm sorry), download and install **git** https://git-scm.com/download.

Git tracks all the changes we make to the ACE Physics code, and allows multiple people to edit the code without worrying about overwriting each other's changes. Old versions of the code are saved, so you don't have to worry about breaking things.

**To install everything else:**

Mac or Windows, you'll also need to install the following things.

- **Node.js**: https://nodejs.org/en/download/
  - You must install **Version 14**. If necessary, find old releases [here](https://github.com/nodejs/release#release-schedule).
  - Follow the instructions in the link to download and install.
  - ACE Physics is primarily written in the JavaScript programming language. JavaScript typically runs inside your web browser, but Node.js allows you to execute JavaScript code outside of a web browser, too (similar to how you might execute a Python script).
- **Visual Studio Code**: https://code.visualstudio.com/Download
  - Follow the instructions in the link to download and install.
  - VS Code is a code editor created by Microsoft. It includes many useful features. If you don't have strong opinions about text editors, I suggest you use VS Code when working on ACE Physics.
- **Docker**: https://www.docker.com
  - Download the app from the home page of the website, open it, and follow the instructions.
  - Alternatively, use `brew install --cask docker`.

#### Set up Git/GitHub

Run the following in a Terminal to set up `git` on your computer:

```sh
git config --global user.name "YOUR NAME"
git config --global user.email YOUR_EMAIL@EXAMPLE.COM
```

You can run one line at a time. Use the email address associated with your GitHub account.

Now we have to tell `git` how to communicate with GitHub. (Presumably you already have a GitHub account and have been given access to the ace-physics repository.) Follow [these steps](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to set up things on your own computer. Then follow [these steps](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) to set things up on the GitHub website.

#### Download the ace-physics repository

"Repository" is just a fancy word for "folder with all the code in it". It's the root folder, that holds all the sub-folders and code files that make up ACE Physics. It also holds this README file! If you're reading this on GitHub, you're looking at the ace-physics repository. To edit the code here, you need a "local" copy of the repository on your own computer. You'll make changes to your local copy, then sync those changes up with the "master" copy that lives on GitHub.

In your terminal, navigate (use the `cd` command) to the folder on your computer where you want to put the ace-physics repository folder. On a Mac, a good place is your Documents folder, so you can run:

```sh
cd ~/Documents
```

**DO NOT download the ace-physics repository into your DropBox/OneDrive/etc.** We already keep ace-physics synced/backed up on GitHub. We don't want the syncing to conflict with that of DropBox/OneDrive/etc.

In the same Terminal, run

```sh
git clone git@github.com:GiacoCorsiglia/ace-physics.git
```

Once that's done, the contents of this repository should have been downloaded into a new folder called "ace-physics". You can run `ls` or `ls ace-physics` to confirm this.

Finally, run

```sh
git checkout beta
```

Now the changes you make will only affect beta.acephysics.net, and not the live/production version. But—nothing you do on your own computer will affect anything outside of your own computer unless you explicitly sync up with GitHub! The syncing is **NOT** automatic, which is for the best, because now you can proceed without worrying about breaking anything. There are also protections in place on GitHub to prevent you from inadvertently affecting the live/production version (i.e., the real acephysics.net).

Finally, open the Docker app, which you downloaded above. Back in your terminal (inside teh `ace-physics` directory), run

```sh
npm run dynamodb-setup
```

Let that finish.

OK! You're (hopefully) ready to return to the "Everyday Steps to Get Started". You can close your Terminal if you want.
