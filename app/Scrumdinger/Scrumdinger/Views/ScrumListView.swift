//
//  ScrumsView.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/15.
//

import SwiftUI

struct ScrumListView: View {
    let scrums: [DailyScrum]

    var body: some View {
        List(scrums, id: \.title) {
            CardView(scrum: $0).listRowBackground($0.color)
        }
    }
}

struct ScrumsView_Previews: PreviewProvider {
    static var previews: some View {
        ScrumListView(scrums: DailyScrum.data)
    }
}
