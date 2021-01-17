//
//  ScrumsView.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/15.
//

import SwiftUI

struct ScrumListView: View {
    @Binding var scrums: [DailyScrum]
    @State private var isPresented = false
    @State private var newScrumData = DailyScrum.Data()
    @Environment(\.scenePhase) private var scenePhase
    let saveAction: () -> Void

    var body: some View {
        // List と ForEach の違い https://qiita.com/tsuzuki817/items/03989e1824916864d32b
        List {
            ForEach(scrums) { scrum in
                NavigationLink(destination: DetailView(scrum: biding(for: scrum))) {
                    CardView(scrum: scrum)
                }
                .listRowBackground(scrum.color)
            }
        }
        .navigationTitle("Daily Scrum")
        .navigationBarItems(trailing: Button(action: {
             isPresented = true
         }) {
            Image(systemName: "plus")
        })
        .sheet(isPresented: $isPresented) {
            NavigationView {
                EditView(scrumData: $newScrumData)
                    .navigationBarItems(
                        leading: Button("Dismiss") { isPresented = false },
                        trailing: Button("Add") {
                            isPresented = false
                            
                            scrums.append(DailyScrum(
                                title: newScrumData.title,
                                attendees: newScrumData.attendees,
                                lengthInMinutes: Int(newScrumData.lengthInMinutes),
                                color: newScrumData.color
                            ))
                            
                        }
                    )
            }
        }
        .onChange(of: scenePhase) {
            if $0 == .inactive {
                saveAction()
            }
        }
    }
    
    private func biding(for scrum: DailyScrum) -> Binding<DailyScrum> {
        guard let scrumIndex = scrums.firstIndex(where: { $0.id == scrum.id }) else {
            fatalError("Cant't find scrum in array")
        }
        
        return $scrums[scrumIndex]
    }
}

struct ScrumsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ScrumListView(scrums: .constant(DailyScrum.data)) {
                
            }
        }
    }
}
