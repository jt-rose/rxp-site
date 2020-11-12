import Link from "next/link";
import Layout from "../components/Layout";

import { regexData, specialCharData } from "../utils/regexData";

const RegexGuidePage = () => (
  <Layout title="regex-guide">
    <h1>Regex Guide</h1>
    <p>A quick reference guide to common regex characters.</p>
    <h2>Regex Behavior Modifiers</h2>
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
    <br />
    <h2>Special Characters</h2>
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
      {specialCharData.map(data => (
        <tr>
        <th>{data.symbol}</th>
        <th>{data.name}</th>
        <th>{data.description}</th>
      </tr>
      ))}
    </table>
  </Layout>
);

export default RegexGuidePage;
