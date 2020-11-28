import { ReactNode } from "react";
import { APICodeLink, RegexCodeLink } from "../components/CodeLink";

export interface APIKeyData {
  key: string;
  description: ReactNode;
  codeSample: string;
}

const RXPUnitData: APIKeyData[] = [
  {
    key: "init",
    description:
      <div>
        <p>
        Creates a new RXP constructor from string, regex, 
        or other RXP constructors passed as arguments. Provides a 
        variety of methods to apply regex behavior before being 
        converted to a standard regex with the 
        <APICodeLink sectionID="construct" /> method.
        </p>
        <p>String arguments will automatically be escaped, while 
          regex and RXP constructors are accepted as is.
        </p>
      </div>,
    codeSample: `const sample = init("sample");
sample.construct()  
//  result: /sample/

sample.occursBetween(3,5).and.atStart.construct()
//  result: /^(?:(?:sample){3,5})/

init(sample, / for /, "code example").construct("g")
//  result: /sample for code example/g`
  },
  {
    key: "text",
    description:
    <div>
      <p>
        Provides the current string version of the regex 
        that will be formatted into a standard regex with 
        the <APICodeLink sectionID="construct" /> method.
      </p>
      <p>
        The text property is exposed for use in composing 
        RXP constructors, but <APICodeLink sectionID="construct" />
         should be used when actually formatting the regex. 
      </p>
    </div>
      ,
    codeSample: `init("escape [ me").text
//  result: "escape \\\\[ me"`
  },
  {
    key: "construct",
    description:
      <p>Transforms the RXP constructor into a standard regex, 
        while correctly reconstructing 
        <APICodeLink sectionID="isVariable" overWrite="variables"/>. 
        Regex flags can be specified as arguments passed to the function.
      </p>,
    codeSample: `sample.construct()
//  result: /sample/

sample.construct("g")
// result: /sample/g

sample.construct("global", "i", "s")
// result: /sample/gis`
  },
  {
    key: "and",
    description:
      <p>Extends an RXP behavior method to apply additional behaviors</p>,
    codeSample: `init("sample").occurs(3).and.atStart.construct() 
//  result: /^(?:(?:sample){3})/`
  },
];

const step1Data: APIKeyData[] = [
  {
    key: "or",
    description:
      <p>Provides an alternative possible match for the initial search text. Every unique argument provided will result in an additional alternative possible text.</p>,
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
      <p>Define how many times the search text should occur, one after the other</p>,
    codeSample: `sample.occurs(3).construct() 
//  result: /(?:sample){3}/`
  },
  {
    key: "occursOnceOrMore",
    description:
      <p>Marks the search text as occuring one or more times, one after another. A lazy search is used by default but can be converted to a greedy search with the follow-up <APICodeLink sectionID="isGreedy" overWrite=".and.isGreedy"/> method.</p>,
    codeSample: `sample.occursOnceOrMore.construct() 
//  result: /(?:sample)+?/`
  },
  {
    key: "occursZeroOrMore",
    description:
      <p>Marks the search text as occuring zero or more times, one after another. A lazy search is used by default but can be converted to a greedy search with the follow-up <APICodeLink sectionID="isGreedy" overWrite=".and.isGreedy"/> method.</p>,
    codeSample: `sample.occursZeroOrMore.construct() 
//  result: /(?:sample)*?/`
  },
  {
    key: "occursAtLeast",
    description:
      <p>Define the search text as repeating itself, one after another, a minimal number of times</p>,
    codeSample: `sample.occursAtLeast(2).construct() 
//  result: /(?:sample){2,}/`
  },
  {
    key: "occursBetween",
    description:
      <p>Define the search text as repeating itself, one after another, between a minimal and maximal range</p>,
    codeSample: `sample.occursBetween( 2, 4).construct() 
//  result: /(?:sample){2,4}/`
  },
];

