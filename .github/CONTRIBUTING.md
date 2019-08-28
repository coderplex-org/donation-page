# How to Contribute

Coderplex [Donations Page](https://donate.coderplex.org/) is a frontend application to accept donations to [Codeplex](https://coderplex.org/)

## Table Of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Code of Conduct](#code-of-conduct)
- [Open Development](#open-development)
- [Branching Model](#branching-model)
- [Development Workflow](#development-workflow)
  - [Work on Issues](#work-on-issues)
  - [Proposing a Change](#proposing-a-change)
  - [Prerequisites](#prerequisites)
  - [Sending a Pull Request](#sending-a-pull-request)
    - [Running Locally](#running-locally)
    - [Before submitting](#before-submitting)
    - [Add yourself as a contributor](#add-yourself-as-a-contributor)
    - [Submitting PullRequest](#submitting-pullrequest)
    - [After submitting](#after-submitting)
      - [Received a review request](#received-a-review-request)
  - [How to get in touch](#how-to-get-in-touch)
- [Appendix](#appendix)
  - [Node Version Manager](#node-version-manager)
    - [nvm for Linux & macOS](#nvm-for-linux--macos)
    - [nvm-windows for Windows](#nvm-windows-for-windows)
  - [Local host occupied](#local-host-occupied)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Code of Conduct

Coderplex has adopted [Contributor Covenant](https://github.com/coderplex/donation-page/blob/master/docs/CODE_OF_CONDUCT.md) that we expect project participants to adhere to.

## Open Development

All work related to the application takes place on Github itself. We use [Issues](https://github.com/coderplex/donation-page/issues) to track bugs, discuss ideas and to engage open source contributors. [Projects](https://github.com/coderplex/donation-page/projects) are used to keep track of everything and is our project management tool. We maintain [Wiki](https://github.com/coderplex/donation-page/wiki) for structuring our long term thoughts. Both core team members and contributors sends a pull request which goes through the same review process. Whole process is as transparent as it can be and we strive to keep it that way.

## Branching Model

The `master` branch of donation-page is relatively stable branch which we use for both development and deployment. We also have auto deployment on this branch itself i.e any changes in that branch gets reflected in [https://donate.coderplex.org](https://donate.coderplex.org). 

## Development Workflow

We welcome pull requests from beginners and seasoned JavaScript developers alike!

### Work on Issues

1. Find an issue that needs assistance by searching for the [open issues](https://github.com/coderplex/donation-page/labels/help-wanted).
1. If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.
1. If somebody claims an issue but doesn’t follow up for more than a weeks, it’s fine to take over it but you should still leave a comment.

### Proposing a Change

1. Open a new issue if you would like report a bug or suggest improvements.
1. Please wait for core team members to comment on the thread. This lets us reach an agreement on your proposal before you put significant effort into it.

### Prerequisites

1. [NodeJS](https://nodejs.org/)

   - Currently we are developing using the Node.js v10.x

   ```bash
   # To check node version
   node -v
   ```

   Any lower version than mentioned above may face some unexpected behaviour or erros. You can install any version of node along with the version that you have in your machine. For that you need <b>N</b>ode <b>V</b>ersion <b>M</b>anager.

   > If you face problem updating your node then you might need a Node version manager tool. [Follow here](#node-version-manager)

1. [Now CLI](https://zeit.co/download)

   - Minimum version v2.x+

   The project depends on the 'now-cli' to run and build. You can install it by running `npm i -g now`

1) [Git](https://git-scm.com/download/) (Familiarity with git is mandatory).

### Sending a Pull Request

*Working on your first Pull Request? You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)*

#### Running Locally

1. Fork the [repository](https://github.com/coderplex/donation-page).
1. Then clone your forked repository
   ```bash
    git clone <your forked repository url>
   ```
1. Move to the repository root folder
   ```bash
    cd donation-page
   ```
1. [Yarn](https://yarnpkg.com)

   * Minimum version v1.2.0+
   * Installing instructions are at [official docs](https://yarnpkg.com/en/docs/install#windows-tab). Use yarn over npm

   > Our team's official policy (for now) is: We only use [Yarn](https://yarnpkg.com/en/docs/install) as our official Node package manager, and so we request you to use Yarn instead of npm and commit `yarn.lock` file.

1. Install dependencies
   ```bash
    yarn
   ```
1. Setting up with few things, to get it running.
This project uses some environment variables that hold the values required to make API calls to the API provided by [Razorpay](https://razorpay.com/) and [Airtable](https://airtable.com/). You can ignore this if you're just focussing on the frontend. But, you would need these, if you want to test the API calls made to process the payments or make changes to the API.

    Create two files named `.env` and `.env.build` and those files should look something like this.
    contents of `.env` file:
    ```
    RZP_TEST_KEY=YOUR_TEST_KEY(optional)
    RZP_TEST_SECRET=YOUR_TEST_SECRET(optional)
    RZP_LIVE_KEY=
    RZP_LIVE_SECRET=
    AIRTABLE_KEY=
    AIRTABLE_BASE_ID=
    AIRTABLE_TABLE_NAME=
    ```

    contents of `.env.build` file:

    ```
    RZP_TEST_KEY=YOUR_TEST_KEY(optional)
    RZP_LIVE_KEY=
    ```
1. Start the development server
   ```bash
    yarn dev
   ```
   Go to `localhost:3000` in the browser of your choice.
   > You may get this [error](#local-host-occupied) if any other app is already running the above port.

#### Before submitting

1. From your fork, create a [branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/) and name it accordinly. eg. `typo-in-readme` or `issue-resolve-6` or `patch-fix-3`
1. If you’ve fixed a bug or added code that should be tested, add tests!
1. Ensure that all test pass
   ```bash
    yarn test
   ```
1. Run code formatters
   ```bash
    yarn lint
   ```
1. Add and commit your code. Please give meaning full commit messages and add what you've changed or added in the decription in brief so that it can be easy for reviewers to understand.

#### Add yourself as a contributor

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

To add yourself to the table of contributors on the `README.md`, please use the automated script as part of your PR:

```bash
yarn run add-contributor
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR.

#### Submitting PullRequest

1. Pull latest code from [upstream repository's](https://help.github.com/articles/merging-an-upstream-repository-into-your-fork/)`master`, if in case anything new were merged while you were working on your fork.
1. Push the code to your fork.
1. Raise the pull request from your created branch to `master` branch of coderplex. 
1. Take some time to give a brief description of the work you have done.

#### After submitting

1. Wait for all checks to pass in below section.
   > You might see a check fail from now-bot saying that there are failures in deployment. Don't worry about it, you don't have access rights to deploy. You can see the status of your check once any reviewer triggers the deployment.
1. The core team will review your pull request and either merge it, request changes to it, or close it with an explanation.
<!-- 1. Your changes are deployed with a unique link `https://deploy-preview-xx--coderplex.netlify.com`.

   _`- xx` is your pull request number._ -->


##### Received a review request

- Work on the requested changes
- Push the changes as you did earlier, the pull request will automatically catch those and update itself.

### How to get in touch

- Coderplex [Discord Channel](https://discord.gg/ydaGAG)
- Tweet core team members :
  - Vinay Puppal [@VinayPuppal](https://twitter.com/vinaypuppal)

## Appendix

### Node Version Manager

#### [nvm](https://github.com/creationix/nvm) for Linux & macOS

```bash
# Installation
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# Install latest node lts
nvm install --lts

# Use installed version
nvm use --lts

# Run the app in the same terminal session
```

_Make sure you have [curl](https://curl.haxx.se/) installed_

#### [nvm-windows](https://github.com/coreybutler/nvm-windows) for Windows

It comes with an [installer](https://github.com/coreybutler/nvm-windows#installation--upgrades).

```bash
# Install particular version
nvm install 8.9.1

# Use installed version
nvm use 8.9.1
```

Still facing problem this [article](https://medium.com/appseed-io/how-to-run-multiple-versions-of-node-js-with-nvm-for-windows-ffbe5c7a2b47) from [@skounis](https://twitter.com/skounis) explain in details.

### Local host occupied

```js
Error: listen EADDRINUSE :::3000
    at Object._errnoException (util.js:1024:11)
    at _exceptionWithHostPort (util.js:1046:20)
    at Server.setupListenHandle [as _listen2] (net.js:1351:14)
    at listenInCluster (net.js:1392:12)
    at Server.listen (net.js:1476:7)
    at app.prepare.then (/home/m-zubairahmed/github/official/coderplex-frontend/server.js:26:6)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
error Command failed with exit code 1.
```

If you get this error while running `yarn dev` then probably another app is occupying `localhost:3000`. You may want to close that and run the command again.
