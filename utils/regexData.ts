interface RegexDataObj {
    symbol: string;
    name: string;
    description: string;
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
        name: "occursAtLeast",
        description: "requires base text to repeat at least the specified amount of times",
        example: "(?:sample){5, }"
    },
    {
        symbol: "{3, 6}",
        name: "occursBetween",
        description: "requires base text to repeat between the minimum and max range specified",
        example: "(?:sample){5, 8}"
    },
    {
        symbol: "+",
        name: "occursOnceOrMore.and.isGreedy",
        description: "Marks base text as occuring once or more, using a greedy search.",
        example: "(?:sample)+"
    },
    {
        symbol: "+?",
        name: "occursOnceOrMore",
        description: "Marks base text as occuring once or more, using a lazy search.",
        example: "(?:sample)+?"
    },
    {
        symbol: "*",
        name: "occursZeroOrMore.and.isGreedy",
        description: "Marks base text as occuring zero or more times, using a greedy search.",
        example: "(?:sample)*"
    },
    {
        symbol: "*?",
        name: "occursZeroOrMore",
        description: "Marks base text as occuring zero or more times, using a lazy search.",
        example: "(?:sample)*?"
    },
    {
        symbol: "(?=...)",
        name: "followedBy",
        description: "requires base text to be followed by specified text",
        example: "sample(?=lorem)"
    },
    {
        symbol: "(?!...)",
        name: "notFollowedBy",
        description: "requires base text to NOT be followed by specified text",
        example: "sample(?!lorem)"
    },
    {
        symbol: "(?<=...)",
        name: "precededBy",
        description: "requires base text to be preceded by specified text",
        example: "(?<=lorem)sample"
    },
    {
        symbol: "(?<!...)",
        name: "notPrecededBy",
        description: "requires base text to NOT be preceded by specified text",
        example: "(?<!lorem)sample"
    },
    {
        symbol: "^",
        name: "atStart",
        description: "marks text as occuring at beginning",
        example: "^(?:sample)"
    },
    {
        symbol: "$",
        name: "atEnd",
        description: "marks text as occuring at end",
        example: "(?:sample)$"
    },
    {
        symbol: "?",
        name: "isOptional",
        description: "marks text as optional",
        example: "(?:sample)?"
    },
    {
        symbol: "(...)",
        name: "isCaptured",
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
        name: "isVariable",
        description: "uses a named capture group to match each \\k<...> to the first instance",
        example: "(?<var>)\\d{2}) and \\k<var>"
    },
];