const step2point5data: APIKeyData[] = [
  {
    key: "isGreedy",
    description:
      <p>Modifies previous search marker to use a greedy search. Can be applied after using either the <APICodeLink sectionID="occursOnceOrMore" /> or <APICodeLink sectionID="occursZeroOrMore" /> constructor methods, or after the <APICodeLink sectionID="oneOrMore" /> or <APICodeLink sectionID="zeroOrMore" /> shorthands.</p>,
    codeSample: `sample.occursOnceOrMore.and.isGreedy.construct() 
//  result: /(?:sample)+/`
  },
];

const step3Data: APIKeyData[] = [
  {
    key: "followedBy",
    description:
      <p>Requires the search text to be followed by the text arguments passed to this method</p>,
    codeSample: `sample.followedBy("next").construct() 
//  result: /sample(?=next)/`
  },
  {
    key: "notFollowedBy",
    description:
      <p>Requires the search text to NOT be followed by the text arguments passed to this method</p>,
    codeSample: `sample.notFollowedBy("nada").construct() 
//  result: /sample(?!nada)/`
  },
  {
    key: "precededBy",
    description:
      <p>Requires the search text to be preceded by the text arguments passed to this method</p>,
    codeSample: `sample.precededBy("before").construct() 
//  result: /(?<=before)sample/`
  },
  {
    key: "notPrecededBy",
    description:
      <p>Requires the search text to NOT be preceded by the text arguments passed to this method</p>,
    codeSample: `sample.notPrecededBy("nada").construct() 
//  result: /(?<!nada)sample/`
  },
];

const step4Data: APIKeyData[] = [
  {
    key: "atStart",
    description:
      <p>Requires search text to occur at the beginning of the string being tested</p>,
    codeSample: `sample.atStart.construct() 
//  result: /^(?:sample)/`
  },
  {
    key: "atEnd",
    description: <p>Requires search text to occur at the end of the string being tested</p>,
    codeSample: `sample.atEnd.construct() 
//  result: /(?:sample)$/`
  },
];

const step5Data: APIKeyData[] = [
  {
    key: "isOptional",
    description:
      <p>Marks search text as being optional. The text will not be required for a match but will be included when found</p>,
    codeSample: `sample.isOptional.construct() 
//  result: /(?:sample)?/`
  },
  {
    key: "isCaptured",
    description:
      <p>Marks search text as being individually captured when found. By default, RXP uses noncapture groupings, but this method will override that behavior</p>,
    codeSample: `sample.isCaptured.construct() 
//  result: /((?:sample))/`
  },
  {////////////////////
    key: "isVariable",
    description:
      <p>Marks the search text as a regex variable. 
        This variable can then be reused in the RXP constructor 
        to make sure both instances correspond. RXP will parse the 
        variables when the <APICodeLink sectionID="construct" /> method 
        is called and reconfigure them based on the order of usage so 
        they will work as expected. By abstracting this process away, 
        you can just declare the variable, insert it wherever you need, 
        and not have to worry about using the appropriate syntax. 
        A string argument can be provided to declare the variable name, 
        or no argument can be provided and RXP will create a unique name 
        for you</p>,
    codeSample: `const RXPVar = sample.isVariable("myVariable")
init(RXPVar, " and ", RXPVar).construct() 
//  result: /(?<myVariable>sample) and \\\\k<myVariable>/
//  the variable will be formatted based on its position in the regex`
  },
];

