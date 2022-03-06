# ONTO React Engineer Test - HARDIK MANDAVIA


## To Run

```
yarn

yarn start
```

## Set up

The initial project was set up using a template project I have previously set up while doing my own R&D and practice in setting up a React + TS project from scratch without the use of NextJS or CreateReactApp etc.

This project can be found on my github page [here](https://github.com/hardikmandavia/react-template-ts), including a step by step guide to setting up the project from scratch that I had built up through that previous exercise.

This project is set up using `react v17.0.2` with `webpack` and `typescript v4.5.2` and uses `styled-components` to handle the styling.

There are some examples of implementations of some basic react concepts included as part of the template as well, including:

- a reusable react hook called `useInterval` that can be used as a polling/timeout implementation in a component.

- a basic implementation of a context

- routing using `react-router-dom` which sets up an entry route as well as an example `/test` that just displays a generic message.

## Development and thoughts

I leveraged one the context implementation in order to separate some data handling from the ui components in that I renamed/updated the context properties and made use of the `useEffect` hook to iterate over the seed data json file provided for this test and group the data by year and then by date within the year. I appreciate the seed data only included data from a single year so for an MVP implementation it may not have been required to group the data by year as well, but doing this makes the data grouping function a bit more scalabe and robust as well as allow for a better implementation of the Heatmap component.

The Heatmap component itself initially creates a set off arrays to model a full year i.e. 365 days for a given year (or 366 if the given year is a leap year), 12 months and 7 days of the week in order to iterate to build all the cells and the axis labels. This allowed for an implementation of the Heatmap for an anonymous year, but would be incorrect for a given year as initially the first cell would be aligned with `Su` which wouldn't be correct for most years. So in order to correct this I included the year as a property on the heatmap to allow construction of the first date of the year i.e. `{year}-01-01` and get the day integer of this date to then calculate an offset for the first cell to push the cells to align with the correct day.

I kept the data map expected by the Heatmap component more generic and not assuming a specific format for the tooltips (i.e. not to expect values for successful / failed transactions for example) and expects only a value and a react node for the tooltip contents.

When parsing the data to be passed to the heatmap, the grouped data set is iterated on the initial keys (i.e. the years, then a set of data is contstructed for each date by calculating the difference of successful to failed transactions and constructing the contents of the tooltip with the date and values for successful and failed), then, when rendering, a Heatmap is rendered for every year in the dataset.

For the cell display itself, the color of the cell without any data is the default very transparent black color. If there is data and the value is 0 (i.e. equal success to failed) the color is set to a more opaque black color. If this value is greater or less than 0, this value controls the `alpha` value of the color and the color itself is red for negative and green for positive.


## Improvements

Some steps I wouldd take to improve on my implementation:

- include some basic unit testing in order to check the components are rendered correctly as well as test some events such as the onMouseEnter and onMouseLeave events on the cell component.

- extract the various colors and some fixed heights/widths/margins etc out into a constants file as well as some calculated totals for these measurements. Currently there are a few "magic numbers" being used and would be better to add context behind them using some meaningful variable names, e.g. for the first cell offset described above, the day integer is multiplied by `16` to calculate the offset, this number is actually the totals of `height`, `margin` and `border` of a single cell.

- This implementation is currently not responsive. The container has an `overflow: scroll` to allow the Heatmap to maintain its width but will scroll on smaller screens. Instead, it would be better for small screens, the Heatmap switches to a vertical format (i.e. the days of the week across the top and the months down the left).
