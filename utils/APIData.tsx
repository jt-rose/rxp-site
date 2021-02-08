import { ReactNode } from 'react'
import { APICodeLink, RegexCodeLink } from '../components/CodeLink'
import { useOpenTabsContext } from '../context/OpenTabsContext'

const OpenTabsAPICodeLink = (props: {
  sectionID: string
  overWrite?: string
}) => {
  const { sectionID, overWrite } = props
  const { addTabs } = useOpenTabsContext()
  return (
    <span onClick={() => addTabs([sectionID])}>
      <APICodeLink sectionID={sectionID} overWrite={overWrite} />
    </span>
  )
}

export interface APIKeyData {
  key: string
  description: ReactNode
  codeSample: string
}

const RXPUnitData: APIKeyData[] = [
  {
    key: 'init',
    description: (
      <div>
        <p>
          Creates a new RXP constructor from string, regex, or other RXP
          constructors passed as arguments. Provides a variety of methods to
          apply regex search conditions before being converted to a standard
          regex with the <OpenTabsAPICodeLink sectionID='construct' /> method.
        </p>
        <p>
          String arguments will automatically be escaped, while regex and RXP
          constructors are accepted as is.
        </p>
      </div>
    ),
    codeSample: `const sample = init("sample")
sample.construct()  
//  result: /sample/

sample.occursBetween(3,5).and.atStart.construct()
//  result: /^(?:(?:sample){3,5})/

init(sample, / for /, "code example").construct("g")
//  result: /sample for code example/g`,
  },
  {
    key: 'text',
    description: (
      <div>
        <p>
          Provides the current string version of the regex that will be
          formatted into a standard regex with the{' '}
          <OpenTabsAPICodeLink sectionID='construct' /> method.
        </p>
        <p>
          The text property is exposed for use in composing RXP constructors,
          but <OpenTabsAPICodeLink sectionID='construct' />
          should be used when actually formatting the regex.
        </p>
      </div>
    ),
    codeSample: `init("escape [ me").text
//  result: "escape \\\\[ me"`,
  },
  {
    key: 'or',
    description: (
      <p>
        Provides an alternative possible match for the initial search text.
        Every unique argument provided will result in an additional alternative
        possible text.
      </p>
    ),
    codeSample: `sample.or('something else').construct() 
//  result: /(?:(?:sample)|(?:something else))/

sample.or("this", "that").construct()
//  result: /(?:(?:sample)|(?:this)|(?:that))/
`,
  },
  {
    key: 'construct',
    description: (
      <p>
        Transforms the RXP constructor into a standard regex, while correctly
        reconstructing{' '}
        <OpenTabsAPICodeLink sectionID='isVariable' overWrite='variables' />.
        Regex flags can be specified as arguments passed to the function.
      </p>
    ),
    codeSample: `sample.construct()
//  result: /sample/

sample.construct("g")
// result: /sample/g

sample.construct("global", "i", "s")
// result: /sample/gis`,
  },
  {
    key: 'and',
    description: (
      <p>Extends an RXP method to apply additional search conditions</p>
    ),
    codeSample: `init("sample").occurs(3).and.atStart.construct() 
//  result: /^(?:(?:sample){3})/`,
  },
]

const step1Data: APIKeyData[] = [
  {
    key: 'occurs',
    description: (
      <p>
        Define how many times the search text should occur, one after the other
      </p>
    ),
    codeSample: `sample.occurs(3).construct() 
//  result: /(?:sample){3}/`,
  },
  {
    key: 'occursOnceOrMore',
    description: (
      <p>
        Marks the search text as occuring one or more times, one after another.
        A lazy search is used by default but can be converted to a greedy search
        with the follow-up{' '}
        <OpenTabsAPICodeLink sectionID='isGreedy' overWrite='.and.isGreedy' />{' '}
        method.
      </p>
    ),
    codeSample: `sample.occursOnceOrMore.construct() 
//  result: /(?:sample)+?/`,
  },
  {
    key: 'occursZeroOrMore',
    description: (
      <p>
        Marks the search text as occuring zero or more times, one after another.
        A lazy search is used by default but can be converted to a greedy search
        with the follow-up{' '}
        <OpenTabsAPICodeLink sectionID='isGreedy' overWrite='.and.isGreedy' />{' '}
        method.
      </p>
    ),
    codeSample: `sample.occursZeroOrMore.construct() 
//  result: /(?:sample)*?/`,
  },
  {
    key: 'occursAtLeast',
    description: (
      <p>
        Define the search text as repeating itself, one after another, a minimal
        number of times
      </p>
    ),
    codeSample: `sample.occursAtLeast(2).construct() 
//  result: /(?:sample){2,}/`,
  },
  {
    key: 'occursBetween',
    description: (
      <p>
        Define the search text as repeating itself, one after another, between a
        minimal and maximal range
      </p>
    ),
    codeSample: `sample.occursBetween( 2, 4).construct() 
//  result: /(?:sample){2,4}/`,
  },
  {
    key: 'isGreedy',
    description: (
      <p>
        Modifies previous search marker to use a greedy search. Can be applied
        after using either the{' '}
        <OpenTabsAPICodeLink sectionID='occursOnceOrMore' /> or{' '}
        <OpenTabsAPICodeLink sectionID='occursZeroOrMore' /> constructor
        methods, or after the <OpenTabsAPICodeLink sectionID='oneOrMore' /> or{' '}
        <OpenTabsAPICodeLink sectionID='zeroOrMore' /> shorthands.
      </p>
    ),
    codeSample: `sample.occursOnceOrMore.and.isGreedy.construct() 
//  result: /(?:sample)+/`,
  },
]

