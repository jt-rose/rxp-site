import Layout from "../components/Layout";
import Link from "next/link";
import React, { ReactNode } from "react";

import { CodeSample } from "../utils/CodeSample";

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
        max-width: 600px;
      }
      .guide-section > :global(.section-title) {
        text-align: center;
        margin: 0;
      }
    `}
    </style>
  </div>
);

const InitGuide = () => (
  <GuideSection>
  <h2 className="section-title">Initialize the constructor</h2>
    <p>The RXP 'init' function works by accepting text to search for, creating an object 
      that provides methods to modify the search behavior, and then converts it to a 
      standard regex through the ‘construct’ command.</p>

      <CodeSample sample={`init("sample").construct() // 	/sample/
init("sample").atStart.construct() // 	/^(?:sample)/`} />
      <p>
      The ‘init’ function combines any number of arguments into a text to search for:
      </p>
      <CodeSample sample={`init("search", "for", "me").construct() // /search for me/`} />
    
      <p>
      String arguments will automatically be escaped, so you can enter the 
      text exactly as you expect to see it:
      </p>
      <CodeSample sample={`init("() and []").construct() // /\\(\\) and \\[\\]/`} />
      <p>
      Init can also accept regex or other RXP constructor objects for 
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
const patternsAndPatternsOhMy = init(namePattern, namePattern, namePattern.occurs(999))`} />
      </GuideSection>
);

const ModifyTextGuide = () => (
  <GuideSection>
    <h2 className="section-title">Modify Search Behavior through RXP Methods</h2>
      <p>
      After creating the RXP constructor object, 
      the provided text can be modified with regex behavior:
      </p>
      <CodeSample sample={`sample.occurs(2).construct() // /samplesample/ 
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
      Regex variables can be defined with the ‘isVariable’ method and 
      then passed to other RXP constructors through init as often as needed. 
      When using the ‘construct’ method, the variables will be rewritten in 
      order of appearance to work as expected. Here is an example using the 
      preset anyDigit (covered below):
      </p>
      <CodeSample sample={`const regexVar = anyDigit.occurs(3).and.isVariable("var");
init(regexVar, " with ", regexVar).construct() // /(?<var>d{3}) with //k<var>/`}/>
      </GuideSection>
);

const ConstructGuide = () => (
  <GuideSection>
    <h2 className="section-title">Convert to Regex</h2>
      <p>
      The ‘construct’ function can be passed arguments to define the search flags:
      </p>
      <CodeSample sample={`sample.construct("g") // /sample/g 
sample.construct("global", "s", "I") // /sample/gsi`} />
      <p>
      If init is passed a regex argument including a flag, the flag will 
      be stripped from it and would need to be added back with construct:
      </p>
      <CodeSample sample={`init(/search/g, " for me").construct() // /search for me/`} />
  </GuideSection>
);

const PresetsGuide = () => (
  <GuideSection>
    <h2 className="section-title">Presets</h2>
      <p>
      To use special characters, such as \d to match a digit or \w to 
      match a letter, you can use the ‘presets’ provided with RXP, such 
      as anyDigit or anyLetter. These are preloaded RXP constructor 
      objects with all the functionality built in:
      </p>
      <CodeSample sample={`anyDigit.occurs(3).construct() // /(?:[0123456789])3/ 
anyLetter.atEnd.construct() // /(?:\w)$/ equiv`} />
      <p>
      Since the ‘init’ function will automatically escape special 
      characters, if you want to pass them in directly without using 
      presets then you would need to use a standard regex:
      </p>
      <CodeSample sample={`init("\\d").construct // XXX /\\\\d/
init(/\\d/).construct() // good /\\d/`} />
      <p>
      A full list of presets can be found on the <Link href="/api-guide#presets">API page</Link>.
      </p>
  </GuideSection>
);

const ShorthandsGuide = () => (
  <GuideSection>
    <h2 className="section-title">Shorthands</h2>
      <p>
      ‘Shorthands’ are functions that create an RXP object and 
      immediately apply a desired search behavior. These are provided 
      to improve readability, and there is no functional difference 
      between optional(“text”) and init(“text”).isOptional.
      </p>
      <CodeSample sample={`init(optional("("), "text", optional(")").construct() // /(?:\()?text(?:\))?/`} />
      <p>
      A variety of shorthands are available and can be found on the <Link href="/api-guide#shorthands">API page</Link>. 
      All of these produce the standard RXP constructor object with the unique 
      exceptions of ‘withBoundaries’ and ‘wrapRXP’.
      </p>
  </GuideSection>
);

const GuidePage = () => {
return (
  <Layout title="RXP Guide" pageTitle="Quick Guide">
    <InitGuide />
    <ModifyTextGuide />
    <ConstructGuide />
    <PresetsGuide />
    <ShorthandsGuide /> //pageHeader for h1 with layout styling
  </Layout>
);
}

export default GuidePage;
