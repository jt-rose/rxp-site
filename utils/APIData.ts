export interface APIKeyData {
  key: string;
  description: string;
  //samples: { sample: string; result: string }[];
  codeSample: string;
  //matches: {RXPUnit: string, testString: string, result: string}[]
  // add later - code results (with code appearance)
}

const RXPUnitData: APIKeyData[] = [
  {
    key: "init",
    description:
      "Combines string, regex, or RXP Unit arguments into a single new RXP unit that can be modified with RXP methods and/or constructed into a regex literal.",
    /*samples: [
      {
        sample: "init('sample', / for /, initTextRXP)",
        result: "RXP Unit object with .text property 'sample for init'",
      },
    ],*/
    codeSample: `init("sample", / for /, initTextRXP)
    // RXP Unit object with .text property "sample for init"`
  },
  {
    key: "text",
    description:
      "Provides the current text that will be formatted into a regex literal with the consturct method.",
    /*samples: [
      {
        sample: "init('escape [ me').text",
        result: "'escape \\[ me'",
      },
    ],*/
    codeSample: `init("escape [ me").text
    // "escape \\[ me"`
  },
  {
    key: "construct",
    description:
      "Converts the stored regex string into a regex literal, while correctly reconstructing variables. Regex flags can be specified as arguments passed to the function.",
    /*samples: [
      {
        sample: "sample.construct()",
        result: "/sample/",
      },
      {
        sample: "sample.construct('g')",
        result: "/sample/g",
      },
      {
        sample: "sample.construct('global', 'i', 's')",
        result: "/sample/gis",
      },
    ],*/
    // link?
    codeSample: `sample.construct() // /sample/
    sample.construct("g") // /sample/g
    sample.construct("global", "i", "s") // /sample/gis`
  },
  {
    key: "and",
    description:
      "Extends behavior modifiers applied to the original regex search text.",
    codeSample: `init("sample").occurs(3).and.atStart // /^(?:(?:sample){3})/`
  },
];

const step1Data: APIKeyData[] = [
  {
    key: "or",
    description:
      "Provides an alternative possible match for the initial search data. Every unique argument provided to the 'or' method will result in an additional alternative possible text.",
    codeSample: `sample.or('something else') // /(?:(?:sample)|(?:something else))/`
  },
];

const step2Data: APIKeyData[] = [
  {
    key: "occurs",
    description:
      "Define how many times the base text should occur, one after the other.",
    codeSample: `sample.occurs(3) // /(?:sample){3}/`
  },
  {
    key: "occursOnceOrMore",
    description:
      "Marks the base text as occuring one or more times in a row. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' methods.",
    codeSample: `sample.occursOnceOrMore // /(?:sample)+?/`
  },
  {
    key: "occursZeroOrMore",
    description:
      "Marks the base text as occuring zero or more times in a row. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' methods.",
    codeSample: `sample.occursZeroOrMore // /(?:sample)*?/`
  },
  {
    key: "occursAtLeast",
    description:
      "Define the base text as repeating itself a minimal number of times.",
    codeSample: `sample.occursAtLeast(2) // /(?:sample){2,}/`
  },
  {
    key: "occursBetween",
    description:
      "Define the base text as repeating itself between a minimal and maximal range.",
    codeSample: `sample.occursBetween( 2, 4) // /(?:sample){2,4}/`
  },
];

const step2point5data: APIKeyData[] = [
  {
    key: "isGreedy",
    description:
      "Modifies previous search marker to use a greedy search. Can be applied after using either the 'occursOnceOrMore' or 'occursZeroOrMore' constructor methods, or after the 'oneOrMore' or 'zeroOrMore' shorthands.",
    codeSample: `sample.occursOnceOrMore.and.isGreedy // /(?:sample)+/`
  },
];

const step3Data: APIKeyData[] = [
  {
    key: "followedBy",
    description:
      "Requires the base text to be followed by the arguments passed to this method.",
    codeSample: `sample.followedBy('next') // /sample(?=next)/`
  },
  {
    key: "notFollowedBy",
    description:
      "Requires the base text to NOT be followed by the arguments passed to this method.",
    codeSample: `sample.notFollowedBy("nada") // /sample(?!nada)/`
  },
  {
    key: "precededBy",
    description:
      "Requires the base text to be preceded by the arguments passed to this method.",
    codeSample: `sample.precededBy('before') // /(?<=before)sample/`
  },
  {
    key: "notPrecededBy",
    description:
      "Requires the base text to NOT be preceded by the arguments passed to this method.",
    codeSample: `sample.notPrecededBy("nada") // /(?<!nada)sample/`
  },
];

