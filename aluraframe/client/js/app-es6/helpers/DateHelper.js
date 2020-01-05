export class DateHelper {
  constructor() {
    throw new Error("DateHelper não pode ser instanciada");
  }

  static textoParaData(texto) {
    if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
      throw new Error("Deve ser no formato yyyy-mm-dd");
    }
    let valores = texto.split("-").map((item, indice) => item - (indice % 2));
    return new Date(...valores);
  }

  static dataParaTexto(data) {
    return `${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear()}`;
  }
}
