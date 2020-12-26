import UIKit

var str = "Hello, playground"

print(str)
print(2020)

let PI = 3.14159

var radis = 3
var area = 3 * 3 * PI

print(area)

print(type(of: str))
print(type(of: PI))
print(type(of: area))

var num1 = 2
var num2: Int? = 3

print(num1 + num2!)

var x = 0

repeat {
    print(x)
    x += 1
} while x < 10

var fruits = ["a": 1, "b": 2]
fruits.removeValue(forKey: "a")

var numbers = [2, 4, 6, 8]

print(numbers.allSatisfy {$0 % 2 == 0})

func getTriangleArea(base: Double, height: Double) -> Double {
    return base * height / 2.0
}

print(getTriangleArea(base: 3, height: 2))


func getTriangleArea2(_ base: Double, _ height: Double) -> Double {
    return base * height / 2.0
}

print(getTriangleArea2(3, 2))


class Employee1 {
    var _age = 18
    
    var age: Int {
        get {
            return _age
        }
        set {
            if newValue < 18 {
                _age = 18
            } else {
                _age = newValue
            }
        }
    }
}

var employee1 = Employee1()
employee1.age = 5
print(employee1.age)


class Employee2 {
    init(age: Int) {
        self.age = age
    }
    
    var age: Int = 0 {
        willSet {
            print("\(self.age)に\(newValue)を代入します")
        }
        didSet {
            print("\(oldValue)から\(self.age)に変更されました")
        }
    }
}

var employee2 = Employee2(age: 20)
employee2.age = 56
print(employee2.age)
