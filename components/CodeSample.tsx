import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeSample = ({sample}: {sample: string}) => (
  <SyntaxHighlighter 
    language="javascript" 
    style={vscDarkPlus} 
    customStyle={{borderRadius: ".3em", overflow: "auto", width: "90%", margin: "auto"}}
  >
    {sample}
  </SyntaxHighlighter>
);