const app = document.getElementById("app");

const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
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
