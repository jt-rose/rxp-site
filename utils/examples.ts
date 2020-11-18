interface ExampleRXP {
    title: string;
    target: string;
    sample: string;
};

export const RXPexamples: ExampleRXP[] = [
    {
        title: "Matching a specific email pattern",
        target: "JRose@support.company.net",
        sample: `// original regex:
const emailMatch = 
    /[A-Z]{2}[a-z]+@(?:support\\.)?company\\.net/;
        
// RXP version:
const emailMatch = init(
    anyUpperCase.occurs(2),
    anyLowerCase.occursOnceOrMore,
    "@",
    optional("support."),
    "company.net"
  ).construct();`
    },
    {
        title: "Matching someone with a specific family name",
        target: "Jeff Rose",
        sample: `// original regex:
const nameMatch = 
    /\\w+?\\s[rR]ose/;
        
// RXP version:
const nameMatch = init(
    anyLetter.occursOnceOrMore,
    " ",
    upperOrLowerCase("r"), // either("r", "R") is equivalent
    "ose"
  ).construct();`
    },
    {
        title: "Matching a US zip code after the state abbreviation",
        target: "VA, 12345-6789",
        sample: `// original regex:
const zipCodeMatch = 
    /(?<=\\w{2},\\s)\\d{5}(?:(?:(?:-|\\s)\\d{4})|(?:\\d{4}))?/;
        
// RXP version:
const stateAbbreviation = init(anyUpperCase.occurs(2), ", ");
const zipCode = anyDigit.occurs(5);
const extendedZipCode = anyDigit.occurs(4);
const extendedZipWithSpace = init(either("-", " "), extendedZipCode);
        
const zipCodeMatch = init(
    zipCode,
    either(extendedZipCode, extendedZipWithSpace).isOptional
  )
  .precededBy(stateAbbreviation)
  .construct();`
    },
    {
        title: "Matching a phone number with extension",
        target: "(123) 456-7899 ext.: 9999",
        sample: `// original regex:
const phoneMatch = 
    /\\(?\\d{3}\\)?(?:-|\\s)?\\d{3}(?:-|\\s)?\\d{4}(?:\\s[eE]xt.:\\s\\d{2,4})?/g;
        
// RXP version:
const areaCode = init(
    optional("("),
    anyDigit.occurs(3),
    optional(")"),
    either("-", " ").isOptional // optional(either("-", " ")) also works
  );
        
const firstThreeDigits = areaCode;
const lastFourDigits = anyDigit.occurs(4);
const extension = optional(
    " ",
    upperOrLowerCase("e"),
    "xt.: ",
    anyDigit.occursBetween(2, 4)
  );
        
const phoneMatch = init(
    areaCode,
    firstThreeDigits,
    lastFourDigits,
    extension
  ).construct("g");`
    }
];

