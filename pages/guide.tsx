import Layout from "../components/Layout";
import Link from "next/link";
import React, { ReactNode } from "react";

import { CodeSample } from "../components/CodeSample";
import theme from "../styles/theme";

const APICodeLink = (props: { APIKey: string, overWrite?: string }) => (
<Link href={`/api-guide#${props.APIKey}`}>
  <a className="code-in-text">
  <style jsx>{`
  .code-in-text {
    color: #353535;
    background-color: #f5f2f0;
    border-radius: 3px;
    padding: .2em .5em 0;
    text-decoration: none;
  }
  `}</style>
    <code>{props.overWrite ? props.overWrite : props.APIKey}</code>
  </a>
</Link>
)

type Props = {
  children?: ReactNode;
};

const GuideSection = ({children}: Props) => (
  <div className="guide-section">
    {children}
    <style jsx>{`
      .guide-section {
        display: flex;
        flex-direction: column;
        padding: 1em 1em 1em 0;
      }
      .guide-section > :global(.section-title) {
        text-align: center;
        margin: 0;
      }
      .guide-section > :global(p .code-in-text) {
        color: #353535;
        background-color: #f5f2f0;
        border-radius: 3px;
        padding: .2em .5em 0;
        text-decoration: none;
      }
    `}
    </style>
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
    title: "Modify Search Behavior",
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
  <ul>
    {guideSectionLinks.map(section => (
      <li>
        <Link href={`/guide#${section.hrefID}`}>
          <a>{section.title}</a>
        </Link>
      </li>
    ))}
    <style jsx>{`
      ul {
        list-style-type: none;
        color: ${theme.colors.background};
      }
    `}</style>
  </ul>
)

const ImportGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="import-guide">Import the Library</h2>
    <p>RXP can be installed directly through NPM / Yarn:</p>
    <CodeSample sample={`npm i rxp
yarn add rxp`} />
    <p>Once installed, the RXP object can be imported, which contains every aspect of the library</p>
    <CodeSample sample={`import { RXP } from "rxp"
const { init, optional, either } = RXP;`} />
<p>If you want to install specific functions directly, you can specify them in the import:</p>
<CodeSample sample={`import { init, optional, either } from "rxp"`} />
<p>Alternatively, you can bypass importing the library altogether and just use the live code editor on the <Link href="/playground"><a>playground</a></Link> page to construct a regex and then copy it directly into your application</p>
  </GuideSection>
)

const InitGuide = () => (
  <GuideSection>
  <h2 className="section-title" id="init-guide">Initialize the Constructor</h2>
    <p>The RXP <APICodeLink APIKey="init" /> function works by accepting text to search for, creating an object 
      that provides methods to modify the search behavior, and then converts it to a 
      standard regex through the <APICodeLink APIKey="construct" /> command.</p>

      <CodeSample sample={`init("sample").construct() // 	/sample/
init("sample").atStart.construct() // 	/^(?:sample)/`} />
      <p>
      The <APICodeLink APIKey="init" /> function combines any number of arguments into a text to search for:
      </p>
      <CodeSample sample={`init("search", " for ", "me").construct() // /search for me/`} />
    
      <p>
      String arguments will automatically be escaped, so you can enter the 
      text exactly as you expect to see it:
      </p>
      <CodeSample sample={`init("() and []").construct() // /\\(\\) and \\[\\]/`} />
      <p>
      <APICodeLink APIKey="init" /> can also accept regex or other RXP constructor objects for 
      maximum flexibility without further escaping them:
      </p>
      <CodeSample sample={`const sample = init("sample");
init("test ", /out /, sample).construct() // /test out sample/`} />
      <p>
      Using this pattern, regex built through RXP become modular and composable, 
      making it easy to reuse or extend them:
      </p>
      <CodeSample sample={`const name = init("Jeff");
const namePattern = init(name.atStart, "some stuff", name.isOptional);
const patternsAndPatternsOhMy = init(
    namePattern, 
    namePattern, 
    namePattern.occurs(999)
  ).construct();`} />
      </GuideSection>
);

const ModifyTextGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="modify-text-guide">Modify Regex Behavior</h2>
      <p>
      After creating the RXP constructor object, 
      the provided text can be modified with regex behavior:
      </p>
      <CodeSample sample={`sample.occurs(2).construct() // /(?:sample){2}/ 
sample.or("other").construct() // /(?:sample)|(?:other)/ 
sample.precededBy("ID: ").construct() // /(?<=ID: )sample/
sample.atStart.construct() // /^(?:sample)/ 
sample.isOptional.construct() // /(?:sample)?/`} />
      <p>
      There are a large number of modifiers available to give full 
      coverage to regex behavior. You can review these individually 
      on the <Link href="/api-guide#rxp-method"><a>API page</a></Link>.
      </p>
      <p>
      By default, groups are noncapturing and searches are lazy, 
      but both behaviors can be overridden:
      </p>
      <CodeSample sample={`sample.isCaptured.construct() // /(sample)/ 
sample.occursOnceOrMore.construct() // /(?:sample)+?/ 
sample.occursOnceOrMore.and.isGreedy.construct() // /(?:sample)+/`} />
      <p>
      Regex variables can be defined with the <APICodeLink APIKey="isVariable" /> method and 
      then passed to other RXP constructors through <APICodeLink APIKey="init" /> as often as needed. 
      When using the <APICodeLink APIKey="construct" /> method, the variables will be rewritten in 
      order of appearance to work as expected. Here is an example using the 
      preset <APICodeLink APIKey="anyDigit" /> (covered below):
      </p>
      <CodeSample sample={`const regexVar = anyDigit.occurs(3).and.isVariable("var");
init(regexVar, " with ", regexVar).construct() // /(?<var>d{3}) with //k<var>/`}/>
      </GuideSection>
);

const ConstructGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="construct-guide">Convert to Regex</h2>
      <p>
      The <APICodeLink APIKey="construct" /> function can be passed arguments to define the search flags:
      </p>
      <CodeSample sample={`sample.construct("g") // /sample/g 
sample.construct("global", "s", "I") // /sample/gsi`} />
      <p>
      If <APICodeLink APIKey="init" /> is passed a regex argument including a flag, the flag will 
      be stripped from it and would need to be added back with construct:
      </p>
      <CodeSample sample={`init(/search/g, " for me").construct() // /search for me/`} />
  </GuideSection>
);

const PresetsGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="presets-guide">Presets</h2>
      <p>
      To use special characters, such as <Link href="/regex-guide#any-digit"><a className="code-in-text"><code>\d</code></a></Link> to match a digit or <Link href="/regex-guide#any-letter"><a className="code-in-text"><code>\w</code></a></Link> to 
      match a letter, you can use the <APICodeLink APIKey="presets" /> provided with RXP, such 
      as <APICodeLink APIKey="anyDigit" /> or <APICodeLink APIKey="anyLetter" />. These are preloaded RXP constructor 
      objects with all the functionality built in:
      </p>
      <CodeSample sample={`anyDigit.occurs(3).construct() // /(?:[0123456789]){3}/ 
anyLetter.atEnd.construct() // /(?:\\w)$/`} />
      <p>
      Since the <APICodeLink APIKey="init" /> function will automatically escape special 
      characters, if you want to pass them in directly without using 
      presets then you would need to use a standard regex:
      </p>
      <CodeSample sample={`// incorrect:
init("\\d").construct // result: /\\\\d/

// correct:
init(/\\d/).construct() // result: /\\d/`} />
      <p>
      A full list of presets can be found on the <Link href="/api-guide#presets"><a>API page</a></Link>.
      </p>
  </GuideSection>
);

const ShorthandsGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="shorthands-guide">Shorthands</h2>
      <p>
      <APICodeLink APIKey="shorthands" /> are a group of functions that create an RXP object and 
      immediately apply a desired search behavior. These are provided 
      to improve readability, and there is no functional difference 
      between something like <APICodeLink APIKey="optional" overWrite='optional("text")'/> and 
      <APICodeLink APIKey="isOptional" overWrite='init("text").isOptional'/>.
      </p>
      <CodeSample sample={`init(
    optional("("), 
    "text", 
    optional(")")
  .construct() // /(?:\()?text(?:\))?/`} />
      <p>
      A variety of shorthands are available and can be found on the <Link href="/api-guide#shorthands"><a>API page</a></Link>. 
      All of these produce the standard RXP constructor object with the unique 
      exceptions of <APICodeLink APIKey="withBoundaries" /> and <APICodeLink APIKey="wrapRXP" />.
      </p>
  </GuideSection>
);

const ErrorHandlingGuide = () => (
  <GuideSection>
    <h2 className="section-title" id="error-handling-guide">Error Handling</h2>
    <p>RXP has been designed with a degree of error handling built in</p>
    <p>When combining two behaviors with 'and' would result in an invalid regex, the constructor
      will not make the second option available, allowing only valid behavior combinations
    </p>
    <p>The following invalid regex cannot be created through the RXP behavior methods:</p>
    <CodeSample sample={`/^(?:(?<=this )won't work)/
/(^nor will this){5}/`}/>
    <p>The actual behavior options are structured into levels:</p>
    <ol>
        <li>or</li>
        <li>occurs, occursAtLeast, etc.  </li>
        <li>followedBy, notFollowedBy, etc.</li>
        <li>atStart, atEnd</li>
        <li>isOptional, isCaptured, isVariable</li>
      </ol>
<p>Each level blocks out the ones that came before it, 
  and the 'atStart' and 'atEnd' options can also be removed
  if an option chosen in step 3 would cause issues.</p>
  <p>In addition to avoiding potential errors, this also gives the benefit
    of providing clear descriptions. After providing an alternative text with 'or',
    all of the subsequent behaviors will apply to each alternative - in other words, this.or("that").atEnd
    will expect either 'this' or 'that' to be at the end (rather than 'this' found anywhere or 'that' specifically at the end).
  </p>
  <p>This is designed to be intuitive for the user thanks to intellisense, 
    and is not something you should have to think about. The only caveat
     is that when using regex as an argument or composing one RXP unit into another,
     the RXP constructor will provide all of the possible options initially,
     so it is still possible to write invalid regex.</p>
     <CodeSample sample={`const inner = init("text").precededBy("stuff");
inner.atEnd // works
inner.atStart // XXX

init(inner).atStart // invalid regex, but due to RXP composition
// the constructor will still allow this`} />
<p> RXP does a lot to deter mistakes, but it is not fullproof and regex should still be built in a careful manner.</p>
  </GuideSection>
)
// table of contents

// ErrorHandlingGuide
// rror example - behavior combinations
// remove options, use intellisense
// warn about composability

const GuidePage = () => (
  <Layout title="RXP Guide" pageTitle="RXP Guide">
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
