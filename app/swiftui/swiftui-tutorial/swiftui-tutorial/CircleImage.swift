//
//  CircleImage.swift
//  Swiftui_tutorialApp
//
//  Created by kohei-uno on 2021/01/14.
//

import SwiftUI

struct CircleImage: View {
    var body: some View {
        Image("20171030025557")
            .clipShape(Circle())
            .overlay(Circle().stroke(Color.white, lineWidth: 2))
            .shadow(radius: 7)
    }
}

struct CircleImage_Previews: PreviewProvider {
    static var previews: some View {
        CircleImage()
    }
}
