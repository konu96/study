//
//  Counter.swift
//  BddCounter
//
//  Created by kohei-uno on 2020/04/22.
//  Copyright © 2020 R0275. All rights reserved.
//

class Counter {
    private (set) var count: Int
    private let counterStorage: CounterStorage
    
    init(count: Int = 0, counterStorage: CounterStorage = CounterStorageDefaults()) {
        self.count = count
        self.counterStorage = counterStorage
    }
    
    var isLowerLimit: Bool { return count == 0 }
    var isUpperLimit: Bool { return count == 10 }
    
    func increment() {
        count += 1
        counterStorage.save(count)
    }
    
    func decrement() {
        count -= 1
        counterStorage.save(count)
    }
}