const step2Data: APIKeyData[] = [
  {
    key: 'followedBy',
    description: (
      <p>
        Requires the search text to be followed by the text arguments passed to
        this method
      </p>
    ),
    codeSample: `sample.followedBy("next").construct() 
//  result: /sample(?=next)/`,
  },
  {
    key: 'notFollowedBy',
    description: (
      <p>
        Requires the search text to NOT be followed by the text arguments passed
        to this method
      </p>
    ),
    codeSample: `sample.notFollowedBy("nada").construct() 
//  result: /sample(?!nada)/`,
  },
  {
    key: 'precededBy',
    description: (
      <p>
        Requires the search text to be preceded by the text arguments passed to
        this method
      </p>
    ),
    codeSample: `sample.precededBy("before").construct() 
//  result: /(?<=before)sample/`,
  },
  {
    key: 'notPrecededBy',
    description: (
      <p>
        Requires the search text to NOT be preceded by the text arguments passed
        to this method
      </p>
    ),
    codeSample: `sample.notPrecededBy("nada").construct() 
//  result: /(?<!nada)sample/`,
  },
]

const step3Data: APIKeyData[] = [
  {
    key: 'atStart',
    description: (
      <p>
        Requires search text to occur at the beginning of the string being
        tested
      </p>
    ),
    codeSample: `sample.atStart.construct() 
//  result: /^(?:sample)/`,
  },
  {
    key: 'atEnd',
    description: (
      <p>Requires search text to occur at the end of the string being tested</p>
    ),
    codeSample: `sample.atEnd.construct() 
//  result: /(?:sample)$/`,
  },
]

const step4Data: APIKeyData[] = [
  {
    key: 'isOptional',
    description: (
      <p>
        Marks search text as being optional. The text will not be required for a
        match but will be included when found
      </p>
    ),
    codeSample: `sample.isOptional.construct() 
//  result: /(?:sample)?/`,
  },
  {
    key: 'isCaptured',
    description: (
      <p>
        Marks search text as being individually captured when found. By default,
        RXP uses noncapture groupings, but this method will override that
        behavior
      </p>
    ),
    codeSample: `sample.isCaptured.construct() 
//  result: /(sample)/`,
  },
  {
    key: 'isVariable',
    description: (
      <div>
        <p>
          Marks the search text as a regex variable. This variable can then be
          used multiple times in a new RXP constructor.
        </p>
        <p>
          RXP will parse the variables when the{' '}
          <OpenTabsAPICodeLink sectionID='construct' /> method is called and
          reconfigure them based on the order of usage so that they will work as
          expected.
        </p>
        <p>
          A string argument can be provided to declare the variable name, or no
          argument can be provided and RXP will create a unique name for you.
        </p>
      </div>
    ),
    codeSample: `const RXPVar = init(/\\d{3}/).isVariable("myVariable")
init(RXPVar, " and ", RXPVar).construct() 
//  result: /(?<myVariable>\\d{3}) and \\\\k<myVariable>/
//  the variable will be formatted based on its position in the regex`,
  },
]

