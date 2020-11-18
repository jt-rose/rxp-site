import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeSample = ({sample}: {sample: string}) => (
  <SyntaxHighlighter 
    language="javascript" 
    style={vscDarkPlus} 
    customStyle={{borderRadius: ".3em", margin: "0 2em .5em 1.5em"}}
  >
    {sample}
  </SyntaxHighlighter>
);