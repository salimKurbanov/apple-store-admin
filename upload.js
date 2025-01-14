let proc = Bun.spawn(["tar", "czf", "build.tar", "build"]);
await proc.exited;

const tar = Bun.file("./build.tar");
const formData = new FormData();

console.log(tar);
formData.append("upload", tar);

let res = await fetch(
  "http://31.130.148.215:5000/build/admin",
  {
    method: "POST",
    body: formData,
  }
);
res = await res.text();
console.log(res);
