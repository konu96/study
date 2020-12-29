//enum class Color {
//    RED, ORANGE, YELLOW, GREEN, BLUE
//}

enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255, 0, 0),
    ORANGE(255, 165, 0),
    YELLOW(255, 255, 0),
    GREEN(0, 255, 0),
    BLUE(0, 0, 255);

    fun rgb() = (r * 256 + g) * 256 + b
}

fun getMnemonic(color: Color) =
    when(color) {
        Color.RED -> "Richard"
        Color.ORANGE -> "Of"
        Color.YELLOW -> "York"
        Color.GREEN -> "Gave"
        Color.BLUE -> "Battle"
    }

fun mixColor(color1: Color, color2: Color) =
    when(setOf(color1, color2)) {
        setOf(Color.RED, Color.YELLOW) -> Color.ORANGE
        setOf(Color.BLUE, Color.YELLOW) -> Color.GREEN
        else -> throw Exception("Dirty Color")
    }

fun mixColorOptimized(color1: Color, color2: Color) =
    when {
        (color1 == Color.RED && color2 == Color.YELLOW) ||
        (color1 == Color.YELLOW && color2 == Color.RED)
        -> Color.ORANGE

        (color1 == Color.BLUE && color2 == Color.YELLOW) ||
        (color1 == Color.YELLOW && color2 == Color.BLUE)
        -> Color.GREEN
    }

fun main(args: Array<String>) {
    println(Color.BLUE.rgb())
    println(getMnemonic(Color.ORANGE))
    println(mixColor(Color.RED, Color.YELLOW))
}
