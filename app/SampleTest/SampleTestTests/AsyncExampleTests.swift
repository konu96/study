//
// Created by R0275 on 2020/01/12.
// Copyright (c) 2020 R0275. All rights reserved.
//

import XCTest
@testable import SampleTest

class AsyncExampleTests: XCTestCase {
    func testAsyncString() {
        let expectation = XCTestExpectation(description: "Async String")
        let async = AsyncExample()

        async.asyncString { string in
            XCTAssertEqual(string, "文字列A")
            expectation.fulfill()
        }

        wait(for: [expectation], timeout: 5.0)
    }
}
