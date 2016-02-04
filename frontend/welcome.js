export default function(message) {
  //debugger;

  if (NODE_ENV == 'development') {
    console.log(message);
  }

  alert(`Welcome ${message}`);
}
