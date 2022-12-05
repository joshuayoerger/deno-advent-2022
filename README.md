# Advent of Code 2022 - Deno

Hello! These are my Advent of Code (AoC) solutions using [Deno](https://deno.land/) and [Typescript](https://www.typescriptlang.org/). Deno is a modern JavaScript runtime made by the creator of Node. Check out the [installation intructions](https://deno.land/manual/getting_started/installation) to get Deno set up on your platform.

I have created a rudimentary script, `fetch_day.ts`, to pull down the instructions and input for each day of the advent. It also creates a simple TypeScript solution file, with some of the boilerplate prepopulated. Run this script in your project directory using Deno,

```sh
deno run --allow-net --allow-read --allow-write fetch_day.ts DAY SESSION
```

Replace **DAY** with the day you want to fetch and **SESSION** with the session cookie value found in your web browser after signing in to the AoC website. For example,

```sh
deno run --allow-net --allow-read --allow-write fetch_day.ts 3 verylongalphanumericstringhere
```

As you work on your solution, you can run it with a similar command,

```sh
deno run --allow-read day1.ts
```

Take the output, paste it into the answer box on the AoC website, and you are good to go.

Happy coding and merry Christmas! :)
