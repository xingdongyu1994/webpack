// const React = require('react');
// const ReactDOM = require('react-dom');

// ReactDOM.render(
//   <h1>Hello, world!</h1>
// );
require('./style.css')
console.log("入口文件11111111`")
// import './main1.css'

require.ensure([], function(require) {
   require('./a')
  //  require('./b')
}, 'chunkensure1')
if(false){
  require.ensure([], function(require) {
    require('./c')
 }, 'chunkensure2')
}
// require.ensure(['./main2'],function(require) {
//   var content = require('./main2');
//   document.open();
//   document.write('<h1>' + content + '</h1>');
//   document.close();
// })