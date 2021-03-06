//
//  DetailView.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/16.
//

import SwiftUI

struct DetailView: View {
    @Binding var scrum: DailyScrum
    @State private var dailyScrumData: DailyScrum.Data = DailyScrum.Data()
    @State private var isPresented = false
    
    var body: some View {
        List {
            Section(header: Text("Meeting Info")) {
                NavigationLink(destination: MeetingView(scrum: $scrum)) {
                    Label("Start Meeting", systemImage: "timer")
                        .font(.headline)
                        .foregroundColor(.accentColor)
                        .accessibilityLabel(Text("Start meeting"))
                }
                HStack {
                    Label("Length", systemImage: "clock")
                        .accessibilityLabel(Text("Meeting length"))
                    Spacer()
                    Text("\(scrum.lengthInMinutes) minutes")
                }
                
                HStack {
                    Label("Color", systemImage: "painpalette")
                    Spacer()
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(scrum.color)
                }
                .accessibilityElement(children: /*@START_MENU_TOKEN@*/.ignore/*@END_MENU_TOKEN@*/)
            }
            
            Section(header: Text("Attendees")) {
                ForEach(scrum.attendees, id: \.self) {
                    Label($0, systemImage: "person")
                        .accessibilityLabel(Text("Person"))
                        .accessibilityValue(Text($0))
                }
            }
            
            Section(header: Text("History")) {
                if scrum.history.isEmpty {
                    Label("No meetings yet", systemImage: "calendar.badge.exclamationmark")
                }
                
                ForEach(scrum.history) { history in
                    HStack {
                        Image(systemName: "calendar")
                        Text(history.date, style: .date)
                    }
                }
            }
        }
        .listStyle(InsetGroupedListStyle())
        .navigationTitle(scrum.title)
        .navigationBarItems(trailing: Button("Edit") {
            isPresented = true
            dailyScrumData = scrum.data
        })
        .fullScreenCover(isPresented: $isPresented) {
            NavigationView {
                EditView(scrumData: $dailyScrumData)
                    .navigationTitle(scrum.title)
                    .navigationBarItems(
                        leading: Button("Cancel") { isPresented = false },
                        trailing: Button("Done") {
                            isPresented = false
                            scrum.update(from: dailyScrumData)
                        }
                    )
            }
        }
    }
}

struct DetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            DetailView(scrum: .constant(DailyScrum.data[0]))
        }
    }
}
