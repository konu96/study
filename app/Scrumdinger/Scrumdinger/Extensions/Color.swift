//
//  Color.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/16.
//

import SwiftUI

extension Color {
    static var random: Color {
        return Color(
            red: .random(in: 0...1),
            green: .random(in: 0...1),
            blue: .random(in: 0...1)
        )
    }
}
