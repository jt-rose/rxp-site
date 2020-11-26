export interface APIKeyData {
  key: string;
  description: string;
  codeSample: string;
}

const RXPUnitData: APIKeyData[] = [
  {///////
    key: "init",
    description:
      "Combines string, regex, or RXP Unit arguments into a single new RXP unit that can be modified with RXP methods and/or constructed into a regex literal.",
    codeSample: `init("sample", / for /, initTextRXP)
// RXP Unit object with .text property "sample for init"`
  },
  {/////////
    key: "text",
    description:
      "Provides the current string version of the regex that will be formatted into a regex literal with the construct method.",
    codeSample: `init("escape [ me").text
//  result: "escape \\[ me"`
  },
  {///////////
    key: "construct",
    description:
      "Converts the stored regex string into a regex literal, while correctly reconstructing variables. Regex flags can be specified as arguments passed to the function.",
    codeSample: `sample.construct() //  result: /sample/
sample.construct("g") // result: /sample/g
sample.construct("global", "i", "s") // result: /sample/gis`
  },
  {/////////
    key: "and",
    description:
      "Extends behavior modifiers applied to the original regex search text.",
    codeSample: `init("sample").occurs(3).and.atStart.construct() 
//  result: /^(?:(?:sample){3})/`
  },
];

const step1Data: APIKeyData[] = [
  {
    key: "or",
    description:
      "Provides an alternative possible match for the initial search text. Every unique argument provided to the 'or' method will result in an additional alternative possible text.",
    codeSample: `sample.or('something else').construct() 
//  result: /(?:(?:sample)|(?:something else))/

sample.or("this", "that").construct()
//  result: /(?:(?:sample)|(?:this)|(?:that))/
`
  },
];

const step2Data: APIKeyData[] = [
  {
    key: "occurs",
    description:
      "Define how many times the search text should occur, one after the other.",
    codeSample: `sample.occurs(3).construct() 
//  result: /(?:sample){3}/`
  },
  {
    key: "occursOnceOrMore",
    description:
      "Marks the search text as occuring one or more times, one after another. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' method.",
    codeSample: `sample.occursOnceOrMore.construct() 
//  result: /(?:sample)+?/`
  },
  {
    key: "occursZeroOrMore",
    description:
      "Marks the search text as occuring zero or more times, one after another. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' method.",
    codeSample: `sample.occursZeroOrMore.construct() 
//  result: /(?:sample)*?/`
  },
  {
    key: "occursAtLeast",
    description:
      "Define the search text as repeating itself, one after another, a minimal number of times.",
    codeSample: `sample.occursAtLeast(2).construct() 
//  result: /(?:sample){2,}/`
  },
  {
    key: "occursBetween",
    description:
      "Define the search text as repeating itself, one after another, between a minimal and maximal range.",
    codeSample: `sample.occursBetween( 2, 4).construct() 
//  result: /(?:sample){2,4}/`
  },
];

const step2point5data: APIKeyData[] = [
  {
    key: "isGreedy",
    description:
      "Modifies previous search marker to use a greedy search. Can be applied after using either the 'occursOnceOrMore' or 'occursZeroOrMore' constructor methods, or after the 'oneOrMore' or 'zeroOrMore' shorthands.",
    codeSample: `sample.occursOnceOrMore.and.isGreedy.construct() 
//  result: /(?:sample)+/`
  },
];

const step3Data: APIKeyData[] = [
  {
    key: "followedBy",
    description:
      "Requires the search text to be followed by the arguments passed to this method.",
    codeSample: `sample.followedBy("next").construct() 
//  result: /sample(?=next)/`
  },
  {
    key: "notFollowedBy",
    description:
      "Requires the search text to NOT be followed by the arguments passed to this method.",
    codeSample: `sample.notFollowedBy("nada").construct() 
//  result: /sample(?!nada)/`
  },
  {
    key: "precededBy",
    description:
      "Requires the search text to be preceded by the arguments passed to this method.",
    codeSample: `sample.precededBy("before").construct() 
//  result: /(?<=before)sample/`
  },
  {
    key: "notPrecededBy",
    description:
      "Requires the search text to NOT be preceded by the arguments passed to this method.",
    codeSample: `sample.notPrecededBy("nada").construct() 
//  result: /(?<!nada)sample/`
  },
];

const step4Data: APIKeyData[] = [
  {
    key: "atStart",
    description:
      "Requires search text to occur at the beginning of the string being tested.",
    codeSample: `sample.atStart.construct() 
//  result: /^(?:sample)/`
  },
  {
    key: "atEnd",
    description: "Requires search text to occur at the end of the string being tested.",
    codeSample: `sample.atEnd.construct() 
//  result: /(?:sample)$/`
  },
];

