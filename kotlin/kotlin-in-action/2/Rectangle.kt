class Rectangle(val height: Int, val width: Int) {
    // custom accessor
    val isSquare: Boolean
        get() {
            return this.height == this.width
        }
}
