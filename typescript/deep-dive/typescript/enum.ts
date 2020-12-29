enum Tristate {
    False,
    True,
    Unknown
}
console.log(Tristate[0]);
console.log(Tristate[1]);
console.log(Tristate[2]);
console.log(Tristate[3]);
console.log(Tristate["False"]);
console.log(Tristate[Tristate.False]);
