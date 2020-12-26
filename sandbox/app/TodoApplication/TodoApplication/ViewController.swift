//
//  ViewController.swift
//  TodoApplication
//
//  Created by R0305 on 2019/12/31.
//  Copyright © 2019 woo-noo. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITableViewDataSource {
    var todoList = [Todo]()
    
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let userDefaults = UserDefaults.standard
        if let storedTodoList = userDefaults.object(forKey: "todoList") as? Data {
            do {
                if let unarchiveTodoList = try NSKeyedUnarchiver.unarchivedObject(
                    ofClasses: [NSArray.self, Todo.self],
                    from: storedTodoList
                ) as? [Todo] {
                    self.todoList.append(contentsOf: unarchiveTodoList)
                }
            } catch {
                
            }
        }
    }


    @IBAction func tapAddButton(_ sender: Any) {
        let alertController = UIAlertController(
            title: "TODO追加",
            message: "TODOを入力してください",
            preferredStyle: UIAlertController.Style.alert
        )
        alertController.addTextField(configurationHandler: nil)
        
        let okAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.default)
        {
            (action: UIAlertAction) in
            if let textField = alertController.textFields?.first {
                let todo = Todo()
                todo.todoTitle = textField.text
                self.todoList.insert(todo, at: 0)
                self.tableView.insertRows(
                    at: [IndexPath(row: 0, section: 0)],
                    with: UITableView.RowAnimation.right
                )
            }
            
            let userDefaults = UserDefaults.standard
            do {
                let data = try NSKeyedArchiver.archivedData(
                    withRootObject: self.todoList,
                    requiringSecureCoding: true
                )
                userDefaults.set(data, forKey: "todoList")
                userDefaults.synchronize()
            } catch {
                
            }
        }
        
        alertController.addAction(okAction)
        let cancelButton = UIAlertAction(
            title: "CANCEL",
            style: UIAlertAction.Style.cancel,
            handler: nil
        )
        alertController.addAction(cancelButton)
        present(alertController, animated: true, completion: nil)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.todoList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TodoCell", for: indexPath)
        let todo = self.todoList[indexPath.row]
        cell.textLabel?.text = todo.todoTitle
        if todo.todoDone {
            cell.accessoryType = UITableViewCell.AccessoryType.checkmark
        } else {
            cell.accessoryType = UITableViewCell.AccessoryType.none
        }
        
        return cell
    }
}
