const axios = require('axios');
const info = {
  NOME: '',
  CONSIGNAVEL: '',
  IDADE: '',
  ESPECIE: ''
}

module.exports = {
  async consulta_CPF(message) {

    const res =  await axios.get(`http://ws.inss.contatoplus.com/api/cadastro/${message}?apiKey=Ov1SR6w40oUAgQy5swg2m5vlReZ5AIk6CtH5O4qnrCLQxM1WJtr8Rp9Tkpv84urS`); 
  try{
      // Success 🎉
      info.NOME = res.data[0].NOME
      info.CONSIGNAVEL = res.data[0].RESUMO_FINANCEIRO.MARGEM_CONSIGNAVEL_EMP
      info.IDADE = res.data[0].IDADE
      info.ESPECIE = res.data[0].ESP_DESC

      console.log(info)
      return info

  }
  catch(error) {
      // Error 😨
      info.NOME = " Não encontrei nada para o número mencionado"
      info.CONSIGNAVEL = "0"
      info.IDADE = "0"
      info.ESPECIE = '0'
      console.log(info)
      return info
  }
  }
}
