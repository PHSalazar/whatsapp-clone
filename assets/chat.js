const btnBack = document.getElementById('btn-back');
const chat = document.getElementById('chat');
const imgProfile = document.getElementById('img-profile');
const nameLabel = document.getElementById('name-contact');
const statusContact = document.querySelector('.status');
const txtMessage = document.getElementById('textarea-message');
const btnSend = document.getElementById('btn-send');

let nameContact = '';

const getChat = () => {
  let chatUri = window.location.search;
  const params = new URLSearchParams(chatUri);
  nameContact = params.get('chat');

  nameLabel.textContent = nameContact;
};

window.addEventListener('DOMContentLoaded', getChat());

// Botão VOLTAR
btnBack.addEventListener('click', () => {
  window.location = './index.html';
});

// Array de mensagens
let appInfo = JSON.parse(localStorage.getItem('appInfo')) || [
  {
    contact: 'Robert',
    photoProfile: './assets/users/user1.png',
    mensagens: [
      {
        text: 'Olá! Este é um pequeno projeto onde simula um Clone do WhatsApp.<br><br>Nesse projeto, as mensagens ficam salvas no seu localstorage. Obrigado por testar!',
        time: '01/03/2023 10:26',
        sent: 0,
      },
    ],
  },
  {
    contact: 'Contato 2',
    photoProfile: './assets/users/user2.png',
    mensagens: [
      {
        text: 'Oi.',
        time: '05/03/2023 10:26',
        sent: 1,
      },
    ],
  },
];
// Carregar mensagens
const getMessages = () => {
  let lastDate = '';

  if (appInfo != null) {
    chat.innerHTML = '';

    appInfo.forEach((item, index) => {
      if (item.contact == nameLabel.textContent) {
        //Definindo imagem de perfil
        imgProfile.src = item.photoProfile;

        //Mostrando mensagens
        item.mensagens.forEach((mensagem) => {
          const divMsg = document.createElement('div');

          const divMensagem = document.createElement('p');
          divMensagem.classList.add('msg');
          mensagem.sent == 1
            ? divMsg.classList.add('sent')
            : divMsg.classList.add('received');
          divMensagem.innerHTML = mensagem.text.replaceAll('\n', '<br>');

          const spanTime = document.createElement('span');
          spanTime.classList.add('time');
          let time = mensagem.time.split(' ');
          spanTime.textContent = time[1].substring(0, 5);

          //Escrever ultima data
          if (time[0] != lastDate) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date-span');
            lastDate = time[0];
            //Verificando se a ultima mensagem é de HOJE
            let dateHOJE = new Date();
            let hoje = dateHOJE.toLocaleDateString();

            time[0] == hoje
              ? (dateDiv.textContent = 'HOJE')
              : (dateDiv.textContent = time[0]);

            //Adicionando ao chat
            chat.appendChild(dateDiv);
          }

          divMsg.appendChild(divMensagem);
          divMsg.appendChild(spanTime);
          chat.appendChild(divMsg);
        });
      }
    });

    document.querySelector('#chat > div:last-child').scrollIntoView(); //Mostrando a ultima mensagem
  }
};
getMessages();

// Botão ENVIAR
btnSend.addEventListener('click', () => {
  appInfo.forEach((item, index) => {
    if (item.contact == nameLabel.textContent) {
      // Incluindo mensagem na ARRAY
      appInfo[index].mensagens.push({
        text: txtMessage.value,
        time: getDate(),
        sent: 1,
      });

      //Restaurando campos
      txtMessage.value = '';

      //Salvar mensagens no LocalStorage
      localStorage.setItem('appInfo', JSON.stringify(appInfo));

      //Recarregar mensagens
      getMessages();

      //Receber resposta depois de 1 segundo
      statusContact.textContent = 'Digitando...';
      setTimeout(() => {
        receiveMessage();
      }, 1000);
    }
  });
});

// Receber mensagem
function receiveMessage() {
  const mensagens = [
    'Hum, entendi. Por enquanto não sou tão inteligente ao ponto de te responder certo. Desculpe.',
    'Legal! Como posso te ajudar?',
    'Salvei aqui tudo o que você me disse.',
    ':)',
    'Não entendi o que você disse.',
    'Tchau!',
  ];

  appInfo.forEach((item, index) => {
    let msgResposta = mensagens[parseInt(Math.random() * mensagens.length)];

    if (item.contact == nameLabel.textContent) {
      // Incluindo mensagem na ARRAY
      appInfo[index].mensagens.push({
        text: msgResposta,
        time: getDate(),
        sent: 0,
      });

      //Salvar mensagens no LocalStorage
      localStorage.setItem('appInfo', JSON.stringify(appInfo));

      //Recarregar mensagens
      getMessages();

      //Mudando status
      statusContact.textContent = 'Online';
    }
  });
}

function getDate() {
  let date = new Date();
  let dataFinal = date.toLocaleString();
  return dataFinal;
}

// autoResize textarea message
function autoResize(elem) {
  elem.style.height = '1px';
  elem.style.height = elem.scrollHeight + 'px';

  console.log(elem.scrollHeight);
}
