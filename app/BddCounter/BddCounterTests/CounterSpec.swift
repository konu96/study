//
//  CounterSpec.swift
//  BddCounter
//
//  Created by kohei-uno on 2020/04/22.
//  Copyright © 2020 R0275. All rights reserved.
//

import Quick
import Nimble
@testable import BddCounter

class CounterSpec: QuickSpec {
    override func spec() {
        describe("Counter") {
            describe("#init") {
                it("count = 0") {
                    expect(Counter().count).to(equal(0))
                }
                
                it("count = 5") {
                    expect(Counter(count: 5).count).to(equal(5))
                }
            }
            
            describe("#increment or #decrement") {
                var counter: Counter!
                beforeEach {
                    counter = Counter(count: 5)
                }
                
                context("#increment") {
                    it("increment すると 5 から 6 になる") {
                        counter.increment()
                        expect(counter.count).to(equal(6))
                    }
                }
                
                context("#decrement") {
                    it("increment すると 5 から 4 になる") {
                        counter.decrement()
                        expect(counter.count).to(equal(4))
                    }
                }
            }
            
            describe("#isLowerLimit") {
                context("現在値 = 0") {
                    it("returns true") {
                        expect(Counter().isLowerLimit).to(beTrue())
                    }
                }
                
                context("現在値 = 1") {
                    it("returns false") {
                        expect(Counter(count: 1).isLowerLimit).to(beFalse())
                    }
                }
            }
            
            describe("#isUpperLimit") {
                context("現在値 = 9") {
                    it("returns true") {
                        expect(Counter(count: 10).isUpperLimit).to(beTrue())
                    }
                }
                
                context("現在値 = 10") {
                    it("returns false") {
                        expect(Counter(count: 9).isUpperLimit).to(beFalse())
                    }
                }
            }
        }
    }
}
