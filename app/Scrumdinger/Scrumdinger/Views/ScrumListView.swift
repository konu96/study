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
        // List と ForEach の違い https://qiita.com/tsuzuki817/items/03989e1824916864d32b
        List {
            ForEach(scrums) { scrum in
                NavigationLink(destination: DetailView(scrum: scrum)) {
                    CardView(scrum: scrum)
                }
                .listRowBackground(scrum.color)
            }
        }
        .navigationTitle("Daily Scrum")
        .navigationBarItems(trailing: Button(action: {}) {
            Image(systemName: "plus")
        })
    }
}

struct ScrumsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ScrumListView(scrums: DailyScrum.data)
        }
    }
}
