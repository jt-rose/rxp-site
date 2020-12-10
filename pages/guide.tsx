import Layout from "../components/Layout";
import Link from "next/link";
import React, { ReactNode } from "react";

import { CodeSample } from "../components/CodeSample";
import { APICodeLink, RegexCodeLink } from "../components/CodeLink";

const GuideSection = (props: {children: ReactNode}) => (
  <div className="guide-section">
    {props.children}
  </div>
);

interface TableOfContentsData {
  title: string;
  hrefID: string;
}
const guideSectionLinks: TableOfContentsData[] = [
  {
    title: "Import",
    hrefID: "import-guide"
  },
  {
    title: "Init Constructor",
    hrefID: "init-guide"
  },
  {
    title: "Modify Search Conditions",
    hrefID: "modify-text-guide"
  },
  {
    title: "Convert to Regex",
    hrefID: "construct-guide"
  },
  {
    title: "Presets",
    hrefID: "presets-guide"
  },
  {
    title: "Shorthands",
    hrefID: "shorthands-guide"
  },
  {
    title: "Error Handling",
    hrefID: "error-handling-guide"
  }
]

const TableOfContents = () => (
  <div>
    <ul>
    {guideSectionLinks.map(section => (
      <li>
        <Link href={`/guide#${section.hrefID}`}>
          <a>{section.title}</a>
        </Link>
      </li>
    ))}
    </ul>
    <style jsx>{`
    div {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5em;
    }
    ul {
      margin: 0;
      padding: 1em 2em;
      border-top: 2px solid gray;
      border-bottom: 2px solid gray;
    }
      li {
        list-style-type: square;
      }
      a {
        text-decoration: none;
      }
      a:visited {
        color: black;
      }
      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
);

const ImportGuide = () => (
  <GuideSection>
    <h2 
      className="section-title sticky-header-adjust nunito-font" 
      id="import-guide">
        Import the Library
    </h2>
    <p>RXP can be installed directly through NPM / Yarn:</p>
    <CodeSample sample={`npm i rxp
yarn add rxp`} />
    <p>Once installed, the RXP object can be imported, which contains every aspect of the library</p>
    <CodeSample sample={`import { RXP } from "rxp"
const { init, optional, either } = RXP`} />
<p>If you want to install specific functions directly, you can specify them in the import:</p>
<CodeSample sample={`import { init, optional, either } from "rxp"`} />
<p>Alternatively, you can bypass importing the library altogether and just use the live code editor on the <Link href="/playground"><a className="link-styling">playground</a></Link> page to construct a regex and then copy it directly into your application</p>
  </GuideSection>
)

const InitGuide = () => (
  <GuideSection>
  <h2 
    className="section-title sticky-header-adjust nunito-font" 
    id="init-guide"
    >
      Initialize the Constructor
    </h2>
    <p>The RXP <APICodeLink sectionID="init" /> function works by accepting text to search for, creating an object 
      with methods to modify the search conditions, and then converts it to a 
      standard regex through the <APICodeLink sectionID="construct" /> command.</p>

      <CodeSample sample={`init("sample").construct() // 	/sample/
init("sample").atStart.construct() // 	/^(?:sample)/
init("sample").occurs(5).and.atStart.construct("g") //  /^(?:(?:sample){5})/g`} />
      <p>
      The <APICodeLink sectionID="init" /> function combines any number of arguments into a text to search for. 
      String, regex, and even other RXP constructors can be provided to <APICodeLink sectionID="init" />. String arguments will automatically be escaped, so you can enter the 
      text exactly as you expect to see it:
      </p>
      <CodeSample sample={`init("search", " for ", "me").construct() // /search for me/

init("() and []").construct() // /\\(\\) and \\[\\]/

const sample = init("sample")
init("test ", /out /, sample).construct() // /test out sample/`} />
      <p>
        Once the search text has been specified with <APICodeLink sectionID="init" />,
        alternative text can be specified with <APICodeLink sectionID="or" />. 
        Any RXP methods used after <APICodeLink sectionID="or" /> will then be applied to both options:
      </p>
      <CodeSample sample={`const thisOrThat = init("this").or("that")
thisOrThat.construct()
//  result: /(?:this)|(?:that)/

thisOrThat.occurs(5).construct()
//  result: /(?:(?:this)|(?:that)){5}/`} />
      <p>
      Using this pattern, regex built through RXP become modular and composable, 
      making it easy to reuse or extend them:
      </p>
      <CodeSample sample={`const name = init("Jeff")
const namePattern = init(name.atStart, "some stuff", name.isOptional);
const patternsAndPatternsOhMy = init(
    namePattern, 
    namePattern, 
    namePattern.occurs(999)
  ).construct()`} />
      </GuideSection>
);

const ModifyTextGuide = () => (
  <GuideSection>
    <h2 className="section-title sticky-header-adjust nunito-font" id="modify-text-guide">Modify Search Conditions</h2>
      <p>
      After creating the RXP constructor object, 
      the provided text can be modified with regex search conditions:
      </p>
      <CodeSample sample={`sample.occurs(2).construct() // /(?:sample){2}/ 
sample.precededBy("ID: ").construct() // /(?<=ID: )sample/
sample.atStart.construct() // /^(?:sample)/ 
sample.isOptional.construct() // /(?:sample)?/`} />
      <p>
      There are a large number of modifiers available to give full 
      coverage to regex search conditions. You can review these individually 
      on the <Link href="/api-guide#rxp-method"><a className="link-styling">API page</a></Link>.
      </p>
      <p>
      By default, groups are noncapturing and searches are lazy, 
      but both settings can be overridden:
      </p>
      <CodeSample sample={`sample.isCaptured.construct() // /(sample)/ 
sample.occursOnceOrMore.construct() // /(?:sample)+?/ 
sample.occursOnceOrMore.and.isGreedy.construct() // /(?:sample)+/`} />
      <p>
      Regex variables can be defined with the <APICodeLink sectionID="isVariable" /> method and 
      then passed to other RXP constructors through <APICodeLink sectionID="init" /> as often as needed. 
      When using the <APICodeLink sectionID="construct" /> method, the variables will be rewritten in 
      order of appearance to work as expected. Here is an example using the 
      preset <APICodeLink sectionID="anyDigit" /> (covered below):
      </p>
      <CodeSample sample={`const regexVar = anyDigit.occurs(3).and.isVariable("var")
init(regexVar, " with ", regexVar).construct() // /(?<var>d{3}) with //k<var>/`}/>
      </GuideSection>
);

const ConstructGuide = () => (
  <GuideSection>
    <h2 className="section-title sticky-header-adjust nunito-font" id="construct-guide">Convert to Regex</h2>
      <p>
      The <APICodeLink sectionID="construct" /> function can be passed arguments to define the search flags:
      </p>
      <CodeSample sample={`sample.construct("g") // /sample/g 
sample.construct("global", "s", "I") // /sample/gsi`} />
      <p>
      If <APICodeLink sectionID="init" /> is passed a regex argument including a flag, the flag will 
      be stripped from it and would need to be added back with <APICodeLink sectionID="construct" />:
      </p>
      <CodeSample sample={`init(/search/g, " for me").construct() // /search for me/`} />
  </GuideSection>
);

const PresetsGuide = () => (
  <GuideSection>
    <h2 className="section-title sticky-header-adjust nunito-font" id="presets-guide">Presets</h2>
      <p>
      To use special characters, such as <RegexCodeLink sectionID="any-digit" overWrite="\d"/> to match a digit or <RegexCodeLink sectionID="any-letter" overWrite="\w"/> to 
      match a letter, you can use the <APICodeLink sectionID="presets" /> provided with RXP, such 
      as <APICodeLink sectionID="anyDigit" /> or <APICodeLink sectionID="anyLetter" />. These are preloaded RXP constructor 
      objects with all the functionality built in:
      </p>
      <CodeSample sample={`anyDigit.occurs(3).construct() // /(?:[0123456789]){3}/ 
anyLetter.atEnd.construct() // /(?:\\w)$/`} />
      <p>
      Since the <APICodeLink sectionID="init" /> function will automatically escape special 
      characters, if you want to pass them in directly without using 
      presets then you would need to use a standard regex:
      </p>
      <CodeSample sample={`// incorrect:
init("\\d").construct() // result: /\\\\d/

// correct:
init(/\\d/).construct() // result: /\\d/`} />
      <p>
      A full list of presets can be found on the <Link href="/api-guide#presets"><a className="link-styling">API page</a></Link>
      </p>
  </GuideSection>
);

const ShorthandsGuide = () => (
  <GuideSection>
    <h2 className="section-title sticky-header-adjust nunito-font" id="shorthands-guide">Shorthands</h2>
      <p>
      <APICodeLink sectionID="shorthands" /> are a group of functions that create an RXP object and 
      immediately apply a desired search condition. These are provided 
      to improve readability, and there is no functional difference 
      between something like <APICodeLink sectionID="optional" overWrite='optional("text")'/> and <APICodeLink sectionID="isOptional" overWrite='init("text").isOptional'/>.
      </p>
      <CodeSample sample={`init(
    optional("("), 
    "text", 
    optional(")")
  .construct() // /(?:\()?text(?:\))?/`} />
      <p>
      A variety of shorthands are available and can be found on the <Link href="/api-guide#shorthands"><a className="link-styling">API page</a></Link>. 
      All of these produce the standard RXP constructor object with the unique 
      exceptions of <APICodeLink sectionID="withBoundaries" /> and <APICodeLink sectionID="wrapRXP" />.
      </p>
  </GuideSection>
);

const ErrorHandlingGuide = () => (
  <GuideSection>
    <h2 className="section-title sticky-header-adjust nunito-font" id="error-handling-guide">Error Handling</h2>
    <p>RXP has been designed with a degree of error handling built in. 
      When combining two search conditions with <APICodeLink sectionID="and" /> would result in an invalid regex, the constructor
      will not make the subsequent option available, allowing only valid combinations.
    </p>
    <p>This is designed to be intuitive for the user thanks to intellisense, 
    and is not something you should have to think about. The options presented will 
    naturally guide you into creating valid regex.
  </p>
    <p>
    The actual search conditions are structured into levels, with each one locking out previous levels:
    </p>
    <ol>
      <li><APICodeLink sectionID="occurs" />, <APICodeLink sectionID="occursAtLeast" />, etc.  </li>
      <li><APICodeLink sectionID="followedBy" />, <APICodeLink sectionID="notFollowedBy" />, etc.</li>
      <li><APICodeLink sectionID="atStart" />, <APICodeLink sectionID="atEnd" /></li>
      <li><APICodeLink sectionID="isOptional" />, <APICodeLink sectionID="isCaptured" />, <APICodeLink sectionID="isVariable" /></li>
    </ol>
    <p>
    By applying this structure, it is not possible to follow a method like <APICodeLink sectionID="atStart" /> with options such as <APICodeLink sectionID="occurs" /> 
    and <APICodeLink sectionID="precededBy" />, both of which would result in 
    invalid regex:
    </p>
    <CodeSample sample={`/^(?:(?<=this )won't work)/
/(^nor will this){5}/`}/>
    <p>
      There is one important caveat here - when using regex or RXP constructors as arguments in <APICodeLink sectionID="init" /> or related functions,
     the resulting RXP constructor will provide all of the possible options initially,
     so it is still possible to write invalid regex:</p>
     <CodeSample sample={`const example = init("text").precededBy("stuff")
example.atEnd // works
example.atStart // X - unavailable

init(example).atStart // invalid regex, but due to RXP composition
// the constructor will still allow this`} />
<p> RXP does a lot to deter mistakes, but it is not fullproof and regex should still be built in a careful manner
    </p>
    </GuideSection>
);

const GuidePage = () => (
  <Layout title="Guide" pageTitle="RXP Guide" sizing="narrow">
    <TableOfContents />
    <ImportGuide />
    <InitGuide />
    <ModifyTextGuide />
    <ConstructGuide />
    <PresetsGuide />
    <ShorthandsGuide />
    <ErrorHandlingGuide />
  </Layout>
);

export default GuidePage;
