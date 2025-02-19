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

//retornar o usuário do array - cria o user
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

//mostra a segunda tela - convite
const showInvite = (userData) => {
  app.innerHTML = `
       <main>
          <h3>Inscrição confirmada!</h3>
          <p>
            Convide mais pessoas e concorra a prêmios! <br />
            Compartilhe o link e acompanhe as inscrições:
          </p>

          <div class="input-group">
            <label for="link"></label>
            <img src="link.svg" alt="Link icon" />
            <input
              type="text"
              id="link"
              value="https://evento.com?ref=${userData.ref}"
              disabled
            />
          </div>
        </main>

        <section class="stats">
          <h4>${getTotalSubscribers(userData)}</h4>
          <p>Inscrições feitas</p>
        </section>

        <footer>
          <button>
            Voltar ao início
            <img src="arrow.svg" alt="Arrow right" />
          </button>
        </footer>
    
    `;

  //adiciona a classe invite
  app.setAttribute("class", "page-invite");

  //carrega as imagens da segunda tela
  updateImageLinks();
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

    //capta os dados dos campos do formulário
    const formData = new FormData(form);
    //formData tem que ser transformado em um objeto - para usar os dados do formulário
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    //getUser retorna o usuário do array, quando esse já estiver no array, se não existir retorna undefined
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

//carregar todas as imagens
const updateImageLinks = () => {
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  });
};

//carrega a primeira tela com o formulário
const startApp = () => {
  const content = `
    <main>
        <section class="about">
          <div class="section-header">
            <h2>Sobre o evento</h2>
            <span class="badge"> AO VIVO </span>
          </div>
          <p>
            Um evento feito por e para pessoas desenvolvedoras apaixonadas por
            criar soluções inovadoras e compartilhar conhecimento. Vamos
            mergulhar nas tendências mais recentes em desenvolvimento de
            software, arquitetura de sistemas e tecnologias emergentes, com
            palestras, workshops e hackathons. <br />
            <br />Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
          </p>
        </section>
        <section class="registration">
          <h2>Inscrição</h2>

          <form id="form">
            <div class="input-wrapper">
              <div class="input-group">
                <label for="email">
                  <img src="mail.svg" alt="E-mail icon" />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                />
              </div>

              <div class="input-group">
                <label for="phone">
                  <img src="phone.svg" alt="Phone icon" />
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Telefone"
                />
              </div>
            </div>

            <button>
              Confirmar
              <img src="arrow.svg" alt="Arrow right" />
            </button>
          </form>
        </section>
      </main>
    `;
  //atribuir o conteúdo do html para o app
  app.innerHTML = content;

  //adiciona a classe start
  app.setAttribute("class", "page-start");

  //carrega as imagens
  updateImageLinks();

  //impede o envio do formulário
  formAction();
};

startApp();
//showInvite({
//  email: "email@email.com",
//  phone: "999999999",
//  ref: 100,
//});

//quando clicar no logo e no voltar, inicia o app novamente
document.querySelector("header").onclick = () => startApp();
document.querySelector("footer").onclick = () => startApp();
