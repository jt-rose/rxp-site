export interface SpecialCharData {
  symbol: string;
  name: string;
  description: string;
  APILink: string | null;
}

export interface RegexDataObj extends SpecialCharData {
  example: string;
}

export const regexData: RegexDataObj[] = [
  {
    symbol: "|",
    name: "or",
    description: "marks an alternative acceptable text",
    example: "(?:sample)|(?:other)",
    APILink: "or",
  },
  {
    symbol: "{3}",
    name: "occurs",
    description: "requires text to repeat specified amount of times",
    example: "(?:sample){5}",
    APILink: "occurs",
  },
  {
    symbol: "{3,}",
    name: "occurs at least",
    description:
      "requires text to repeat at least the specified amount of times",
    example: "(?:sample){5, }",
    APILink: "occursAtLeast",
  },
  {
    symbol: "{3, 6}",
    name: "occurs between",
    description:
      "requires text to repeat between the minimum and max range specified",
    example: "(?:sample){5, 8}",
    APILink: "occursBetween",
  },
  {
    symbol: "+",
    name: "one or more (greedy)",
    description: "Marks text as occuring once or more, using a greedy search",
    example: "(?:sample)+",
    APILink: "occursOnceOrMore",
  },
  {
    symbol: "+?",
    name: "one or more (lazy)",
    description: "Marks text as occuring once or more, using a lazy search",
    example: "(?:sample)+?",
    APILink: "occursOnceOrMore",
  },
  {
    symbol: "*",
    name: "zero or more (greedy)",
    description:
      "Marks text as occuring zero or more times, using a greedy search",
    example: "(?:sample)*",
    APILink: "occursZeroOrMore",
  },
  {
    symbol: "*?",
    name: "zero or more (lazy)",
    description:
      "Marks text as occuring zero or more times, using a lazy search",
    example: "(?:sample)*?",
    APILink: "occursZeroOrMore",
  },
  {
    symbol: "(?=...)",
    name: "followed by",
    description: "requires search text to be followed by specified text",
    example: "sample(?=after)",
    APILink: "followedBy",
  },
  {
    symbol: "(?!...)",
    name: "not followed by",
    description: "requires search text to NOT be followed by specified text",
    example: "sample(?!after)",
    APILink: "notFollowedBy",
  },
  {
    symbol: "(?<=...)",
    name: "preceded by",
    description: "requires search text to be preceded by specified text",
    example: "(?<=pre)sample",
    APILink: "precededBy",
  },
  {
    symbol: "(?<!...)",
    name: "not preceded by",
    description: "requires search text to NOT be preceded by specified text",
    example: "(?<!pre)sample",
    APILink: "notPrecededBy",
  },
  {
    symbol: "^",
    name: "at start",
    description: "marks text as occuring at beginning",
    example: "^(?:sample)",
    APILink: "atStart",
  },
  {
    symbol: "$",
    name: "at end",
    description: "marks text as occuring at end",
    example: "(?:sample)$",
    APILink: "atEnd",
  },
  {
    symbol: "?",
    name: "optional",
    description: "marks text as optional",
    example: "(?:sample)?",
    APILink: "isOptional",
  },
  {
    symbol: "(...)",
    name: "captured",
    description: "encapsulates text as a group and captures when matching",
    example: "(sample)",
    APILink: "isCaptured",
  },
  {
    symbol: "(?:...)",
    name: "non-capture grouping",
    description: "encapsulates text as a group without capturing",
    example: "(?:sample)",
    APILink: null,
  },
  {
    symbol: "(?<...>...) ... \\k<...>",
    name: "variable",
    description:
      "uses a named capture group to match each \\k<...> to the first instance",
    example: "(?<var>)\\d{2}) and \\k<var>",
    APILink: "isVariable",
  },
];

export const specialCharData: SpecialCharData[] = [
  {
    symbol: ".",
    name: "any character",
    description: "matches any single character",
    APILink: "anyCharacter",
  },
  {
    symbol: "[^...]",
    name: "any character except",
    description: "matches any single character not listed between [^ and ]",
    APILink: "anyCharacterExcept",
  },
  {
    symbol: "\\d",
    name: "any digit",
    description: "matches any single digit",
    APILink: "anyDigit",
  },
  {
    symbol: "\\D",
    name: "non-digit",
    description: "matches any single character that is not a digit",
    APILink: null,
  },
  {
    symbol: "\\w",
    name: "any letter",
    description: "matches any single letter",
    APILink: "anyLetter",
  },
  {
    symbol: "\\W",
    name: "non-letter",
    description: "matches any single character that is not a letter",
    APILink: null,
  },
  {
    symbol: "\\s",
    name: "space",
    description: 'matches a space between characters such as " "',
    APILink: null,
  },
  {
    symbol: "\\b",
    name: "word boundary",
    description:
      "marks a text as having a boundary, such as a space or start of the text",
    APILink: "withBoundaries",
  },
];
