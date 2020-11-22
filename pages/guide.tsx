import Layout from "../components/Layout";
import Link from "next/link";
import React, { ReactNode } from "react";

import { CodeSample } from "../components/CodeSample";

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
      }
    `}
    </style>
  </div>
);

const ImportGuide = () => (
  <GuideSection>
    <h2 className="section-title">Import the Library</h2>
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
  <h2 className="section-title">Initialize the Constructor</h2>
    <p>The RXP <code className="code-in-text">init</code> function works by accepting text to search for, creating an object 
      that provides methods to modify the search behavior, and then converts it to a 
      standard regex through the <code className="code-in-text">construct</code> command.</p>

      <CodeSample sample={`init("sample").construct() // 	/sample/
init("sample").atStart.construct() // 	/^(?:sample)/`} />
      <p>
      The <code className="code-in-text">init</code> function combines any number of arguments into a text to search for:
      </p>
      <CodeSample sample={`init("search", " for ", "me").construct() // /search for me/`} />
    
      <p>
      String arguments will automatically be escaped, so you can enter the 
      text exactly as you expect to see it:
      </p>
      <CodeSample sample={`init("() and []").construct() // /\\(\\) and \\[\\]/`} />
      <p>
      <code className="code-in-text">init</code> can also accept regex or other RXP constructor objects for 
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
    <h2 className="section-title">Modify Regex Behavior</h2>
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
      on the <Link href="/api-guide#rxp-method">API page</Link>.
      </p>
      <p>
      By default, groups are noncapturing and searches are lazy, 
      but both behaviors can be overridden:
      </p>
      <CodeSample sample={`sample.isCaptured.construct() // /(sample)/ 
sample.occursOnceOrMore.construct() // /(?:sample)+?/ 
sample.occursOnceOrMore.and.isGreedy.construct() // /(?:sample)+/`} />
      <p>
      Regex variables can be defined with the <code className="code-in-text">isVariable</code> method and 
      then passed to other RXP constructors through <code className="code-in-text">init</code> as often as needed. 
      When using the <code className="code-in-text">construct</code> method, the variables will be rewritten in 
      order of appearance to work as expected. Here is an example using the 
      preset <code className="code-in-text">anyDigit</code> (covered below):
      </p>
      <CodeSample sample={`const regexVar = anyDigit.occurs(3).and.isVariable("var");
init(regexVar, " with ", regexVar).construct() // /(?<var>d{3}) with //k<var>/`}/>
      </GuideSection>
);

const ConstructGuide = () => (
  <GuideSection>
    <h2 className="section-title">Convert to Regex</h2>
      <p>
      The <code className="code-in-text">construct</code> function can be passed arguments to define the search flags:
      </p>
      <CodeSample sample={`sample.construct("g") // /sample/g 
sample.construct("global", "s", "I") // /sample/gsi`} />
      <p>
      If <code className="code-in-text">init</code> is passed a regex argument including a flag, the flag will 
      be stripped from it and would need to be added back with construct:
      </p>
      <CodeSample sample={`init(/search/g, " for me").construct() // /search for me/`} />
  </GuideSection>
);

const PresetsGuide = () => (
  <GuideSection>
    <h2 className="section-title">Presets</h2>
      <p>
      To use special characters, such as <code className="code-in-text">\d</code> to match a digit or <code className="code-in-text">\w</code> to 
      match a letter, you can use the <code className="code-in-text">presets</code> provided with RXP, such 
      as <code className="code-in-text">anyDigit</code> or <code className="code-in-text">anyLetter</code>. These are preloaded RXP constructor 
      objects with all the functionality built in:
      </p>
      <CodeSample sample={`anyDigit.occurs(3).construct() // /(?:[0123456789]){3}/ 
anyLetter.atEnd.construct() // /(?:\\w)$/`} />
      <p>
      Since the <code className="code-in-text">init</code> function will automatically escape special 
      characters, if you want to pass them in directly without using 
      presets then you would need to use a standard regex:
      </p>
      <CodeSample sample={`// incorrect:
init("\\d").construct // result: /\\\\d/

// correct:
init(/\\d/).construct() // result: /\\d/`} />
      <p>
      A full list of presets can be found on the <Link href="/api-guide#presets">API page</Link>.
      </p>
  </GuideSection>
);

const ShorthandsGuide = () => (
  <GuideSection>
    <h2 className="section-title">Shorthands</h2>
      <p>
      <code className="code-in-text">shorthands</code> are a group of functions that create an RXP object and 
      immediately apply a desired search behavior. These are provided 
      to improve readability, and there is no functional difference 
      between something like <code className="code-in-text">optional(“text”)</code> and <code className="code-in-text">init(“text”).isOptional</code>.
      </p>
      <CodeSample sample={`init(
    optional("("), 
    "text", 
    optional(")")
  .construct() // /(?:\()?text(?:\))?/`} />
      <p>
      A variety of shorthands are available and can be found on the <Link href="/api-guide#shorthands">API page</Link>. 
      All of these produce the standard RXP constructor object with the unique 
      exceptions of <code className="code-in-text">withBoundaries</code> and <code className="code-in-text">wrapRXP</code>.
      </p>
  </GuideSection>
);

const GuidePage = () => {
return (
  <Layout title="RXP Guide" pageTitle="RXP Guide">
    <ImportGuide />
    <InitGuide />
    <ModifyTextGuide />
    <ConstructGuide />
    <PresetsGuide />
    <ShorthandsGuide />
  </Layout>
);
}

export default GuidePage;
