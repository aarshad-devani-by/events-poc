let sampleFunction = (...args) => {
  console.log("firstElement", args.shift());
  console.log("args", args);
  return args;
};
let mainData = sampleFunction("Aarshad", "Dinesh", "Devani");
console.log("resp", mainData);
mainData.shift();
console.log("new", mainData);
