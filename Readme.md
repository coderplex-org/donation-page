# Coderplex Donation Page

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

Coderplex Foundation is a registered non-profit organization that is working towards improving the state of tech in India.

## Tech Stack

- next.js
- tailwindcss

## Quick guide to get started

Here is a quick guide to get started with the project and run the development server on local machine.

To get started, the first and foremost thing is make sure that you have Node.js installed and `npm` command is running successfully.

The project depends on the 'now-cli' to run and build. You can install it by running `npm i -g now`

After completion of installation of 'now-cli', run `npm install` command in the project directory.

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

Now you have the bare minimum requirements ready for firing up the development server on your machine. To run the server just run `npm run dev` in your project directory. Now you should be seeing the website running at `localost:3000` if everything went well.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.vinaypuppal.com/"><img src="https://avatars1.githubusercontent.com/u/8843216?v=4" width="100px;" alt="vínαч puppαl"/><br /><sub><b>vínαч puppαl</b></sub></a><br /><a href="https://github.com/vinaypuppal/donation-page/commits?author=vinaypuppal" title="Code">💻</a> <a href="https://github.com/vinaypuppal/donation-page/commits?author=vinaypuppal" title="Documentation">📖</a> <a href="#design-vinaypuppal" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
