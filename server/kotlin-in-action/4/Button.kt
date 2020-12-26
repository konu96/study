class Button: Clickable, Focusable {
  override fun click() = println("I was clicked.")

  override fun showOff() {
    super<Clickable>.showOff()
    super<Focusable>.showOff()
  }
}

fun main(args: Array<String>) {
  val button = Button()

  button.click()
  button.showOff()
}
