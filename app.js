const form = document.getElementById("form-content");
const listStudent = document.querySelector("#list-student");

function renderList(doc) {
  let li = document.createElement("li");
  let cod_aluno = document.createElement("span");
  let nome = document.createElement("span");
  let cpf = document.createElement("span");
  let rg = document.createElement("span");
  let telefone_aluno = document.createElement("span");
  let telefone_responsavel = document.createElement("span");
  let email = document.createElement("span");
  let data_nascimento = document.createElement("span");
  let excluir = document.createElement("div");

  // Atribuindo atributos de identificação e conteúdo para cada elemento
  li.setAttribute("data-id", doc.cod_aluno);
  cod_aluno.textContent = `Código: ${doc.cod_aluno}`;
  nome.textContent = `Nome: ${doc.nome}`;
  cpf.textContent = `CPF: ${doc.cpf}`;
  rg.textContent = `RG: ${doc.rg}`;
  telefone_aluno.textContent = `Telefone do Aluno: ${doc.telefone_aluno}`;
  telefone_responsavel.textContent = `Telefone do Responsável: ${doc.telefone_responsavel}`;
  email.textContent = `Email: ${doc.email}`;
  data_nascimento.textContent = `Data de Nascimento: ${doc.data_nascimento}`;
  excluir.textContent = "Excluir";

  // Adicionando os elementos ao 'li'
  li.appendChild(cod_aluno);
  li.appendChild(nome);
  li.appendChild(cpf);
  li.appendChild(rg);
  li.appendChild(telefone_aluno);
  li.appendChild(telefone_responsavel);
  li.appendChild(email);
  li.appendChild(data_nascimento);
  li.appendChild(excluir);

  // Adicionando o 'li' na lista
  listStudent.appendChild(li);
}

const listInputs = [
  { reference: "cod_aluno", title: "ID Aluno" },
  { reference: "nome", title: "Nome Completo" },
  { reference: "cpf", title: "CPF" },
  { reference: "rg", title: "RG" },
  { reference: "telefone_aluno", title: "Telefone" },
  { reference: "telefone_responsavel", title: "Telefone do responsavel" },
  { reference: "email", title: "E-mail" },
  { reference: "data_nascimento", title: "Data de Nascimento" },
];

const renderForm = () => {
  listInputs.map((item) => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    div.classList.add("content-form");

    label.setAttribute("for", item.reference);
    label.textContent = item.title;

    input.setAttribute("type", "text");
    input.setAttribute("name", item.reference);
    input.setAttribute("id", item.reference);

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);
  });
};

db.collection("students-collection")
  .get()
  .then((snapshot) => {
    console.log("TESTE: ", snapshot.docs)
    snapshot.docs.forEach((doc) => {
      console.log(doc.id);
      renderList(doc.data())
    })
  })
  .catch(error => {
    console.log(error.message)
  })

const forms = document.querySelector("#form-student")

forms.addEventListener("submit", (event) => {
  event.preventDefault();
  
  db.collection("students-collection")
    .add({
      cod_aluno: forms.cod_aluno.value,
      nome: forms.nome.value,
      cpf: forms.cpf.value,
      rg: forms.rg.value,
      telefone_aluno: forms.telefone_aluno.value,
      telefone_responsavel: forms.telefone_responsavel.value,
      email: forms.email.value,
      data_nascimento: forms.data_nascimento.value
    })
    .then(() => {
      // Zera todos os campos do formulário
      forms.cod_aluno.value = "";
      forms.nome.value = "";
      forms.cpf.value = "";
      forms.rg.value = "";
      forms.telefone_aluno.value = "";
      forms.telefone_responsavel.value = "";
      forms.email.value = "";
      forms.data_nascimento.value = "";

      // Opcionalmente, recarrega a página
      window.location.reload();
    })
});


renderForm();
