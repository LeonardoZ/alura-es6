export class IndexPage {
  constructor() {
    this._init();
  }

  _init() {
    this._inputRef = document.getElementsByName("message");
    this._buttonGoRef = document.getElementById("bt-go");
    this._content = document.getElementById("content");
  }
}
