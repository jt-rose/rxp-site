interface SpecialCharData {
    symbol: string;
    name: string;
    description: string;
}

interface RegexDataObj extends SpecialCharData {
    example: string;
}

export const regexData: RegexDataObj[] = [
    {
        symbol: "|",
        name: "or",
        description: "marks an alternative acceptable text",
        example: "(?:sample)|(?:other)"
    },
    {
        symbol: "{3}",
        name: "occurs",
        description: "requires base text to repeat specified amount of times",
        example: "(?:sample){5}"
    },
    {
        symbol: "{3,}",
        name: "occurs (minimum or more)",
        description: "requires base text to repeat at least the specified amount of times",
        example: "(?:sample){5, }"
    },
    {
        symbol: "{3, 6}",
        name: "occurs between",
        description: "requires base text to repeat between the minimum and max range specified",
        example: "(?:sample){5, 8}"
    },
    {
        symbol: "+",
        name: "one or more (greedy)",
        description: "Marks base text as occuring once or more, using a greedy search.",
        example: "(?:sample)+"
    },
    {
        symbol: "+?",
        name: "one or more (lazy)",
        description: "Marks base text as occuring once or more, using a lazy search.",
        example: "(?:sample)+?"
    },
    {
        symbol: "*",
        name: "zero or more (greedy)",
        description: "Marks base text as occuring zero or more times, using a greedy search.",
        example: "(?:sample)*"
    },
    {
        symbol: "*?",
        name: "zero or more (lazy)",
        description: "Marks base text as occuring zero or more times, using a lazy search.",
        example: "(?:sample)*?"
    },
    {
        symbol: "(?=...)",
        name: "followed by",
        description: "requires base text to be followed by specified text",
        example: "sample(?=lorem)"
    },
    {
        symbol: "(?!...)",
        name: "not followed by",
        description: "requires base text to NOT be followed by specified text",
        example: "sample(?!lorem)"
    },
    {
        symbol: "(?<=...)",
        name: "preceded by",
        description: "requires base text to be preceded by specified text",
        example: "(?<=lorem)sample"
    },
    {
        symbol: "(?<!...)",
        name: "not preceded by",
        description: "requires base text to NOT be preceded by specified text",
        example: "(?<!lorem)sample"
    },
    {
        symbol: "^",
        name: "at start",
        description: "marks text as occuring at beginning",
        example: "^(?:sample)"
    },
    {
        symbol: "$",
        name: "at end",
        description: "marks text as occuring at end",
        example: "(?:sample)$"
    },
    {
        symbol: "?",
        name: "optional",
        description: "marks text as optional",
        example: "(?:sample)?"
    },
    {
        symbol: "(...)",
        name: "captured",
        description: "encapsulates text as a group and captures when matching",
        example: "(sample)"
    },
    {
        symbol: "(?:...)",
        name: "non-capture grouping",
        description: "encapsulates text as a group without capturing",
        example: "(sample)"
    },
    {
        symbol: "(?<...>...) ... \\k<...>",
        name: "variable",
        description: "uses a named capture group to match each \\k<...> to the first instance",
        example: "(?<var>)\\d{2}) and \\k<var>"
    },
];

export const specialCharData: SpecialCharData[] = [
    {
        symbol: ".",
        name: "any character",
        description: "matches any single character"
    },
    {
        symbol: "[^...]",
        name: "not specified character",
        description: "matches any single character not listed between '[^' and ']'"
    },
    {
        symbol: "\\d",
        name: "any digit",
        description: "matches any single digit"
    },
    {
        symbol: "\\D",
        name: "non-digit",
        description: "matches any single character that is not a digit"
    },
    {
        symbol: "\\w",
        name: "any letter",
        description: "matches any single letter"
    },
    {
        symbol: "\\W",
        name: "non-digit",
        description: "matches any single character that is not a letter"
    },
    {
        symbol: "\\s",
        name: "space",
        description: "matches a space between characters such as ' '"
    },
    {
        symbol: "\\b",
        name: "word boundary",
        description: "marks a text as having a boundary, such as a space or start of the text"
    },
]