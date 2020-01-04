"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this._http = new HttpService();
  }

  _createClass(NegociacaoService, [{
    key: "cadastrar",
    value: function cadastrar(negociacao) {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return "Negociação adicionada com sucesso";
      }).catch(function () {
        throw new Error("Não foi possível adicionar a negociação");
      });
    }
  }, {
    key: "listar",
    value: function listar() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listarTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível listar as negociações");
      });
    }
  }, {
    key: "apagar",
    value: function apagar() {
      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.apagar();
      }).then(function () {
        return "Negociações apagadas com sucesso";
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
    }
  }, {
    key: "importa",
    value: function importa(listaAtual) {
      return this.obterNegociacoes().then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !listaAtual.some(function (outra) {
            return negociacao.isEquals(outra);
          });
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error("Não foi possível buscar as negociações para importar");
      });
    }
  }, {
    key: "obterNegociacoes",
    value: function obterNegociacoes() {
      return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
        return negociacoes.reduce(function (arrayAchatado, array) {
          return arrayAchatado.concat(array);
        }, []);
      }).catch(function (erro) {
        throw new Error(erro);
      });
    }
  }, {
    key: "obterNegociacoesDaSemana",
    value: function obterNegociacoesDaSemana() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._http.get("negociacoes/semana").then(function (negociacoes) {
          resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          console.log(erro);
          reject(erro);
        });
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaRetrasada",
    value: function obterNegociacoesDaSemanaRetrasada() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._http.get("negociacoes/retrasada").then(function (negociacoes) {
          resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          console.log(erro);
          reject(erro);
        });
      });
    }
  }, {
    key: "obterNegociacoesDaSemanaAnterior",
    value: function obterNegociacoesDaSemanaAnterior() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._http.get("negociacoes/anterior").then(function (negociacoes) {
          resolve(negociacoes.map(function (objeto) {
            return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          }));
        }).catch(function (erro) {
          console.log(erro);
          reject(erro);
        });
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map