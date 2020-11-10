const app = document.getElementById("app");
app &&
  (app.innerHTML = `
  <p>这是index.html</p>
<a href="./demo.html">同目录下的demo.html</a>
<br/>
<a href="./no_console.html">同目录下的no_console.html</a>
<br/>
<a href="./a/index.html">不同目录的index.html</a>

`);
console.log("hello world===");
console.log("哈哈😄");
