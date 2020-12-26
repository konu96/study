fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}

// 上記同じ意味のコード
fun maxAlternative(a: Int, b: Int): Int = if (a > b) a else b

fun stringTemplate() {
    val str = "文字列テンプレート"
    println("$str")
}

fun main(args: Array<String>) {
    println(max(1, 2))
    println(stringTemplate())
}
