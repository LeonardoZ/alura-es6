import { currentInstance } from "./controllers/NegociacaoController";

let negociacaoController = currentInstance();
console.log(negociacaoController);
document.querySelector(".form").onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector("[type=button]").onsubmit = negociacaoController.apaga.bind(negociacaoController);