import UIKit

class Todo: NSObject, NSSecureCoding {
    static var supportsSecureCoding: Bool {
        return true
    }
    
    var todoTitle: String?
    var todoDone: Bool = false
    
    override init() {
        super.init()
    }
    
    required init?(coder aDecoder: NSCoder) {
        self.todoTitle = aDecoder.decodeObject(forKey: "todoTitle") as? String
        self.todoDone = aDecoder.decodeBool(forKey: "todoDone")
    }
    
    func encode(with aCoder: NSCoder) {
        aCoder.encode(self.todoTitle, forKey: "todoTitle")
        aCoder.encode(self.todoDone, forKey: "todoDone")
    }
}
