class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($("#negociacoes-view")),
      "adiciona",
      "esvazia",
      "ordena",
      "inverteOrdem"
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($("#mensagem-view")),
      "texto"
    );
    this._ordemAtual = "";

    ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listarTodos())
      .then(negociacoes => negociacoes.forEach(this._listaNegociacoes.adiciona))
      .catch(erro => (this._mensagem.texto = erro));
  }

  adiciona(event) {
    event.preventDefault();

    ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(this._criaNegociacao()))
      .then(negociacao => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._limpaFormulario();
      })
      .catch(erro => {
        console.log(erro)
        this._mensagem.texto = erro;
      });
  }

  apaga() {
    ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagar())
      .then(mensagem => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = mensagem;
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  importaNegociacoes() {
    let service = new NegociacaoService();
    service
      .obterNegociacoes()
      .then(negociacoes => {
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.texto = "Negociacão importada com sucesso.";
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  ordena(coluna) {
    this._listaNegociacoes.orde1na((a, b) => a[coluna] - b[coluna]);
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}
