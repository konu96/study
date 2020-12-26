//
//  PasswordValidator.swift
//  SampleTest
//
//  Created by R0275 on 2020/01/12.
//  Copyright © 2020 R0275. All rights reserved.
//

import Foundation

open class PasswordValidator {
    static func validate(password: String) -> Bool {
        if password.count <= 7 {
            return false
        }
    
        let numberString = password.components(separatedBy: CharacterSet.decimalDigits.inverted).joined()
        return numberString.count >= 2
    }
}
