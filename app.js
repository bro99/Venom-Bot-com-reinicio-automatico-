const venom = require('venom-bot');
const { NlpManager } = require("node-nlp");
const consulta = require('./consulta');
const { exec } = require("child_process");

const manager = new NlpManager({ languages: ["pt"], forceNER: true });

manager.addDocument("pt", "oii", "saudacao");
manager.addDocument("pt", "tudo bem", "saudacao");
manager.addDocument("pt", "boa tarde", "saudacao");
manager.addDocument("pt", "boa noite", "saudacao");
manager.addDocument("pt", "bom dia", "saudacao");
manager.addDocument("pt", "opa", "saudacao");
manager.addDocument("pt", "suave", "saudacao");
manager.addDocument("pt", "de boa?", "saudacao");
manager.addDocument("pt", "como está?", "saudacao");
manager.addDocument("pt", "fala nego", "saudacao");
manager.addDocument("pt", "oi gata", "saudacao");
manager.addDocument("pt", "oi gatinha", "saudacao");
manager.addDocument("pt", "oi linda", "saudacao");
manager.addDocument("pt", "oi princesa", "saudacao");
manager.addDocument("pt", "oi xuxu", "saudacao");
manager.addDocument("pt", "ptt", "saudacao");
manager.addDocument("pt", "quero consultar", "consulta");
manager.addDocument("pt", "poderiam consultar", "consulta");
manager.addDocument("pt", "quero fazer uma consulta", "consulta");
manager.addDocument("pt", "consulte por favor", "consulta");
manager.addDocument("pt", "emprestimo", "consulta");
manager.addDocument("pt", "quero fazer um emprestimo", "consulta");
manager.addDocument("pt", "consultar cpf", "consulta");
manager.addDocument("pt", "consulte para mim", "consulta");
manager.addDocument("pt", "me faça um favor e consulte o cpf", "consulta");
manager.addDocument("pt", "tem como me ajudar com uma consulta", "consulta");
manager.addDocument("pt", "obrigado", "agradecimento");
manager.addDocument("pt", "agradeço", "agradecimento");
manager.addDocument("pt", "valeu", "agradecimento");


// Train also the NLG
manager.addAnswer(
  "pt",
  "saudacao",
  "Olá 😍🥰, estou aqui para te ajudar.\nQual sua duvida?"
);
manager.addAnswer(
  "pt",
  "saudacao",
  "Olá, sou um BOT. Adoro tirar dúvidas😍🥰, qual é a sua?"
);

manager.addAnswer(
  "pt",
  "consulta",
  "Olá, envie-me o CPF por gentileza\n🤩🤩🤩"

);

manager.addAnswer(
  "pt",
  "agradecimento",
  "Eu agradeço rsrs\n 🤩🤩🤩"

);



// Função Main

(async () => {
  await manager.train();
  manager.save();
  venom
    .create("BOT")
    .then((client) => {
      //Evento
      client.onMessage(async (message) => {
        // console.log(message.body.replace(/\D/g,'') ); //replace(/\D/g,'') remove todos os caracteres que não são numeros
        try {
          if (message.isGroupMsg === false) {
            const response = await manager.process("pt", message.body);
            if (message.type === "ptt" && message.isGroupMsg === false) {

              await client.sendText(message.from, "Poxa não consigo ouvir audios ainda 🔈🔈");
              await client.setChatState(message.from, 0 | 1 | 2);
            }

            else if (message.type === "sticker" && message.isGroupMsg === false) {

              await client.sendVideoAsGif(
                message.from,
                'tenor.gif',
                'Gif image file'
              );
            }

            else if (message.type === "chat" && response.intent === "None" && message.body.replace(/\D/g, '').length === 10 || message.body.replace(/\D/g, '').length === 11) {
              try {
                await client.sendText(message.from, "Então será " + message.body);
                var requisitacpf = await consulta.consulta_CPF(message.body);
                await client.sendText(message.from, "Olá " + requisitacpf.NOME + "\nSua margem consignavel é " + requisitacpf.CONSIGNAVEL + "\nIdade :" + requisitacpf.IDADE + "\nEspécie :" + requisitacpf.ESPECIE);

              }
              catch {

                await client.sendText(
                  message.from,
                  "Ahhh :( Desculpa não entendi sua dúvida\nAinda estou aprendendo as coisas do seu mundo.\n\nEm breve poderei te ajudar mas agora preciso que reformule sua questão."
                );

                await client.sendVideoAsGif(
                  message.from,
                  'semresposta.gif',
                  'Gif image file'
                );
              }
            }


            else if (response.intent === "None") {

              await client.sendText(
                message.from,
                "Ahhh :( Desculpa não entendi sua dúvida\nAinda estou aprendendo as coisas do seu mundo.\n\nEm breve poderei te ajudar mas agora preciso que reformule sua questão."
              );

              await client.sendVideoAsGif(
                message.from,
                'tenor.gif',
                'Gif image file'
              );
            }


            else {
              await client.sendText(message.from, response.answer);
            }



            console.log(
              "A intenção do Cliente é :",
              response.intent + " e o score é  de ",
              response.score,
              " e o sentimento é de ",
              response.sentiment.type
            );
          }



        }
        catch (error) {
          console.log("Reinicio de Emergência\n")
          console.log("Reinicio de Emergência\n")
          console.log("Reinicio de Emergência\n\n")
          console.log("Robô em execução, por gentileza, assim que possivel me reinicie")

          exec("npm run dev",

            (error, stdout, stderr) => {

              console.dir(`Result ${stdout}`);
            });


        }


      }
      );

    })
    .catch((error) => {

      console.log("Reinicio de Emergência\n")
      console.log("Reinicio de Emergência\n")
      console.log("Reinicio de Emergência\n\n")
      console.log("Robô em execução, por gentileza, assim que possivel me reinicie")

      exec("npm run dev",

        (error, stdout, stderr) => {

          console.dir(`Result ${stdout}`);
        });


    });
})();



