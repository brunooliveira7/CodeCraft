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
    email: "teste2@teste.com",
    phone: "999999999",
    ref: 200,
    refBy: 100,
  },
];

const getUser = (userData) => {
  //procura no array(find) o user se tem o email igual ao que foi passado
  return users.find((user) => {
    return user.email == userData.email;
  });
};

//Mostra a tela de convite
const showInvite = (userData) => {
  app.innerHTML = `
     <input type="text" id="link" value="https://evento.com" disabled>

    <div id="stats">
        <h4>
           80
        </h4>
        <p>
            Inscrições feitas!
        </p>
    </div>
    `;
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

    //pega o usuário do array, quando esse existir, se não existir retorna undefined
    const user = getUser(userData);

    if (user) {
      //existe o usuário
      showInvite(user);
    } else {
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