// Presets
const presetsData: APIKeyData[] = [
  {
    key: "anyCharacter",
    description:
      <p>Matches any possible character. Equivalent to the <RegexCodeLink sectionID="any-character" overWrite="." /> special character</p>,
    codeSample: `anyCharacter.construct() 
//  result: /./`
  },
  {
    key: "anyCharacterExcept",
    description:
      <p>Matches any possible character except the ones passed as arguments to the function. Equivalent to negating charcters with the <RegexCodeLink sectionID="any-character-except" overWrite="[^...]"/> syntax.</p>,
    codeSample: `anyCharacterExcept("T", "x").construct() 
//  result: /[^Tx]/`
  },
  {
    key: "anyDigit",
    description:
      <p>Matches any possible single digit. Equivalent to the <RegexCodeLink sectionID="any-digit" overWrite="\d" /> special character.</p>,
    codeSample: `anyDigit.construct() 
//  result: /[1234567890]/`
  },
  {
    key: "anyDigitExcept",
    description:
      <p>Matches any possible single digit except those passed as arguments to the function</p>,
    codeSample: `anyDigitExcept(3,4,5).construct() 
//  result: /[1267890]/`
  },
  {
    key: "anyUpperCase",
    description: <p>Matches any possible uppercase letter. Equivalent to [A-Z]</p>,
    codeSample: `anyUpperCase.construct() 
//  result: /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyUpperCaseExcept",
    description:
      <p>Matches any possible uppercase letter except those passed as arguments to the function</p>,
    codeSample: `anyUpperCaseExcept("A", "B", "C").construct() 
//  result: /[DEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLowerCase",
    description: <p>Matches any possible lowercase letter. Equivalent to [a-z].</p>,
    codeSample: `anyLowerCase.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyz]/`
  },
  {
    key: "anyLowerCaseExcept",
    description:
      <p>Matches any possible lowercase letter except those passed as arguments to the function</p>,
    codeSample: `anyLowerCaseExcept("x", "y", "z").construct() 
//  result: /[abcdefghijklmnopqrstuvw]/`
  },
  {
    key: "anyLetter",
    description:
      <p>Matches any possible letter, regardless of case. Equivalent to [a-zA-Z].</p>,
    codeSample: `anyLetter.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/`
  },
  {
    key: "anyLetterExcept",
    description:
      <p>Matches any possible lowercase or uppercase letter except those passed as arguments to the function</p>,
    codeSample: `anyLetterExcept("a", "A").construct() 
//  result: [bcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ]`
  },
];

// Shorthands

const shorthandsData: APIKeyData[] = [
  {
    key: "either",
    description:
      <p>Accepts two or more arguments that will be searched as alternate options. Equivalent to <APICodeLink sectionID="or" overWrite="init('north').or('south')"/>.</p>,
    codeSample: `either("north", "south").construct() 
//  result: /(?:(?:north)|(?:south))/

const directions = ["up", "right", "down", "left"]
either(...directions).construct()
//  result: /(?:(?:up)|(?:right)|(?:down)|(?:left))/`
  },
  {
    key: "optional",
    description:
      <p>Marks text as optional. Equivalent to <APICodeLink sectionID="isOptional" overWrite="init('maybe').isOptional" />.</p>,
    codeSample: `optional("maybe").construct() 
//  result: /(?:maybe)?/`
  },
  {
    key: "oneOrMore",
    description:
      <p>Marks search text as occuring once or more. Equivalent to <APICodeLink sectionID="occursOnceOrMore" overWrite="init('sample').occursOnceOrMore"/>.</p>,
    codeSample: `oneOrMore("sample").construct() 
//  result: /(?:sample)+?/`
  },
  {
    key: "zeroOrMore",
    description:
      <p>Marks search text as occuring zero or more times. Equivalent to <APICodeLink sectionID="occursZeroOrMore" overWrite="init('sample').occursZeroOrMore" />.</p>,
    codeSample: `zeroOrMore("sample").construct() 
//  result: /(?:sample)*?/`
  },
  {
    key: "wrapRXP",
    description:
      <p>Creates a new <APICodeLink sectionID="init" />-style function that will wrap any arguments provided to it in the arguments passed to wrapRXP</p>,
    codeSample: `const wrapBrackets = wrapRXP("[", "]")
wrapBrackets("sample").construct() 
//  result: /\\[sample\\]/`
  },
  {//////////////// note about uniqie constructor
    key: "withBoundaries",
    description:
      <p>Marks the arguments provided as being surrounded by <RegexCodeLink sectionID="word-boundary" overWrite="\b"/> boundary markers</p>,
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
