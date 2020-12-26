//
//  CounterViewController.swift
//  BddCounter
//
//  Created by kohei-uno on 2020/04/20.
//  Copyright © 2020 R0275. All rights reserved.
//

import UIKit

class CounterViewController: UIViewController {
    @IBOutlet weak var countLabel: UILabel!
    @IBOutlet weak var decrementButton: UIButton!
    @IBOutlet weak var incrementButton: UIButton!
    
    private var count = Counter()
    
    static func make() -> CounterViewController {
        return UIStoryboard(name: "Counter", bundle: nil).instantiateInitialViewController() as! CounterViewController
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updateView()
    }

    @IBAction func tapIncrementButton(_ sender: Any) {
        count.increment()
        updateView()
    }

    @IBAction func tapDecrementButton(_ sender: Any) {
        count.decrement()
        updateView()
    }
    
    private func updateView() {
        countLabel.text = "\(count.count)"
        decrementButton.isEnabled = !count.isLowerLimit
        incrementButton.isEnabled = !count.isUpperLimit
    }
}

