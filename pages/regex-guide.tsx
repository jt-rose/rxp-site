import Link from "next/link";
import Layout from "../components/Layout";

import { regexData } from "../utils/regexData";

const RegexGuidePage = () => (
  <Layout title="regex-guide">
    <h1>Regex Guide</h1>
    <p>This is the Regex Guide</p>
    <table>
      <td>
        Symbol
      </td>
      <td>
        Name
      </td>
      <td>
        Description
      </td>
      <td>
        Example
      </td>
      {regexData.map(data => (
        <tr>
          <th>{data.symbol}</th>
          <th>{data.name}</th>
          <th>{data.description}</th>
          <th>{data.example}</th>
        </tr>
      ))}
    </table>
  </Layout>
);

export default RegexGuidePage;
