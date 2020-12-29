//
//  ViewController.swift
//  SampleDataStorage
//
//  Created by R0305 on 2019/12/31.
//  Copyright © 2019 woo-noo. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var textField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let userDefaults = UserDefaults.standard
        if let text = userDefaults.string(forKey: "text") {
            self.textField.text = text
        }
    }


    @IBAction func tapSaveButton(_ sender: Any) {
        let userDefaults = UserDefaults.standard
        userDefaults.set(self.textField.text, forKey: "text")
        userDefaults.synchronize()
    }
}