// Presets
const presetsData: APIKeyData[] = [
  {
    key: 'anyCharacter',
    description: (
      <p>
        Matches any possible character. Equivalent to the{' '}
        <RegexCodeLink sectionID='any-character' overWrite='.' /> special
        character
      </p>
    ),
    codeSample: `anyCharacter.construct() 
//  result: /./`,
  },
  {
    key: 'anyCharacterExcept',
    description: (
      <p>
        Matches any possible character except the ones passed as arguments to
        the function. Equivalent to negating charcters with the{' '}
        <RegexCodeLink sectionID='any-character-except' overWrite='[^...]' />{' '}
        syntax.
      </p>
    ),
    codeSample: `anyCharacterExcept("T", "x").construct() 
//  result: /[^Tx]/`,
  },
  {
    key: 'anyDigit',
    description: (
      <p>
        Matches any possible single digit. Equivalent to the{' '}
        <RegexCodeLink sectionID='any-digit' overWrite='\d' /> special
        character.
      </p>
    ),
    codeSample: `anyDigit.construct() 
//  result: /[1234567890]/`,
  },
  {
    key: 'anyDigitExcept',
    description: (
      <p>
        Matches any possible single digit except those passed as arguments to
        the function
      </p>
    ),
    codeSample: `anyDigitExcept(3,4,5).construct() 
//  result: /[1267890]/`,
  },
  {
    key: 'anyUpperCase',
    description: (
      <p>Matches any possible uppercase letter. Equivalent to [A-Z]</p>
    ),
    codeSample: `anyUpperCase.construct() 
//  result: /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/`,
  },
  {
    key: 'anyUpperCaseExcept',
    description: (
      <p>
        Matches any possible uppercase letter except those passed as arguments
        to the function
      </p>
    ),
    codeSample: `anyUpperCaseExcept("A", "B", "C").construct() 
//  result: /[DEFGHIJKLMNOPQRSTUVWXYZ]/`,
  },
  {
    key: 'anyLowerCase',
    description: (
      <p>Matches any possible lowercase letter. Equivalent to [a-z].</p>
    ),
    codeSample: `anyLowerCase.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyz]/`,
  },
  {
    key: 'anyLowerCaseExcept',
    description: (
      <p>
        Matches any possible lowercase letter except those passed as arguments
        to the function
      </p>
    ),
    codeSample: `anyLowerCaseExcept("x", "y", "z").construct() 
//  result: /[abcdefghijklmnopqrstuvw]/`,
  },
  {
    key: 'anyLetter',
    description: (
      <p>
        Matches any possible letter, regardless of case. Equivalent to [a-zA-Z].
      </p>
    ),
    codeSample: `anyLetter.construct() 
//  result: /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/`,
  },
  {
    key: 'anyLetterExcept',
    description: (
      <p>
        Matches any possible lowercase or uppercase letter except those passed
        as arguments to the function
      </p>
    ),
    codeSample: `anyLetterExcept("a", "A").construct() 
//  result: [bcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ]`,
  },
]

// Shorthands

const shorthandsData: APIKeyData[] = [
  {
    key: 'either',
    description: (
      <p>
        Accepts two or more arguments that will be searched as alternate
        options. Equivalent to{' '}
        <OpenTabsAPICodeLink sectionID='init' overWrite='init("sample")' />{' '}
        <OpenTabsAPICodeLink sectionID='or' overWrite='.or("other")' />.
      </p>
    ),
    codeSample: `either("north", "south").construct() 
//  result: /(?:(?:north)|(?:south))/

const directions = ["up", "right", "down", "left"]
either(...directions).construct()
//  result: /(?:(?:up)|(?:right)|(?:down)|(?:left))/`,
  },
  {
    key: 'optional',
    description: (
      <p>
        Marks text as optional. Equivalent to{' '}
        <OpenTabsAPICodeLink sectionID='init' overWrite='init("sample")' />{' '}
        <OpenTabsAPICodeLink sectionID='isOptional' overWrite='.isOptional' />.
      </p>
    ),
    codeSample: `optional("maybe").construct() 
//  result: /(?:maybe)?/`,
  },
  {
    key: 'oneOrMore',
    description: (
      <p>
        Marks search text as occuring once or more. Equivalent to{' '}
        <OpenTabsAPICodeLink sectionID='init' overWrite='init("sample")' />{' '}
        <OpenTabsAPICodeLink
          sectionID='occursOnceOrMore'
          overWrite='.occursOnceOrMore'
        />
        .
      </p>
    ),
    codeSample: `oneOrMore("sample").construct() 
//  result: /(?:sample)+?/`,
  },
  {
    key: 'zeroOrMore',
    description: (
      <p>
        Marks search text as occuring zero or more times. Equivalent to{' '}
        <OpenTabsAPICodeLink sectionID='init' overWrite='init("sample")' />{' '}
        <OpenTabsAPICodeLink
          sectionID='occursZeroOrMore'
          overWrite='.occursZeroOrMore'
        />
        .
      </p>
    ),
    codeSample: `zeroOrMore("sample").construct() 
//  result: /(?:sample)*?/`,
  },
  {
    key: 'wrapRXP',
    description: (
      <p>
        Creates a new <APICodeLink sectionID='init' />
        -style function that will wrap any arguments provided to it in the
        arguments passed to wrapRXP
      </p>
    ),
    codeSample: `const withBrackets = wrapRXP("[", "]")
withBrackets("sample").construct() 
//  result: /\\[sample\\]/`,
  },
  {
    key: 'withBoundaries',
    description: (
      <p>
        Provides an <OpenTabsAPICodeLink sectionID='init' />
        -style function that automatically surrounds the search text with{' '}
        <RegexCodeLink sectionID='word-boundary' overWrite='\b' /> boundary
        markers
      </p>
    ),
    codeSample: `withBoundaries("sample").construct() 
// result: /\\bsample\\b/`,
  },
]

export const APIData = {
  RXPUnitData,
  step1Data,
  step2Data,
  step3Data,
  step4Data,
  presetsData,
  shorthandsData,
}
