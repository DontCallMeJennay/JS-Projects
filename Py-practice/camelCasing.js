<script>
var str = "A short Test String"

str = str.toLowerCase().split(" ");
var str2 = [str[0]];
for (i=1; i < str.length; i++) {
	var x = str[i].charAt(0).toUpperCase() + str[i].slice(1,str[i].length);
	str2.push(x);
}
str = str2.join("");

alert(str);
</script>
