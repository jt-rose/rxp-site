import Link from "next/link";
import Layout from "../components/Layout";

const RegexGuidePage = () => (
  <Layout title="regex-guide">
    <h1>Regex Guide</h1>
    <p>This is the Regex Guide</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default RegexGuidePage;
