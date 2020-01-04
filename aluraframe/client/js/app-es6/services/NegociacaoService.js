class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  cadastrar(negociacao) {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => "Negociação adicionada com sucesso")
      .catch(() => {
        throw new Error("Não foi possível adicionar a negociação");
      });
  }

  listar() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listarTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error("Não foi possível listar as negociações");
      });
  }

  apagar() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagar())
      .then(() => "Negociações apagadas com sucesso")
      .catch(erro => {
        console.log(erro);
        throw new Error("Não foi possível apagar as negociações");
      });
  }

  importa(listaAtual) {
     return this.obterNegociacoes()
       .then(negociacoes =>
         negociacoes.filter(
           negociacao =>
             !listaAtual.some(outra => negociacao.isEquals(outra))
         )
       )
       .catch(erro => {
         console.log(erro);
         throw new Error("Não foi possível buscar as negociações para importar");
       });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(negociacoes => {
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
