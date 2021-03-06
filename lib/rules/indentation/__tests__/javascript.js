"use strict";

const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [2],
  syntax: "jsx",
  fix: true,

  accept: [
    {
      code: `
export default <img style={{ transform: 'translate(1, 1)', display: 'block' }} />;
`
    },
    {
      code: `
export default <img style={{
  transform: 'translate(1, 1)'
}} />;
`
    },
    {
      code: `
export default <img style=
  {
    {
      transform: 'translate(1, 1)'
    }
  }
/>;
`
    }
  ],
  reject: [
    {
      code: `
export default <img style={{
    transform: 'translate(1, 1)'
}} />;
`,
      fixed: `
export default <img style={{
  transform: 'translate(1, 1)'
}} />;
`,
      message: messages.expected("2 spaces"),
      line: 3,
      column: 4
    }
  ]
});

testRule(rule, {
  ruleName,
  config: [
    "tab",
    {
      baseIndentLevel: 1
    }
  ],
  syntax: "jsx",
  fix: true,

  accept: [
    {
      code: `
import styled from "styled-components";
export default styled.div\`
\tcolor: #00;
\`;`
    },
    {
      code: `
\timport styled from "styled-components";
\texport default styled.div\`
\t\tcolor: #00;
\t\`;`
    }
  ],
  reject: [
    {
      code: `
import styled from "styled-components";
export default styled.div\`
color: #00;
\`;`,
      fixed: `
import styled from "styled-components";
export default styled.div\`
\tcolor: #00;
\`;`,
      message: messages.expected("1 tab"),
      line: 4,
      column: 1
    },
    {
      code: `
\timport styled from "styled-components";
\texport default styled.div\`
\tcolor: #00;
\t\`;`,
      fixed: `
\timport styled from "styled-components";
\texport default styled.div\`
\t\tcolor: #00;
\t\`;`,
      message: messages.expected("2 tabs"),
      line: 4,
      column: 2
    }
  ]
});

testRule(rule, {
  ruleName,
  config: [
    "tab",
    {
      baseIndentLevel: 0
    }
  ],
  syntax: "jsx",
  fix: true,

  accept: [
    {
      code: `
import styled from "styled-components";
export default styled.div\`
color: #00;
\`;`
    },
    {
      code: `
\timport styled from "styled-components";
\texport default styled.div\`
\tcolor: #00;
\t\`;`
    }
  ],
  reject: [
    {
      code: `
import styled from "styled-components";
export default styled.div\`
\tcolor: #00;
\`;`,
      fixed: `
import styled from "styled-components";
export default styled.div\`
color: #00;
\`;`,
      message: messages.expected("0 tabs"),
      line: 4,
      column: 2
    },
    {
      code: `
\timport styled from "styled-components";
\texport default styled.div\`
\t\tcolor: #00;
\t\`;`,
      fixed: `
\timport styled from "styled-components";
\texport default styled.div\`
\tcolor: #00;
\t\`;`,
      message: messages.expected("1 tab"),
      line: 4,
      column: 3
    }
  ]
});
