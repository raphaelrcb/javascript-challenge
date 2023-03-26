const validarEntradaDeDados = (lancamento) => {

   console.log("Validando Dados");
   var mensagemValidacao = null;
   validaCpf(lancamento.cpf)? console.log("cpf validado") : mensagemValidacao = "CPF não é válido";
   validaValor(lancamento.valor)?console.log("valor validado") : mensagemValidacao = mensagemValidacao + "\nValor nâo é válodo";
   //console.log(mensagemValidacao)
   return mensagemValidacao;
}

const recuperarSaldosPorConta = (lancamentos) => {
   //console.log(lancamentos);
   return []
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   return []
}

const recuperarMaioresSaldos = (lancamentos) => {
   return []
}

const recuperarMaioresMedias = (lancamentos) => {
    return []
}

function validaCpf(cpf){
 //  console.log(cpf);
   const regex = new RegExp('([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})');
 //  console.log(regex.test(cpf));
   if (regex.test(cpf)) {
      cpf = cpf.replace(/[^a-zA-Z0-9 ]/g, '');
   } else {
      return false;
   }
   return VerificaDigitoCpf(cpf);
}

function VerificaDigitoCpf(cpf) {
   //console.log("valida digito no cpf: ", cpf);

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

function validaValor(valor) {
   console.log("Valor: ", valor)
   if (valor){
      if (valor > 15000 || valor < -2000){
         return false;
      } else {
         return true;
      }
   }
   return false;
} 