const step4Data: APIKeyData[] = [
  {
    key: "atStart",
    description:
      "Requires base text to occur at the beginning of the search text.",
    codeSample: `sample.atStart // /^(?:sample)/`
  },
  {
    key: "atEnd",
    description: "Requires base text to occur at the end of the search text.",
    codeSample: `sample.atEnd // /(?:sample)$/`
  },
];

const step5Data: APIKeyData[] = [
  {
    key: "isOptional",
    description:
      "Marks base text as being optional. The text will not required for a match but will be included when found.",
    codeSample: `sample.isOptional // /(?:sample)?/`
  },
  {
    key: "isCaptured",
    description:
      "Marks text as being individually captured when found. By default, RXP uses noncapture groupings, but this method will override that behavior.",
    codeSample: `sample.isCaptured // /((?:sample))/`
  },
  {
    key: "isVariable",
    description:
      "Marks the given text as a regex variable. This variable can then be reused in the RXP constructor to make sure both instances correspond. RXP will parse the variables when the 'construct' method is called and reconfigure them based on the order of usage so they will work as expected. By abstracting this process away, you can just declare the variable, insert it wherever you need, and not have to worry about using the appropriate syntax. A string argument can be provided to declare the variable name, or no argument can be provided and RXP will create a unique name for you.",
    codeSample: `sample.isVariable("myVariable") // /(?<myVariable>sample)/ or /\\k<myVariable>/`
  },
];

// Presets
const presetsData: APIKeyData[] = [
  {
    key: "anyCharacter",
    description:
      "Matches any possible character. Equivalent to the . special character.",
    codeSample: `anyCharacter // /./`
  },
  {
    key: "anyCharacterExcept",
    description:
      "Matches any possible character except the ones passed as arguments to the function. Equivalent to negating charcters with the [^...] syntax.",
    codeSample: `anyCharacterExcept("T", "x") // /[^Tx]/`
  },
  {
    key: "anyDigit",
    description:
      "Matches any possible single digit. Equivalent to the \\d special character.",
    codeSample: `anyDigit // /[1234567890]/`
  },
  {
    key: "anyDigitExcept",
    description:
      "Matches any possible single digit except those passed as arguments to the function.",
    codeSample: `anyDigitExcept(3,4,5) // /[1267890]/`
  },
  {
    key: "anyUpperCase",
    description: "Matches any possible uppercase letter. Equivalent to [A-Z].",
    codeSample: `anyUpperCase // /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyUpperCaseExcept",
    description:
      "Matches any possible uppercase letter except those passed as arguments to the function.",
    codeSample: `anyUpperCaseExcept("A", "B", "C") // /[DEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLowerCase",
    description: "Matches any possible lowercase letter. Equivalent to [a-z].",
    codeSample: `anyLowerCase // /[abcdefghijklmnopqrstuvwxyz]/`
  },
  {
    key: "anyLowerCaseExcept",
    description:
      "Matches any possible lowercase letter except those passed as arguments to the function.",
    codeSample: `anyLowerCaseExcept("x", "y", "z") // /[abcdefghijklmnopqrstuvw]/`
  },
  {
    key: "anyLetter",
    description:
      "Matches any possible letter, regardless of case. Equivalent to [a-zA-Z].",
    codeSample: `anyLetter // /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLetterExcept",
    description:
      "Matches any possible lowercase or uppercase letter except those passed as arguments to the function.",
    codeSample: `anyLetterExcept("a", "A") // [bcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ]`
  },
];

// Shorthands

const shorthandsData: APIKeyData[] = [
  {
    key: "either",
    description:
      "Accepts two or more arguments that will be searched as alternate options. Equivalent to init('north').or('south').",
    codeSample: `either("north", "south") // /(?:(?:north)|(?:south))/`
  },
  {
    key: "optional",
    description:
      "Marks text as optional. Equivalent to init('maybe').isOptional.",
    codeSample: `optional("maybe") // /(?:maybe)?/`
  },
  {
    key: "oneOrMore",
    description:
      "Marks text as occuring once or more. Equivalent to init('sample').occursOnceOrMore.",
    codeSample: `oneOrMore("sample") // /(?:sample)+?/`
  },
  {
    key: "zeroOrMore",
    description:
      "Marks text as occuring zero or more times. Equivalent to init('sample').occursZeroOrMore.",
    codeSample: `zeroOrMore("sample") // /(?:sample)*?/`
  },
  {
    key: "wrapRXP",
    description:
      "Creates a new init-style function that will wrap any arguments provided to it in the arguments passed to wrapRXP.",
    codeSample: `const wrapBrackets = wrapRXP("[", "]")
wrapBrackets("sample") // /\\[sample\\]/`
  },
  {
    key: "withBoundaries",
    description:
      "Marks the arguments provided as being surrounded by \\b boundary markers.",
    codeSample: `withBoundaries("sample") // /\\bsample\\b/`
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
