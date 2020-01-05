"use strict";

System.register(["./controllers/NegociacaoController"], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();

      console.log(negociacaoController);
      document.querySelector(".form").onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector("[type=button]").onsubmit = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map