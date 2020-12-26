interface Focusable {
  fun setFocus(flag: Boolean) = println("I ${if (flag) "got" else "lost"} focus.")
  fun showOff() = println("I'm focusable!!")
}
