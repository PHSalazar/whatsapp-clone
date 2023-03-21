const inputSearch = document.querySelector('#input-search');
const btnSearch = document.querySelector('#btn-search');
const chats = document.querySelector('#chats');

// Searching Chat
btnSearch.addEventListener('click', () => {
  inputSearch.classList.toggle('show');
  inputSearch.classList.contains('show')
    ? inputSearch.focus()
    : (inputSearch.value = '');
});
const pesquisar = () => {
  // Ocultando mensagens que não são o que foi buscado
  const chats = document.querySelectorAll(
    '.chat-message > .texts > .name-contact',
  );
  chats.forEach((item) => {
    if (
      !item.textContent
        .toLowerCase()
        .startsWith(inputSearch.value.toLowerCase())
    ) {
      item.parentNode.parentNode.classList.add('hide');
    } else {
      item.parentNode.parentNode.classList.remove('hide');
    }
  });
};
inputSearch.addEventListener('keyup', pesquisar);

// Carregar lista de conversas
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

const getMessages = () => {
  appInfo.map((item) => {
    // Verificar se a data da mensagem é a mesma que a atual (HOJE), caso não seja, mostrar a data na tela de CHATS. Caso seja a mesma, mostrar somente a HORA.
    const data = new Date();
    const time =
      item.mensagens[item.mensagens.length - 1].time.split(' ')[0] ==
      data.toLocaleDateString()
        ? item.mensagens[item.mensagens.length - 1].time
            .split(' ')[1]
            .substring(0, 5)
        : item.mensagens[item.mensagens.length - 1].time.split(' ')[0];
    // Criando chatMessage
    createChat(
      item.photoProfile, // DEFININDO IMAGEM
      item.contact, // NOME DO CONTATO QUE FOI ENVIADA A MENSAGEM
      item.mensagens[item.mensagens.length - 1].text, //item.mensagens[0].text, // ULTIMA MENSAGEM ENVIADA
      time, //HORA OU DATA
      item.mensagens[item.mensagens.length - 1].sent, // MENSAGEM ENVIADA OU RECEBIDA
    );
  });
};
getMessages();

function createChat(img, contact, message, time, sent) {
  let divChat = document.createElement('div');
  divChat.classList.add('chat-message');
  const imgChat = document.createElement('img');
  imgChat.classList.add('img-profile-contact');
  imgChat.src = img;
  const divTexts = document.createElement('div');
  divTexts.classList.add('texts');
  const nameContact = document.createElement('span');
  nameContact.classList.add('name-contact');
  nameContact.textContent = contact;
  const subTextMessage = document.createElement('span');
  subTextMessage.classList.add('subtext-message');
  sent == 1 && subTextMessage.classList.add('sent');
  subTextMessage.textContent = message;
  const spanTime = document.createElement('span');
  spanTime.classList.add('time');
  spanTime.textContent = time;

  divChat.appendChild(imgChat);
  divChat.appendChild(divTexts);
  divTexts.appendChild(nameContact);
  divTexts.appendChild(subTextMessage);
  divChat.appendChild(spanTime);

  chats.appendChild(divChat);

  divChat.addEventListener('click', () => {
    window.location = `./chat.html?chat=${contact}`;
  });
}
