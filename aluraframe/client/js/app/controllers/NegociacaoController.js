class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    let self = this;
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
      get(target, prop, receiver) {
        if (
          ["adiciona", "esvazia"].includes(prop) &&
          typeof (target[prop] == typeof Function)
        ) {
          return function() {
            console.log("asdasd");
            Reflect.apply(target[prop], target, arguments);
            self._negociacoesView.update(target);
          };
        } 
        return Reflect.get(target, prop, receiver);
      }
    });
    /*
    this._listaNegociacoes = new ListaNegociacoes(model =>
      this._negociacoesView.update(model)
    );
    */
    this._negociacoesView = new NegociacoesView($("#negociacoes-view"));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($("#mensagem-view"));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();
    this._listaNegociacoes.adiciona(negociacao);

    this._mensagem.texto = "Negociação adicionada com sucesso";
    this._mensagemView.update(this._mensagem);

    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();

    this._mensagem.texto = "Negociação apagadas com sucesso";
    this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}
