import Layout from "../components/Layout";
import theme from "../styles/theme";

const formattedThemeBKG = theme.colors.background.replace("#", "");

const IndexPage = () => (
  <Layout title="RXP" pageTitle="RXP">
    <div className="site-badges">
    <a href="https://www.github.com/jt-rose/rxp">
    <img src={`https://badgen.net/github/release/jt-rose/rxp?icon=github&label&scale=1.3&color=${formattedThemeBKG}`} alt="Github"/>
    </a>
    <a href="https://www.npmjs.com/package/rxp">
    <img src={`https://badgen.net/badge/icon/v1.4.5?icon=npm&label&scale=1.3&color=${formattedThemeBKG}`} alt="NPM"/>
    </a>
    <a href="https://www.typescriptlang.org/">
    <img src={`https://badgen.net/badge/icon/typescript?icon=typescript&label&scale=1.3&color=${formattedThemeBKG}`} alt="TypeScript" />
    </a>
    </div>
    
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
