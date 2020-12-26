fun String.lastChar(): Char = this.get(this.length - 1)

fun main(args: Array<String>) {
  val sampleString = "abcdefg"

  println(sampleString.lastChar())
}
