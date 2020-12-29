//
// Created by kohei-uno on 2020/04/21.
// Copyright (c) 2020 R0275. All rights reserved.
//

import XCTest
@testable import BddCounter

class CounterViewControllerTests: XCTestCase {
    func testIncrementButton() {
        let viewController = CounterViewController.make()
        let window = UIWindow(frame: UIScreen.main.bounds)
        window.rootViewController = viewController
        window.makeKeyAndVisible()

        XCTAssertEqual(viewController.countLabel.text, "0")
        viewController.incrementButton.sendActions(for: .touchUpInside)
        XCTAssertEqual(viewController.countLabel.text, "1")
    }
}