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
    this._negociacaoService = new NegociacaoService();
    this._ordemAtual = "";
    this._init();
  }

  _init() {
    this._negociacaoService
      .listar()
      .then(negociacoes => negociacoes.forEach(this._listaNegociacoes.adiciona))
      .catch(erro => (this._mensagem.texto = erro));

    setInterval(() => {
      this.importaNegociacoes();
    }, 3000);
  }

  adiciona(event) {
    event.preventDefault();

    const negociacao = this._criaNegociacao();

    this._negociacaoService
      .cadastrar(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => {
        this._mensagem.texto = erro;
      });
  }

  apaga() {
    this._negociacaoService
      .apagar()
      .then(mensagem => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = mensagem;
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  importaNegociacoes() {
    this._negociacaoService
      .importa(this._listaNegociacoes.negociacoes)
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
