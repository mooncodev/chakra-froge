const fs = require("fs")
const path = require("path")
const {
  HStack,
  Image,
  Text
} = require('@chakra-ui/react');
const React = require('react');

const convertBytes = function(bytes,fixed=1) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) {return "n/a"}
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  if (i === 0) {return bytes + " " + sizes[i]}
  return (bytes / Math.pow(1024, i)).toFixed(fixed) + " " + sizes[i]
}

const files = fs.readdirSync('.')
let froges = {},
  ffs = {},
  fffs = {}

files.forEach(function(file) {
  const fpath = path.resolve(__dirname,file)
  const fsize = convertBytes(fs.statSync(fpath).size, 0)
  if(file==='makeLogoDirJSX.js'){return}
  if(file.indexOf('froge')>-1){
    froges[file] = fsize
  }
  if(file.indexOf('ff')>-1){
    ffs[file] = fsize
  }
  if(file.indexOf('fff')>-1){
    fffs[file] = fsize
  }
})

console.log(froges);
console.log(ffs);
console.log(fffs);

const json = {
  ['Froge Logo']:froges,
  ['Froge Finance']:ffs,
  ['Froge Finance Foundation']:fffs,
}

debugger;

