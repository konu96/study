interface Expression

class Num(val value: Int): Expression

class Sum(val left: Expression, val right: Expression): Expression

fun eval(expression: Expression): Int {
    if (expression is Num) {
        // Explicit cast
        val number = expression as Num
        return number.value
    }

    if (expression is Sum) {
        // Smart cast
        return eval(expression.left) + eval(expression.right)
    }

    throw IllegalArgumentException("Unknown expression")
}

fun evalAlnatertive(expression: Expression): Int =
    when (expression) {
        is Num -> expression.value
        is Sum -> eval(expression.left) + eval(expression.right)
        else -> throw IllegalArgumentException("Unknown expression")
    }

fun main(args: Array<String>) {
    println(eval(Sum(Sum(Num(1), Num(2)), Num(4))))
}
