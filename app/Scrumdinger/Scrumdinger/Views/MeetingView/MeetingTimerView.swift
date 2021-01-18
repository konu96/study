//
//  MeetingTimerView.swift
//  Scrumdinger
//
//  Created by kohei-uno on 2021/01/17.
//

import SwiftUI

struct MeetingTimerView: View {
    @Binding var speakers: [ScrumTimer.Speaker]
    var scrumColor: Color
    private var currentSpeakers: String {
        speakers.first { !$0.isCompleted }?.name ?? "Someone"
    }
    
    var body: some View {
        ZStack {
            Circle().strokeBorder(lineWidth: 24, antialiased: true)
            VStack {
                Text(currentSpeakers).font(.title)
                Text("is speaking")
            }
            .accessibilityElement(children: .combine)
            .foregroundColor(scrumColor.accessibleFontColor)
            
            ForEach(speakers) { speaker in
                if speaker.isCompleted, let index = speakers.firstIndex { $0.id == speaker.id } {
                    SpeakerArc(speakerIndex: index, totalSpeakers: speakers.count)
                        .rotation(Angle(degrees: -90))
                        .stroke(scrumColor, lineWidth: 12)
                }
            }
        }
        .padding(.horizontal)
    }
}

struct MeetingTimerView_Previews: PreviewProvider {
    @State static var speakers = [ScrumTimer.Speaker(name: "Kim", isCompleted: true), ScrumTimer.Speaker(name: "Bill", isCompleted: false)]
    static var previews: some View {
        MeetingTimerView(speakers: $speakers, scrumColor: Color("Design"))
    }
}
