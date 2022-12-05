import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

// Run this script in your project directory with Deno. Replace 'DAY' with the
// day you want to fetch and SESSION with the session cookie value found in your
// web browser after signing in to the Advent of Code website.
// **PLEASE BE MINDFUL** of how often you query the AoC website.
// `deno run --allow-net --allow-read --allow-write fetch_day.ts DAY SESSION`
// e.g `deno run --allow-net --allow-read --allow-write fetch_day.ts 3 verylongalphanumericstringhere

async function getInstructions(day: string): Promise<string> {
  const textResponse = await fetch("https://adventofcode.com/2022/day/" + day);
  const htmlData = await textResponse.text();
  const textData = new DOMParser().parseFromString(htmlData, "text/html");

  if (textData === null) {
    throw new Error("Could not parse HTML");
  }

  try {
    const text = textData!.querySelector("article.day-desc")!.textContent;
    return text;
  } catch (error) {
    throw new Error(
      "Could not find instructions (article.day-desc) in HTML reponse" + "\n" + error,
    );
  }
}

interface InputOptions {
  day: string;
  session: string;
}

async function getInput(options: InputOptions): Promise<string> {
  return await fetch(
    "https://adventofcode.com/2022/day/" + options.day + "/input",
    { headers: { Cookie: "session=" + options.session } },
  ).then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(
        "Could not fetch input. Did you supply a valid session cookie?" + "\n" +
          response.status + ": " +
          response.statusText,       
      );
    }
  })

  //// Example:
  // fetch(url).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error('Something went wrong');
  // })
  // .then((responseJson) => {
  //   // Do something with the response
  // })
  // .catch((error) => {
  //   console.log(error)
  // });
}

async function getDay(options: InputOptions): Promise<void> {
  const instructions = await getInstructions(options.day);
  const input = await getInput(options);

  await Deno.writeTextFile("./day" + options.day + ".txt", instructions);
  await Deno.writeTextFile("./day" + options.day + "-input.txt", input);
}

async function createFiles(day: string): Promise<void> {
  const _ANSWER_BOILERPLATE = `const _EXAMPLE_INPUT = \`Paste example from problem text here :)\`;
  
const _INPUT = await Deno.readTextFile('./day${day}-input.txt');
  
// We usually want to split each line of the raw input into an array for iteration.
// Switch which input is commented out once your code works with the example.
const input = _EXAMPLE_INPUT.trim().split('\\n');
// const input = _INPUT.trim().split('\\n');

// Part One

// Your solution code here.
const answerOne = 'answerOne';


console.log('Part One: ' + answerOne);

// Part Two

// Your solution code here.
const answerTwo = 'answerTwo';


console.log('Part Two: ' + answerTwo);
`;

  await Deno.writeTextFile(`day${day}.ts`, _ANSWER_BOILERPLATE);
}

// TODO: Get the date and time before attempting to fetch todays problem so
// that we can check if it's available yet

try {
  const options = { day: Deno.args[0], session: Deno.args[1] };
  try {
    await getDay(options);
    console.log("Instructions written to ./day" + options.day + ".html");
    console.log("Input written to ./day" + options.day + "-input.html");
    
    await createFiles(options.day);
    console.log("Solution file create at ./day" + options.day + ".ts");

  } catch (error) {
    console.error(error);
  }
} catch {
  console.log("Invalid arguments");
}
