module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.tsx'],
            defaultExtractor: content =>
              content
                .match(/[\w-/:%]+(?<!:)/g)
                .concat(content.match(/html|body|after|before|snackbar|snackbarks|tippy|next/g)) || [],
            whitelistPatterns: [/html/, /body/, /after/, /before/, /tippy/, /next/, /snackbar/, /snackbarks/],
          }),
          require('cssnano'),
        ]
      : []),
  ],
};
