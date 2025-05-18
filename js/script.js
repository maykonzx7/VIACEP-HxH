const inputCep = document.querySelector("#cep");
const btnCep = document.querySelector("input[type='button']");
const inputState = document.querySelector("#estado");
const inputCity = document.querySelector("#city");
const inputNeighborhood = document.querySelector("#neighborhood");
const inputStreetAddress = document.querySelector("#streetAddress");

async function completeForm() {
  let valueInputCep = inputCep.value;
  
  valueInputCep = valueInputCep.replace(/\D/g, "");
  
  if (valueInputCep.length !== 8) {
    alert("Por favor, insira um CEP válido com 8 dígitos");
    return;
  }
  
  try {
    let response = await fetch(`https://viacep.com.br/ws/${valueInputCep}/json/`);
    let data = await response.json();
    console.log(data);

    if (data.erro) {
      alert("CEP não encontrado");
      return;
    }

    inputState.value = data.uf; 
    inputCity.value = data.localidade; 
    inputNeighborhood.value = data.bairro;
    inputStreetAddress.value = data.logradouro;

  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    alert("Ocorreu um erro ao buscar o CEP. Verifique sua conexão e tente novamente.");
  }
}

btnCep.addEventListener("click", completeForm);

function mask() {
  let valueInputCep = inputCep.value;
  valueInputCep = valueInputCep.replace(/\D/g, "");
  
  if (valueInputCep.length > 8) {
    valueInputCep = valueInputCep.substring(0, 8);
  }
  
  if (valueInputCep.length > 5) {
    inputCep.value = `${valueInputCep.substring(0, 5)}-${valueInputCep.substring(5)}`;
  } else {
    inputCep.value = valueInputCep;
  }
}
inputCep.addEventListener("input", mask);