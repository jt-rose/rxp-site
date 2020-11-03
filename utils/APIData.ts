export interface APIKeyData {
  key: string;
  description: string;
  samples: { sample: string; result: string }[];
  //matches: {RXPUnit: string, testString: string, result: string}[]
  // add later - code results (with code appearance)
}

const RXPUnitData: APIKeyData[] = [
  {
    key: "init",
    description:
      "Combines string, regex, or RXP Unit arguments into a single new RXP unit that can be modified with RXP methods and/or constructed into a regex literal.",
    samples: [
      {
        sample: "init('sample', / for /, initTextRXP)",
        result: "RXP Unit object with .text property 'sample for init'",
      },
    ],
    // link?
  },
  {
    key: "text",
    description:
      "Provides the current text that will be formatted into a regex literal with the consturct method.",
    samples: [
      {
        sample: "init('escape [ me').text",
        result: "'escape \\[ me'",
      },
    ],
    // link?
  },
  {
    key: "construct",
    description:
      "Converts the stored regex string into a regex literal, while correctly reconstructing variables. Regex flags can be specified as arguments passed to the function.",
    samples: [
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
    ],
    // link?
  },
  {
    key: "and",
    description:
      "Extends behavior modifiers applied to the original regex search text.",
    samples: [
      {
        sample: "init('sample').occurs(3).and.atStart",
        result: "/^(?:(?:sample){3})/",
      },
    ],
    // link
  },
];

const step1Data: APIKeyData[] = [
  {
    key: "or",
    description:
      "Provides an alternative possible match for the initial search data. Every unique argument provided to the 'or' method will result in an additional alternative possible text.",
    samples: [
      {
        sample: "sample.or('something else')",
        result: "/(?:(?:sample)|(?:something else))/",
      },
    ],
    // link
  },
];

const step2Data: APIKeyData[] = [
  {
    key: "occurs",
    description:
      "Define how many times the base text should occur, one after the other.",
    samples: [
      {
        sample: "sample.occurs(3)",
        result: "/(?:sample){3}/",
      },
    ],
    // link
  },
  {
    key: "occursOnceOrMore",
    description:
      "Marks the base text as occuring one or more times in a row. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' methods.",
    samples: [
      {
        sample: "sample.occursOnceOrMore",
        result: "/(?:sample)+?/",
      },
    ],
    // link
  },
  {
    key: "occursZeroOrMore",
    description:
      "Marks the base text as occuring zero or more times in a row. A lazy search is used by default but can be converted to a greedy search with the follow-up '.and.isGreedy' methods.",
    samples: [
      {
        sample: "sample.occursZeroOrMore",
        result: "/(?:sample)*?/",
      },
    ],
    // link
  },
  {
    key: "occursAtLeast",
    description:
      "Define the base text as repeating itself a minimal number of times.",
    samples: [
      {
        sample: "sample.occursAtLeast(2)",
        result: "/(?:sample){2,}/",
      },
    ],
    // link
  },
  {
    key: "occursBetween",
    description:
      "Define the base text as repeating itself between a minimal and maximal range.",
    samples: [
      {
        sample: "sample.occursBetween( 2, 4)",
        result: "/(?:sample){2,4}/",
      },
    ],
    // link
  },
];

const step2point5data: APIKeyData[] = [
  {
    key: "isGreedy",
    description:
      "Modifies previous search marker to use a greedy search. Can be applied after using either the 'occursOnceOrMore' or 'occursZeroOrMore' constructor methods, or after the 'oneOrMore' or 'zeroOrMore' shorthands.",
    samples: [
      {
        sample: "sample.occursOnceOrMore.and.isGreedy",
        result: "/(?:sample)+/",
      },
    ],
    // link
  },
];

const step3Data: APIKeyData[] = [
  {
    key: "followedBy",
    description:
      "Requires the base text to be followed by the arguments passed to this method.",
    samples: [
      {
        sample: "sample.followedBy('next')",
        result: "/sample(?=next)/",
      },
    ],
    // link
  },
  {
    key: "notFollowedBy",
    description:
      "Requires the base text to NOT be followed by the arguments passed to this method.",
    samples: [
      {
        sample: "sample.notFollowedBy('nada')",
        result: "/sample(?!nada)/",
      },
    ],
    // link
  },
  {
    key: "precededBy",
    description:
      "Requires the base text to be preceded by the arguments passed to this method.",
    samples: [
      {
        sample: "sample.precededBy('before')",
        result: "/(?<=before)sample/",
      },
    ],
    // link
  },
  {
    key: "notPrecededBy",
    description:
      "Requires the base text to NOT be preceded by the arguments passed to this method.",
    samples: [
      {
        sample: "sample.notPrecededBy('nada')",
        result: "/(?<!nada)sample/",
      },
    ],
    // link
  },
];

const step4Data: APIKeyData[] = [
  {
    key: "atStart",
    description:
      "Requires base text to occur at the beginning of the search text.",
    samples: [
      {
        sample: "sample.atStart",
        result: "/^(?:sample)/",
      },
    ],
    // link
  },
  {
    key: "atEnd",
    description: "Requires base text to occur at the end of the search text.",
    samples: [
      {
        sample: "sample.atEnd",
        result: "/(?:sample)$/",
      },
    ],
    // link
  },
];

