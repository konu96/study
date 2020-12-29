import Quick
import Nimble

@testable import BddCounter

class CounterViewControllerSpec: QuickSpec {
    override func spec() {
        var viewController: CounterViewController!

        beforeEach {
            viewController = CounterViewController.make()
            let window = UIWindow(frame: UIScreen.main.bounds)
            window.rootViewController = viewController
            window.makeKeyAndVisible()
        }

        describe("CounterViewController") {
            describe("初期表示") {
                it("カウントが 0 であること") {
                    expect(viewController.countLabel.text).to(equal("0"))
                }
                
                it("- ボタンが非活性である") {
                    expect(viewController.decrementButton.isEnabled).to(beFalse())
                }
                
                it("+ ボタンが活性である") {
                    expect(viewController.incrementButton.isEnabled).to(beTrue())
                }
            }

            describe("+ ボタンをタップ") {
                context("現在値 = 0") {
                    it("カウンタが 1 増える") {
                        viewController.incrementButton.tap()
                        expect(viewController.countLabel.text).to(equal("1"))
                    }
                    
                    it("下限値でなくなるので、- ボタンが活性である") {
                        viewController.incrementButton.tap()
                        expect(viewController.decrementButton.isEnabled).to(beTrue())
                    }
                }
                
                context("上限値に達した場合") {
                    beforeEach {
                        viewController.incrementButton.tap(repeat: 10)
                    }
                    
                    it("上限値なので + ボタンを非活性になる") {
                        expect(viewController.countLabel.text).to(equal("10"))
                        expect(viewController.incrementButton.isEnabled).to(beFalse())
                    }
                }
            }
            
            describe("- ボタンをタップ") {
                context("現在値 = 1") {
                    beforeEach {
                        viewController.incrementButton.tap()
                    }
                    
                    it("カウンタが 1 減る") {
                        viewController.decrementButton.tap()
                        expect(viewController.countLabel.text).to(equal("0"))
                    }
                    
                    it("下限値になるので、- ボタンが非活性である") {
                        viewController.decrementButton.tap()
                        expect(viewController.decrementButton.isEnabled).to(beFalse())
                    }
                }
                
                context("現在値 = 10") {
                    beforeEach {
                        viewController.incrementButton.tap(repeat: 10)
                        viewController.decrementButton.tap()
                    }
                    
                    it("カウンタが 9 に減ること") {
                        expect(viewController.countLabel.text).to(equal("9"))
                    }
                    
                    it("上限値になるので、+ ボタンが活性である") {
                        expect(viewController.incrementButton.isEnabled).to(beTrue())
                    }
                }
            }
            
            describe("現在地の保存") {
                context("現在値 = 2") {
                    beforeEach {
                        viewController.incrementButton.tap(repeat: 2)
                        UserDefaults.standard.set(0, forKey: "count")
                    }
                    
                    context("+ ボタンをタップ") {
                        it("現在値 = 3 が UserDefaults に保存されること") {
                            viewController.incrementButton.tap()
                            
                            let actual = UserDefaults.standard.integer(forKey: "count")
                            expect(actual).to(equal(3))
                        }
                    }
                    
                    context("- ボタンをタップ") {
                        it("現在値 = 1 が UserDefaults に保存されること") {
                            viewController.decrementButton.tap()
                            
                            let actual = UserDefaults.standard.integer(forKey: "count")
                            expect(actual).to(equal(1))
                        }
                    }
                }
            }
            
            describe("永続化") {
                context("現在値 = 2") {
                    var counter: Counter!
                    var counterStorageMock: CounterStorageMock!
                    
                    beforeEach {
                        counterStorageMock = CounterStorageMock()
                        counter = Counter(count: 2, counterStorage: counterStorageMock)
                    }
                    
                    context("#increment を呼び出す") {
                        it("CounterStorage.save() が引数 3 で呼び出されること") {
                            counter.increment()
                            
                            expect(counterStorageMock.latestSaveCount).to(equal(3))
                        }
                        
                        it("CounterStorage.save() が引数 1 で呼び出されること") {
                            counter.decrement()
                            
                            expect(counterStorageMock.latestSaveCount).to(equal(1))
                        }
                    }
                }
            }
        }
        
    }
}

extension UIButton {
    func tap() {
        self.sendActions(for: .touchUpInside)
    }
    
    func tap(repeat: Int = 1) {
        for _ in 1...`repeat` {
            self.tap()
        }
    }
}
