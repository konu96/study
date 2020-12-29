//
// Created by R0275 on 2020/01/12.
// Copyright (c) 2020 R0275. All rights reserved.
//

import Foundation

class AsyncExample {
    func asyncString(completion: ((String) -> ())?) {
        DispatchQueue.global().async {
            sleep(3)

            completion?("文字列A")
        }
    }
}