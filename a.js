const { exec } = require("child_process");
console.log("Reinicio de Emergência\n")
console.log("Reinicio de Emergência\n")
console.log("Reinicio de Emergência\n\n")
console.log("Robô em execução, por gentileza, assim que possivel me reinicie")

exec("npm run dev", 

(error, stdout, stderr) => {

    console.dir(`Result ${stdout}`);
});