const step5Data: APIKeyData[] = [
  {
    key: "isOptional",
    description:
      "Marks search text as being optional. The text will not be required for a match but will be included when found.",
    codeSample: `sample.isOptional.construct() 
//  result: /(?:sample)?/`
  },
  {
    key: "isCaptured",
    description:
      "Marks search text as being individually captured when found. By default, RXP uses noncapture groupings, but this method will override that behavior.",
    codeSample: `sample.isCaptured.construct() 
//  result: /((?:sample))/`
  },
  {////////////////////
    key: "isVariable",
    description:
      "Marks the search text as a regex variable. This variable can then be reused in the RXP constructor to make sure both instances correspond. RXP will parse the variables when the 'construct' method is called and reconfigure them based on the order of usage so they will work as expected. By abstracting this process away, you can just declare the variable, insert it wherever you need, and not have to worry about using the appropriate syntax. A string argument can be provided to declare the variable name, or no argument can be provided and RXP will create a unique name for you.",
    codeSample: `sample.isVariable("myVariable").construct() 
//  result: /(?<myVariable>sample)/ or /\\k<myVariable>/
//  the variable will be formatted based on its position in the regex`
  },
];

// Presets
const presetsData: APIKeyData[] = [
  {
    key: "anyCharacter",
    description:
      "Matches any possible character. Equivalent to the . special character.",
    codeSample: `anyCharacter.construct() 
//  result: /./`
  },
  {
    key: "anyCharacterExcept",
    description:
      "Matches any possible character except the ones passed as arguments to the function. Equivalent to negating charcters with the [^...] syntax.",
    codeSample: `anyCharacterExcept("T", "x").construct() 
//  result: /[^Tx]/`
  },
  {
    key: "anyDigit",
    description:
      "Matches any possible single digit. Equivalent to the \\d special character.",
    codeSample: `anyDigit.construct() 
//  result: /[1234567890]/`
  },
  {
    key: "anyDigitExcept",
    description:
      "Matches any possible single digit except those passed as arguments to the function.",
    codeSample: `anyDigitExcept(3,4,5).construct() 
//  result: /[1267890]/`
  },
  {
    key: "anyUpperCase",
    description: "Matches any possible uppercase letter. Equivalent to [A-Z].",
    codeSample: `anyUpperCase.construct() 
//  result: /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyUpperCaseExcept",
    description:
      "Matches any possible uppercase letter except those passed as arguments to the function.",
    codeSample: `anyUpperCaseExcept("A", "B", "C").construct() 
//  result: /[DEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLowerCase",
    description: "Matches any possible lowercase letter. Equivalent to [a-z].",
    codeSample: `anyLowerCase.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyz]/`
  },
  {
    key: "anyLowerCaseExcept",
    description:
      "Matches any possible lowercase letter except those passed as arguments to the function.",
    codeSample: `anyLowerCaseExcept("x", "y", "z").construct() 
//  result: /[abcdefghijklmnopqrstuvw]/`
  },
  {
    key: "anyLetter",
    description:
      "Matches any possible letter, regardless of case. Equivalent to [a-zA-Z].",
    codeSample: `anyLetter.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLetterExcept",
    description:
      "Matches any possible lowercase or uppercase letter except those passed as arguments to the function.",
    codeSample: `anyLetterExcept("a", "A").construct() 
//  result: [bcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ]`
  },
];

// Shorthands

const shorthandsData: APIKeyData[] = [
  {
    key: "either",
    description:
      "Accepts two or more arguments that will be searched as alternate options. Equivalent to init('north').or('south').",
    codeSample: `either("north", "south").construct() 
//  result: /(?:(?:north)|(?:south))/

const directions = ["up", "right", "down", "left"]
either(...directions).construct()
//  result: /(?:(?:up)|(?:right)|(?:down)|(?:left))/`
  },
  {
    key: "optional",
    description:
      "Marks text as optional. Equivalent to init('maybe').isOptional.",
    codeSample: `optional("maybe").construct() 
//  result: /(?:maybe)?/`
  },
  {
    key: "oneOrMore",
    description:
      "Marks search text as occuring once or more. Equivalent to init('sample').occursOnceOrMore.",
    codeSample: `oneOrMore("sample").construct() 
//  result: /(?:sample)+?/`
  },
  {
    key: "zeroOrMore",
    description:
      "Marks search text as occuring zero or more times. Equivalent to init('sample').occursZeroOrMore.",
    codeSample: `zeroOrMore("sample").construct() 
//  result: /(?:sample)*?/`
  },
  {
    key: "wrapRXP",
    description:
      "Creates a new init-style function that will wrap any arguments provided to it in the arguments passed to wrapRXP.",
    codeSample: `const wrapBrackets = wrapRXP("[", "]")
wrapBrackets("sample").construct() 
//  result: /\\[sample\\]/`
  },
  {//////////////// note about uniqie constructor
    key: "withBoundaries",
    description:
      "Marks the arguments provided as being surrounded by \\b boundary markers.",
    codeSample: `withBoundaries("sample").construct() 
// result: /\\bsample\\b/`
  },
];

export const APIData = {
  RXPUnitData,
  step1Data,
  step2Data,
  step2point5data,
  step3Data,
  step4Data,
  step5Data,
  presetsData,
  shorthandsData,
};
