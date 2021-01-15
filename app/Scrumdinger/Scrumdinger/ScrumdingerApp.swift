//
//  ScrumdingerApp.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/15.
//

import SwiftUI

@main
struct ScrumdingerApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationView {
                ScrumListView(scrums: DailyScrum.data)
            }
        }
    }
}
