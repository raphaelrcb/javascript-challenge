const validarEntradaDeDados = (lancamento) => {

   console.log("Validando Dados");
   var mensagemValidacao = null;
   validaCpf(lancamento.cpf)? /*console.log("cpf validado")*/ null : mensagemValidacao = "CPF não é válido";
   validaValor(lancamento.valor)? /*console.log("valor validado")*/ null : mensagemValidacao = mensagemValidacao + "\nValor nâo é válodo";
   //console.log(mensagemValidacao)
   return mensagemValidacao;
}

const recuperarSaldosPorConta = (lancamentos) => {
   const saldoPorContas = [];

   if(lancamentos!=null){
      for(i=0; i < Object.keys(lancamentos).length; i++){
         saldoConta = calculaSaldoConta(lancamentos[i].cpf, lancamentos, saldoPorContas)
         if (saldoConta != null)
            saldoPorContas.push(saldoConta);
      }
   } else {
      console.log("lancamentos vazios")
   }

   return saldoPorContas;
}

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
   //console.log(maiorMenorlancamentos);

   return maiorMenorlancamentos;
}

const recuperarMaioresSaldos = (lancamentos) => {

   totalSaldos = recuperarSaldosPorConta(lancamentos);
   
   totalSaldos = totalSaldos.sort((menor, maior) => { return maior.valor - menor.valor});

   //console.log("ORDENADO", totalSaldos);

   return totalSaldos.slice(0,3);
}

const recuperarMaioresMedias = (lancamentos) => {

   var medias = [...lancamentos
   
      .reduce( (map, {cpf, valor}) => map.set(cpf, [...(map.get(cpf) || []), valor]), new Map)   
   
   ] .map(   ([cpf, valor]) => ({ cpf, valor: valor.reduce((sum, val) => sum + val, 0) / valor.length })   );
   medias = medias.sort((menor, maior) => { return maior.valor - menor.valor});
   console.log(medias);
    return medias.slice(0,3);
}

function validaCpf(cpf){

   const regex = new RegExp('([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})');

   if (regex.test(cpf)) {
      cpf = cpf.replace(/[^a-zA-Z0-9 ]/g, '');
   } else {
      return false;
   }
   return VerificaDigitoCpf(cpf);
}

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

function calculaSaldoConta(cpfLancamentoAtual, lancamentos, saldoPorContas) {

   var saldoConta = {
      cpf: cpfLancamentoAtual,
      valor: 0
   };
   
   isPresent = saldoPorContas.findIndex(conta => conta.cpf === cpfLancamentoAtual);
   if (isPresent == -1){
      lancamentos.forEach(lancamento => {
         if (cpfLancamentoAtual == lancamento.cpf){
            saldoConta.valor = saldoConta.valor + lancamento.valor;
         }
      });
      return saldoConta;
   } 
   return null;
}