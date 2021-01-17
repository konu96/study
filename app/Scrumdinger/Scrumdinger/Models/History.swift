//
//  History.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/17.
//

import Foundation

struct History: Identifiable {
    let id: UUID
    let date: Date
    var attendees: [String]
    var lengthInMinutes: Int

    init(id: UUID = UUID(), date: Date = Date(), attendees: [String], lengthInMinutes: Int) {
        self.id = id
        self.date = date
        self.attendees = attendees
        self.lengthInMinutes = lengthInMinutes
    }
}
