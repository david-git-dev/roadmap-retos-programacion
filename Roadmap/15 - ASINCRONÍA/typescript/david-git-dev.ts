//asicronia
//callbacks
function callbackAsyncFunction(callback: () => void) {
  console.log(callback.name);
  console.time("async process");
  setTimeout(() => {
    console.log("getting data....");
  }, 1000);
  console.log("process time counte by do it ->");
  console.timeEnd("async process");
}
callbackAsyncFunction(function gettingData() {
  console.log("another function is setting...");
});
//with promise
function promiseFunction(callback: () => void) {
  const async_data = {};
  console.log("name function ->", callback.name);
  console.log("time start -", performance.now().toFixed(2), "ms");
  const promise = new Promise((reject, resolve) => {
    setTimeout(() => {
      console.log("getting data...");
      resolve(async_data)
    }, 3000);
  });
  console.log(`time end -${performance.now().toFixed(2)}ms`);
  return promise;
}
promiseFunction(function getData() {
  console.log("print.data");
})
  .then(() => "import data...")
  .then(() => "generating excel...")
  .then(() => "print...")
  .catch(() => "ocurred error expected....");
// async - await
async function asyncFunc(callback: () => void) {
  try {
    console.log(callback.name);
    console.time("async process");
    const data = await fetch("www.api.domain.com/getting-data/v1"); //thats doesnt not exist , is just a example...
    console.log(data);
    console.log("process time counte by do it ->");
    console.timeEnd("async process");
  } catch (e) {
    if(e instanceof Error)
    console.log(e.name, e.message);
  }
}
asyncFunc(function gettingData() {
  console.log("another function is setting...");
});
//dificultad extra
//caso base
function baseFunction (callback:()=>void,time:number){
  console.log('tiempo de inicio',performance.now())
setTimeout(() => {
  console.log(`ejecutando la funcion->${callback.name}, tardara ${time}segundos`)
  callback()
}, time);
console.log('tiempo de finalizacion ->',performance.now())
}
//solucion usando callbacks
let completed:number = 0;
const totalTasks:number = 3;
const results:[] = [];

function checkAllTasksDone() {
  completed += 1;
  if (completed === totalTasks) {
    console.log('Todas las tareas completadas ejecutando la tarea D...');
    baseFunction(function d(){
      checkAllTasksDone()
      },1)
  }
}
baseFunction(function c(){
checkAllTasksDone()
},3)
baseFunction(function b(){
checkAllTasksDone()
},2)
baseFunction(function a(){
checkAllTasksDone()
},1)
//solucion usando promises
function process(callback: () => any, ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(callback());
    }, ms)
  );
} //aqui simulamos una promesa que se concluye en cierto tiempo

const promises = [
  process(function c() {
    return "ejecutando la funcion C";
  }, 3).then((res) => res),
  process(function b() {
    return "ejecutando la funcion B";
  }, 2).then((res) => res),
  process(function a() {
    return "ejecutando la funcion A";
  }, 1).then((res) => res),
];

Promise.allSettled(promises).then((data) => {
  console.log(data);
  process(function d() {
    return "ejecutando la funcion D";
  }, 1).then((res) => console.log(res));
});
