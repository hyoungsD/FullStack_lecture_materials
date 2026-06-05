console.log("노드 버전", process.version)
console.log("플랫폼", process.platform)
console.log("아키텍처", process.arch)

const os = require('os')
console.log('운영체제', os.type());
console.log('플랫폼', os.platform());

const cpus = os.cpus();
console.log('cpu 코어수', cpus.length)
console.log('cpu 모델', cpus[0].model);
console.log('cpu 속도', cpus[0].speed);