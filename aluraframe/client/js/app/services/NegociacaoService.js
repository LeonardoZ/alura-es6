class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ]).then(negociacoes => {
        return negociacoes.reduce(
          (arrayAchatado, array) => arrayAchatado.concat(array),
          []
        );
      })
      .catch(erro => {
        throw new Error(erro);
      });
  }

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/semana")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(erro => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/retrasada")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(erro => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/anterior")
        .then(negociacoes => {
          resolve(
            negociacoes.map(
              objeto =>
                new Negociacao(
                  new Date(objeto.data),
                  objeto.quantidade,
                  objeto.valor
                )
            )
          );
        })
        .catch(erro => {
          console.log(erro);
          reject(erro);
        });
    });
  }
}
