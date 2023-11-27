const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(
  `
    <body>
      Hello,
      <script src="data:,document.body.innerHTML=123"></script>
    </body>
  `,
  { runScripts: "dangerously", resources: "usable" }
);

dom.window.onload = () => {
  console.log(dom.serialize());
};
