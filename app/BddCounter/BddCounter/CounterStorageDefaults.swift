//
//  CounterStorageDefaults.swift
//  BddCounter
//
//  Created by kohei-uno on 2020/04/22.
//  Copyright © 2020 R0275. All rights reserved.
//

import UIKit

class CounterStorageDefaults: CounterStorage {
    func save(_ count: Int) {
        UserDefaults.standard.set(count, forKey: "count")
    }
}
