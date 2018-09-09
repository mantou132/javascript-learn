var cp = require('child_process'),
    psTree = require('ps-tree');

    cp.exec("node -e 'while (true);'", function () { /*...*/ });
    
psTree(process.pid, function (err, children) {
  console.log(children);
  children.map(function (p) { process.kill(p.PID) });
});

