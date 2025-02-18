const app = document.getElementById("app");

//array de objetos
const users = [
  {
    email: "teste@teste.com",
    phone: "999999999",
    ref: 100,
    refBy: null,
  },
  {
    email: "tust@tust.com",
    phone: "999999999",
    ref: 200,
    refBy: 100,
  },
  {
    email: "tost@tost.com",
    phone: "999999999",
    ref: 300,
    refBy: 200,
  },
];

const getUser = (userData) => {
  //procura no array(find) o user se tem o email igual ao que foi passado
  return users.find((user) => {
    return user.email == userData.email;
  });
};

//pega o total de inscritos
const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    //filtra os que têm o refBy igual ao ref
    return user.refBy == userData.ref;
  });
  //retorna o tamanho do array
  return subs.length;
};

//Mostra a tela de convite
const showInvite = (userData) => {
  app.innerHTML = `
     <input type="text" id="link" value="https://evento.com?ref=${
       userData.ref
     }" disabled>

    <div id="stats">
        <h4>
            ${getTotalSubscribers(userData)}
        </h4>
        <p>
            Inscrições feitas!
        </p>
    </div>
    `;
};

//salva o novo usuário
const saveUser = (userData) => {
  const newUser = {
    //espalha os dados do newUser e adiciona no array
    ...userData,
    //gera um número aleatório
    ref: Math.round(Math.random() * 4000),
    refBy: 100,
  };
  //adiciona o novo usuário no array
  users.push(newUser);
  console.log(users);
  return newUser;
};

const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();

    //pega os dados dos campos do formulário
    const formData = new FormData(form);
    //transformar os dados em um objeto
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    //pega o usuário do array, quando esse já estiver no array, se não existir retorna undefined
    const user = getUser(userData);

    if (user) {
      //se existe o usuário no array, mostra a tela de convite
      showInvite(user);
    } else {
      //se não existe o usuário - cadastrar o usuário
      const newUser = saveUser(userData);
      //mostra a tela de convite do novo usuário
      showInvite(newUser);
    }
  };
};

const startApp = () => {
  const content = `
    <form id="form">
        <input type="email" name="email" placeholder="E-mail">
        <input type="text" name="phone" placeholder="Telefone">
        <button>
            Confirmar
        </button>
    </form>
    `;
  //atribuir o conteúdo do html para o app
  app.innerHTML = content;

  //impede o envio do formulário
  formAction();
};

startApp();
