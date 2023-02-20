function menu(navesc) {
  let menuescolha = navesc;
  let verescolha;
  switch (menuescolha) {
    case 1:
      verescolha = "./parts/Cadastrar.ejs";
      return verescolha;

  }

}

module.exports = {
  menu: menu
};