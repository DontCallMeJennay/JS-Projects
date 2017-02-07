function convert(num) {
  var n = num;
  var lArr = ["/V", "M", "D", "C", "L", "X", "V", "I"];
  var nArr = [5000, 1000, 500, 100, 50, 10, 5, 1];
  var vArr = [4999, 999, 499, 99, 49, 9, 4, 0];
  var numeral = [];
  
  for (i=0; i < nArr.length; i++) {
    while (n > vArr[i]) {
      numeral.push(lArr[i]);
      n-= nArr[i];
    }
  }
  numeral = numeral.join("");
  numeral = numeral.replace("DDDD", "DM");
  numeral = numeral.replace("DCCCC", "CM");
  numeral = numeral.replace("CCCC", "DC"); 
  numeral = numeral.replace("LXXXX", "XC"); 
  numeral = numeral.replace("XXXX", "XL"); 
  numeral = numeral.replace("VIIII", "IX"); 
  numeral = numeral.replace("IIII", "IV"); 
 return numeral;
}

convert(3999);
