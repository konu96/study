//
//  PasswordValidatorTests.swift
//  SampleTestTests
//
//  Created by R0275 on 2020/01/12.
//  Copyright © 2020 R0275. All rights reserved.
//

import XCTest
@testable import SampleTest

class PasswordValidatorTests: XCTestCase {
    func testパスワードバリデーションの文字数() {
        XCTContext.runActivity(named: "数字が2文字以上含まれている場合") { _ in 
            XCTContext.runActivity(named: "合計7文字が入力された場合") { _ in
                XCTAssertFalse(PasswordValidator.validate(password: "abcde12"))
            }

            XCTContext.runActivity(named: "合計8文字が入力された場合") { _ in
                XCTAssertTrue(PasswordValidator.validate(password: "abcdef12"))
            }

            XCTContext.runActivity(named: "合計9文字が入力された場合") { _ in
                XCTAssertTrue(PasswordValidator.validate(password: "abcdefg12"))
            }
        }
    }
}
