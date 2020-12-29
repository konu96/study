//
//  CounterStorageMock.swift
//  BddCounter
//
//  Created by kohei-uno on 2020/04/22.
//  Copyright © 2020 R0275. All rights reserved.
//

class CounterStorageMock: CounterStorage {
    var latestSaveCount: Int?
    
    func save(_ count: Int) {
        latestSaveCount = count
    }
}

