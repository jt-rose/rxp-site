import Layout from "../components/Layout";
import { RXPexamples } from "../utils/examples";
import { CodeSample } from "../components/CodeSample";

const Examples = () => (
  <ul>
      {RXPexamples.map(example => (
          <li key={`example-${example.title}`}>
              <h3>{example.title}</h3>
              <p>Target: {example.target}</p>
              <CodeSample sample={example.sample}/>
          </li>
      ))}
      <style jsx>{`
          ul {
              list-style-type: none;
          }
      `}</style>
  </ul>
);

const IndexPage = () => (
  <Layout title="RXP" pageTitle="RXP">
    
    <p>A descriptive constructor for regular expressions</p>

    <p>
      RXP is a small library that provides a constructor for regular
      expressions, providing the following benefits:
    </p>
    {[
      {
        title: "Plain English Descriptions",
        content: "Replace cryptic regex with intuitive descriptions",
      },
      {
        title: "Modular and Composable Regex Components",
        content: "Build regex as small, manageable pieces and combine or extend them as needed",
      },
      {
        title: "Automatic Escaping of Characters",
        content: "Write regex with a WYSIWYG mindset and let RXP handle escaping of special characters for you",
      },
      {
        title: "Accepts Strings, Regex, or Other RXP Units",
        content: "Highly flexible constructor that can format strings or accept other regex or RXP constructors - RXP will reconcile everything behind the scenes",
      },
      {
        title: "Automatically Formats Regex Variables",
        content: "Define a regex variable once, store it as an old-fashioned JavaScript variable, and insert it wherever you want - RXP will reconfigure it to work correctly, regardless of positioning",
      },
    ].map((x) => (
      <li key={`${x.title}-key`}>
        <h3>{x.title}</h3>
        <p>{x.content}</p>
      </li>
    ))}
    <Examples />
    <style jsx>{`
      li {
        list-style-type: none;
      }
      li p {
        padding: 0 1em 1em 1em;
      }
      .site-badges {
        display: flex;
        justify-content: center;
      }
    `}</style>
  </Layout>
);

export default IndexPage;
