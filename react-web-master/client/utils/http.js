
export default class http {
  static str = "http class.";
  num1;
  num2;
  
  constructor (num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }

  plus() {
    return this.num1 + this.num2;
  }

  superPlus() {
    return this.num1 * this.num2;
  }

  de() {
    return this.num1 - this.num2;
  }

  superDe() {
    try {
      return this.num1 / this.num2;
    } catch(err) {console.log(err);}
  }
}