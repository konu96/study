import UIKit

enum MyError: Error {
    case InValidValue
}

func doubleUp(value: Int) throws -> Int {
    if value < 0 {
        throw MyError.InValidValue
    }
    
    return value * 2
}

do {
    let doubleResultValue = try doubleUp(value: 10)
    print(doubleResultValue)
} catch MyError.InValidValue {
    print("Error")
}

var radio = UISwitch()
radio.isOn = true

for i in 0..<9 {
    print(i)
}

let values = ["りんご", "ゴリラ", "ラッパ"]
for (index, value) in values.enumerated() {
    print("\(index): \(value)")
}

let results = values.filter{ (value: String) -> Bool in
    if value == "" {
        return true
    }
    return false
}

print(results)

for value in 0...5 where value != 3 {
    print(value)
}

enum Fruit {
    case Apple, Orange
}

let fruits: [Fruit] = [ .Apple, .Orange, .Apple ]
for case .Apple in fruits {
    print("Apple")
}
