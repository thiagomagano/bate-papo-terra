
axios.defaults.headers.common['Authorization'] = 'fzO7nn1WvKTIVnFrK8kOlhlC';

const urlBase = "https://mock-api.driven.com.br/api/vm/uol"

const user = {}

function realizarLogin() {
  let nome = prompt("Digite seu lindo nome para logar: ")
  user.name = nome;

  if (user.name !== undefined) {
    const promessa = axios.post(`${urlBase}/participants`, user);
    promessa.then(() => {
      console.log(user.name + " logado com sucesso")
      coletarMensagens()
      setInterval(coletarMensagens, 3000)
      setInterval(() => manterUsuarioOnline(user), 5000)
    });
    promessa.catch(() => {
      user.name = prompt("Nome já utilizado, por favor tente outro: ")
      realizarLogin();
    });
  }
  else {
    alert("Nome Invalido, tente novamente");
    realizarLogin();
  }

}

function renderizarMensagens(mensagens) {
  console.log("Renderizando novas mensagens..")
  const lista = document.querySelector(".lista-de-msgs")
  lista.innerHTML = ""
  let msg = ''
  for (const mensagem of mensagens) {
    if (mensagem.type === "status") {
      msg += `
                  <li class="msg-status" data-test="message"> <span class="time">${mensagem.time}</span> <strong>${mensagem.from}</strong> ${mensagem.text} </li>
            `
    } else if (mensagem.type === "private_message" && mensagem.to === user.name) {
      msg += `
                  <li class="msg-reservada" data-test="message"> <span class="time">${mensagem.time}</span>  <strong>${mensagem.from}</strong> reservadamente para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>
            `
    }
    else {
      msg += `
                  <li class="msg-normal" data-test="message"> <span class="time">${mensagem.time} </span> <strong>${mensagem.from}</strong> para <strong>${mensagem.to}</strong>: ${mensagem.text} </li>
            `
    }
  }
  lista.innerHTML = msg
}

function coletarMensagens() {
  const promessa = axios.get(`${urlBase}/messages`)
  promessa.then(reposta => renderizarMensagens(reposta.data))
  promessa.catch(resposta => console.log(resposta))

}

function manterUsuarioOnline(user) {
  const promessa = axios.post(`${urlBase}/status`, user);
  promessa.then(reposta => console.log(user.name + " Segue Online"))
  promessa.catch(erro => console.log(erro))
}

function enviarMensagem() {
  let msg = document.querySelector("#msg")


  const objMsg = {
    from: user.name,
    to: "Todos",
    text: msg.value,
    type: "message"
  }

  const promessa = axios.post(`${urlBase}/messages`, objMsg)
  promessa.then(reposta => console.log("Mensagem Enviada", reposta))
  promessa.catch(resposta => {
    console.log("Erro ao enviar", resposta)
    window.location.reload()
  })

  coletarMensagens();
  msg.value = ""
}


realizarLogin()




const input = document.getElementById("msg");
const button = document.getElementById("btn");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
