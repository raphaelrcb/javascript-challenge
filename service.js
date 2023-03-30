/*
Desafio - Processo Seletivo EloGroup 2023 
Crack The Code 

author: Raphael Rodrigues da Costa Barbosa
email: raphaelrcbarbosa@gmail.com
*/

/*
   Função para validar Entrada de Dados do usuário. CPF e valores dentro do esperado
*/
const validarEntradaDeDados = (lancamento) => {
   
   var mensagemValidacao = '';
   validaCpf(lancamento.cpf)?  null : mensagemValidacao = "CPF não é válido";
   validaValor(lancamento.valor)? null : mensagemValidacao = mensagemValidacao.concat("\nValor nâo é válido");
   return mensagemValidacao;
}

/*
   Função para calcular o Saldo total para cada conta (cada CPF)
*/
const recuperarSaldosPorConta = (lancamentos) => {

   var saldoPorContas = [...lancamentos
      .reduce( (map, {cpf, valor}) => map.set(cpf, [...(map.get(cpf) || []), valor]), new Map)] 
      .map(   ([cpf, valor]) => ({ cpf, valor: valor.reduce((sum, val) => sum + val, 0) })   );//   };

   return saldoPorContas;
}

/*
   Função para recuperar o maior e o menor lançamento da última conta a receber uma entrada
*/
const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {

   var maiorMenorlancamentos = [];
   var maiorLancamento = -2001;
   var menorLancamento = 15001;
   var maiorIndex = -1;
   var menorIndex = -1;

   lancamentos.forEach((lancamento, index) => {
      if (lancamento.cpf == cpf){
         if (lancamento.valor >= maiorLancamento){
            maiorLancamento = lancamento.valor;
            maiorIndex = index;
         }
         if (lancamento.valor <= menorLancamento){
            menorLancamento = lancamento.valor;
            menorIndex = index;
         }
      } 
      
   });
   maiorMenorlancamentos.push(lancamentos[menorIndex]);
   maiorMenorlancamentos.push(lancamentos[maiorIndex]);

   return maiorMenorlancamentos;
}
/*
   Função para recuperar os 3 maiores saldos entre as contas existentes
*/
const recuperarMaioresSaldos = (lancamentos) => {

   totalSaldos = recuperarSaldosPorConta(lancamentos);
   
   totalSaldos = totalSaldos.sort((menor, maior) => { return maior.valor - menor.valor});

   return totalSaldos.slice(0,3);
}

/*
   Função para recuperar as 3 maiores médias de lancamentos entre as contas existentes
*/
const recuperarMaioresMedias = (lancamentos) => {

   var medias = [...lancamentos
   .reduce( (map, {cpf, valor}) => map.set(cpf, [...(map.get(cpf) || []), valor]), new Map)] 
   .map(   ([cpf, valor]) => ({ cpf, valor: valor.reduce((sum, val) => sum + val, 0) / valor.length })   );
   
   medias = medias.sort((menor, maior) => { return maior.valor - menor.valor});
   return medias.slice(0,3);
}

/*
   Função para validar se CPF é válido, se está no formato correto e possui verificação de dígito
*/
function validaCpf(cpf){
   //expressão regular para verificar formato escrito como válido
   const regex = new RegExp('([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})');

   if (regex.test(cpf)) {
      cpf = cpf.replace(/[^a-zA-Z0-9 ]/g, '');
   } else {
      return false;
   }
   return VerificaDigitoCpf(cpf);
}

/*
   Função para verificar dígito do CPF de acordo com as regras de verificação estabelecidas 
*/
function VerificaDigitoCpf(cpf) {

   var sum = 0;
   var remainder;

   var allEqual = true;
   for (var i = 0; i < cpf.length - 1; i++) {
      if (cpf[i] != cpf[i + 1])
         allEqual = false;
   }
   if (allEqual)
      return false;

   for (i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if ((remainder == 10) || (remainder == 11))
      remainder = 0;
  if (remainder != parseInt(cpf.substring(9, 10)))
      return false;

  sum = 0;
  for (i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i); remainder = (sum * 10) % 11;

  if ((remainder == 10) || (remainder == 11))
      remainder = 0;
  if (remainder != parseInt(cpf.substring(10, 11)))
      return false;
   return true;
}

/*
   Função que validar valor de entrada do usuário 
*/
function validaValor(valor) {
   //console.log("Valor: ", valor)
   if (valor){
      if (valor > 15000 || valor < -2000){
         return false;
      } else {
         return true;
      }
   }
   return false;
} 
