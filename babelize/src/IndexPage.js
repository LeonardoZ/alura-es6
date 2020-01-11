"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPage = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IndexPage =
/*#__PURE__*/
function () {
  function IndexPage() {
    _classCallCheck(this, IndexPage);

    this._init();
  }

  _createClass(IndexPage, [{
    key: "_init",
    value: function _init() {
      this._inputRef = document.getElementsByName("message");
      this._buttonGoRef = document.getElementById("bt-go");
      this._content = document.getElementById("content");
    }
  }]);

  return IndexPage;
}();

exports.IndexPage = IndexPage;