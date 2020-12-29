fun main(args: Array<String>) {
    val binaryReps = sortedMapOf<Char, String>()

    for (c in 'A'..'F') {
        binaryReps[c] = Integer.toBinaryString(c.toInt())
    }

    for ((letter, binary) in binaryReps) {
        println("$letter = $binary")
    }
}
