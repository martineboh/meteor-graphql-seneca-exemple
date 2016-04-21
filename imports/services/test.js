//Simple test plugin which expose a hello command
export default function test(options) {

  //Expose the hello command
  this.add({ role:'test', cmd:'hello' }, function ({name}, callback) {
    callback(null, { data: `Hello, ${name}!` });
  });
};