const step5Data: APIKeyData[] = [
  {
    key: "isOptional",
    description:
      "Marks base text as being optional. The text will not required for a match but will be included when found.",
    samples: [
      {
        sample: "sample.isOptional",
        result: "/(?:sample)?/",
      },
    ],
    // link
  },
  {
    key: "isCaptured",
    description:
      "Marks text as being individually captured when found. By default, RXP uses noncapture groupings, but this method will override that behavior.",
    samples: [
      {
        sample: "sample.isCaptured",
        result: "/((?:sample))/",
      },
    ],
    // link
  },
  {
    key: "isVariable",
    description:
      "Marks the given text as a regex variable. This variable can then be reused in the RXP constructor to make sure both instances correspond. RXP will parse the variables when the 'construct' method is called and reconfigure them based on the order of usage so they will work as expected. By abstracting this process away, you can just declare the variable, insert it wherever you need, and not have to worry about using the appropriate syntax. A string argument can be provided to declare the variable name, or no argument can be provided and RXP will create a unique name for you.",
    samples: [
      {
        sample: "sample.isVariable('myVariable')",
        result: "/(?<myVariable>sample)/ or /\\k<myVariable>/",
      },
    ],
    // link
  },
];

// Presets
const presetsData: APIKeyData[] = [
  {
    key: "anyCharacter",
    description:
      "Matches any possible character. Equivalent to the . special character.",
    samples: [
      {
        sample: "anyCharacter",
        result: "/./",
      },
    ],
    // link
  },
  {
    key: "anyCharacterExcept",
    description:
      "Matches any possible character except the ones passed as arguments to the function. Equivalent to negating charcters with the [^...] syntax.",
    samples: [
      {
        sample: "anyCharacterExcept('T', 'x')",
        result: "/[^Tx]/",
      },
    ],
    // link
  },
  {
    key: "anyDigit",
    description:
      "Matches any possible single digit. Equivalent to the \\d special character.",
    samples: [
      {
        sample: "anyDigit",
        result: "/[1234567890]/",
      },
    ],
    // link
  },
  {
    key: "anyDigitExcept",
    description:
      "Matches any possible single digit except those passed as arguments to the function.",
    samples: [
      {
        sample: "anyDigitExcept(3,4,5)",
        result: "/[1267890]/",
      },
    ],
    // link
  },
  {
    key: "anyUpperCase",
    description: "Matches any possible uppercase letter. Equivalent to [A-Z].",
    samples: [
      {
        sample: "anyUpperCase",
        result: "/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/",
      },
    ],
    // link
  },
  {
    key: "anyUpperCaseExcept",
    description:
      "Matches any possible uppercase letter except those passed as arguments to the function.",
    samples: [
      {
        sample: "anyUpperCaseExcept('A', 'B', 'C')",
        result: "/[DEFGHIJKLMNOPQRSTUVWXYZ]/",
      },
    ],
    // link
  },
  {
    key: "anyLowerCase",
    description: "Matches any possible lowercase letter. Equivalent to [a-z].",
    samples: [
      {
        sample: "anyLowerCase",
        result: "/[abcdefghijklmnopqrstuvwxyz]/",
      },
    ],
    // link
  },
  {
    key: "anyLowerCaseExcept",
    description:
      "Matches any possible lowercase letter except those passed as arguments to the function.",
    samples: [
      {
        sample: "anyLowerCaseExcept('x', 'y', 'z')",
        result: "/[abcdefghijklmnopqrstuvw]/",
      },
    ],
    // link
  },
  {
    key: "anyLetter",
    description:
      "Matches any possible letter, regardless of case. Equivalent to [a-zA-Z].",
    samples: [
      {
        sample: "anyLetter",
        result: "/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/",
      },
    ],
    // link
  },
  {
    key: "anyLetterExcept",
    description:
      "Matches any possible lowercase or uppercase letter except those passed as arguments to the function.",
    samples: [
      {
        sample: "anyLetterExcept('a', 'A')",
        result: "/[bcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ]/",
      },
    ],
    // link
  },
];

// Shorthands

const shorthandsData: APIKeyData[] = [
  {
    key: "either",
    description:
      "Accepts two or more arguments that will be searched as alternate options. Equivalent to init('north').or('south').",
    samples: [
      {
        sample: "either('north', 'south')",
        result: "/(?:(?:north)|(?:south))/",
      },
    ],
    // link
  },
  {
    key: "optional",
    description:
      "Marks text as optional. Equivalent to init('maybe').isOptional.",
    samples: [
      {
        sample: "optional('maybe')",
        result: "/(?:maybe)?/",
      },
    ],
    // link
  },
  {
    key: "oneOrMore",
    description:
      "Marks text as occuring once or more. Equivalent to init('sample').occursOnceOrMore.",
    samples: [
      {
        sample: "oneOrMore('sample')",
        result: "/(?:sample)+?/",
      },
    ],
    // link
  },
  {
    key: "zeroOrMore",
    description:
      "Marks text as occuring zero or more times. Equivalent to init('sample').occursZeroOrMore.",
    samples: [
      {
        sample: "zeroOrMore('sample')",
        result: "/(?:sample)*?/",
      },
    ],
    // link
  },
  {
    key: "wrapRXP",
    description:
      "Creates a new init-style function that will wrap any arguments provided to it in the arguments passed to wrapRXP.",
    samples: [
      {
        sample: "const wrapBrackets = wrapRXP('[', ']')",
        result: "wrapBrackets('sample') => /\\[sample\\]/",
      },
    ],
    // link
  },
  {
    key: "withBoundaries",
    description:
      "Marks the arguments provided as being surrounded by \\b boundary markers.",
    samples: [
      {
        sample: "withBoundaries('sample')",
        result: "/\bsample\b/",
      },
    ],
    // link
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
