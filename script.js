
axios.defaults.headers.common['Authorization'] = 'fzO7nn1WvKTIVnFrK8kOlhlC';

const urlBase = "https://mock-api.driven.com.br/api/vm/uol"

const user = {}

function realizarLogin() {


  user.name = prompt("Digite seu lindo nome para logar: ")

  const promessa = axios.post(`${urlBase}/participants`, user);
  const sucess = promessa.then(processarResposta);
  sucess.then(reposta => user)
  promessa.catch(() => {
    alert("Esse nome já está logado, tente outro")
    realizarLogin()
  });

}

function renderizarMensagens(mensagens) {

  const lista = document.querySelector(".lista-de-msgs")
  let msg = ''
  for (let i = 0; i < 100; i++) {
    if (mensagens[i].type === "status") {
      msg += `
                  <li class="msg-status"> <span class="time">${mensagens[i].time}</span> <strong>${mensagens[i].from}</strong> ${mensagens[i].text} </li>
            `
    } else if (mensagens[i].type === "privMastoate_message" && mensagens[i].to === user.name) {
      msg += `
                  <li class="msg-reservada"> <span class="time">${mensagens[i].time}</span>  <strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text} </li>
            `
    }
    else {
      msg += `
                  <li class="msg-normal"> <span class="time">${mensagens[i].time} </span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text} </li>
            `
    }
  }

  lista.innerHTML = msg
}

function processarResposta(resposta) {
  console.log(resposta.data)
  return resposta.data
}

function coletarMensagens() {
  console.log("Chama")
  const promessa = axios.get(`${urlBase}/messages`)
  promessa.then(reposta => renderizarMensagens(reposta.data))
  promessa.catch(resposta => console.log(resposta))

}

function manterUsuarioOnline(user) {
  console.log("verificando online....", user)
  const promessa = axios.post(`${urlBase}/status`, user);
  promessa.then(reposta => console.log(reposta.data))
  promessa.catch(erro => console.log(erro))
}

function enviarMensagem() {
  let msg = document.querySelector("#msg")

  console.log(msg.value)
  //alert("Mensagem enviada com sucesso")

  msg.value = ""
}



realizarLogin()
coletarMensagens()

setInterval(coletarMensagens, 3000)
setInterval(() => manterUsuarioOnline(user), 5000)


























// const input = document.getElementById("msg");
// const button = document.getElementById("btn");

// input.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     button.click();
//   }
// });
