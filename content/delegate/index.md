---
emoji: 🙃
title: Swift Delegate Pattern 이란?
date: '2024-03-25 00:00:00'
author: 황성진
tags: Swift
categories: Swift
---

## 들어가기 앞서

기존 SwiftUI 로 입문을 한 입장에서 Delegate Pattern 이란 단어가 약간 생소하였다.

왜 뷰간에 데이터 전달을 하는데 Delegate Pattern을 사용하는거지?

SwiftUI에선 State, Binding으로 전달하면 되는데? 이런 의문을 갖고 공부를 하기 시작했다.

<br><br>

## ViewController간 데이터를 주고 받는 방식

Swift에선 ViewController간의 데이터를 주고 받는 방법이 여러가지가 있다.

1. 직접 프로퍼티에 접근
2. 함수를 통한 접근
3. Segue
4. Delegate
5. Closure
6. NotificationCenter

이렇게 다양한 방법들이 있는데 이번엔 Delegate 에 대해서 공부해보았다.

<br><br>

### 그래서 Delegate가 뭘까?

UIKit에서 가장쉽게 접하는 예제는 UITableView를 구현하기 위해서 UITableViewDateSource와 UITableViewDelegate를 채택하여 사용한다.

근데 막상 사용하는 입장에서 이것에 대해 정의하는것은 쉽지 않다.

Delegate란 단어는 "위임하다" 라는 사전적 의미를 갖고있다.

Delegate Pattern 은 위임자를 갖고있는 객체가 다른 객체에게 자신의 일을 위임하는 형태의 디자인 패턴이다.

아래는 간단한 예제의 입력값을 받는 예제로 FirstViewContoroller 와 SecondViewController 간의 데이터 통신을 알아보자.

```swift
protocol DeveloperEntryDelegate: AnyObject {
    func textDeveloperPlatform(_ text: String)
    func textDeveloperLanguage(_ text: String)
}
```
<br>

```swift
class FirstViewController: UIViewController {
    
    @IBOutlet weak var labelPlatformDetails: UILabel!
    @IBOutlet weak var labelDeveloperLanguage: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    //MARK: - Navigation
    @IBAction func actionAddDetail(_ sender: UIButton) {
        guard  let secondView = self.storyboard?.instantiateViewController(withIdentifier: "SecondViewController") as? SecondViewController else {
            fatalError("View Controller not found")
        }
        secondView.delegate = self
        navigationController?.pushViewController(secondView, animated: true)
    }
    
}

extension FirstViewController: DeveloperEntryDelegate {
    func textDeveloperPlatform(_ text: String) {
        print(text)
        labelPlatformDetails.text = "Platform: \(text)"
    }
    
    func textDeveloperLanguage(_ text: String) {
        print(text)
        labelDeveloperLanguage.text = "Language: \(text)"
    }
}

class SecondViewController: UIViewController {

    weak var delegate: DeveloperEntryDelegate?
    
    @IBOutlet weak var textPlateform: UITextField!
    @IBOutlet weak var textLanguage: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    @IBAction func actionDone(_ sender: UIButton) {
        self.navigationController?.popViewController(animated: true)
        self.delegate?.textDeveloperPlatform(textPlateform.text ?? "")
        self.delegate?.textDeveloperLanguage(textLanguage.text ?? "")
    }

}
```
<br>

textDeveloperPlatform 과 textDeveloperLanguage 함수를 갖는 DeveloperEntryDelegate 프로토콜을 선언해준다.
그리고 delegate 변수를 SecondViewController에서 선언해 주는데 이 변수의 자료형은 DeveloperEntryDelegate 프로토콜로 선언하였다.
이로써 delegate 변수는 일을 위임할 준비를 마친 것이다.

actionDone() 메서드에는 Second View에서 버튼이 눌렸을때 delegat 변수를 통해 위임받은 객체에서 textDeveloperPlatform 와 textDeveloperLanguage 를 실행하도록 하였다.

FirstView의 actionAddDetail 메서드를 만들어 주었고,
actionAddDetail 메서드에는 SecondView를 찾아서 보여주고, Second View의 delegate 변수와 연결해주는 코드가 있다.

DeveloperEntryDelegate를 채택한 FirstViewController에는 위임자가 메서드를 호출하였을 때 실행할 함수들에 대해 작성해 주어야 한다.

이렇게 작성한 함수를 통해 Second View 에서 Done 버튼이 눌러 일을 시키면 First View에서 그 일을 대신 수행하는 것이다.

여기서 Second View의 위임자는 일을 시키기만 할 뿐이지 어떤 일을 하는지에 대한 구체적인 내용을 모른다.
이것이 Delegate 패턴의 장점이다.

<br><br>

### Delegate 패턴은 왜 사용해야될까?

위의 예제들에서 위임자들은 그저 일을 시킬 뿐, 일을 어떻게 처리해야하는지는 모른다.
일을 처리하는 방법은 그 일을 수행하는 객체에 구현되어 있다.
이미 눈치 챈 사람들도 있겠지만, 이렇게 작성하면 코드를 재사용하고 유지보수하기 쉬워진다.
어떤 일을 해야 하는지를 정해놓기만 하고, 상황에 맞는 코드를 작성하면 된다.
예를 들어 우리가 어떤 작업을 처리해야 하는데, 동일한 작업인데도 불구하고 객체마다 다른 내용을 처리해야한다고 생각해보자.
이럴 경우 동일한 작업에 대해서는 함수를 전달하기만 하고, 각각의 내용은 전달 받은 객체에서 처리하기만 하면 된다.
또한 작업을 전달할 때 공통된 부분을 제외하고 처리해야 하는 부분만을 전달하여 처리할 수도 있다.

<br><br>

### 델리게이트, 옵저버, 콜백함수의 비교

CallBack 함수는 특정 작업이 완료 후 실행되어야 하는 함수이다.

```swift
func fetchData(completion: @escaping (String) -> Void) {
    // 비동기로 데이터를 갖고오는 작업 가정

    let data = "가져온 데이터"
    completion(data)
}

fetchData { data in
    print("받은 데이터: \(data)")
}
```

<br><br>

옵저버 패턴은 객체의 상태 변화를 관찰하는 관찰자(옵저버) 목록을 객체에 등록한 후, 객체 상태 변화가 있을 때마다 이 관찰자들에게 변화를 알리는 디자인 패턴으로 일대다의 의존성을 가지며, MVC, MVVM 등의 아키텍처에서 상태 관리를 위해 자주 사용된다.

```swift
class Observer {
    init() {
        NotificationCenter.default.addObserver(self, selector: #selector(handleNotification(_:)), name: .someNotification, object: nil)
    }
    
    @objc func handleNotification(_ notification: Notification) {
        print("알림 받음")
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}

extension Notification.Name {
    static let someNotification = Notification.Name("someNotification")
}

// 옵저버 생성
let observer = Observer()

// 알림 발송
NotificationCenter.default.post(name: .someNotification, object: nil)
```

<br>

- **델리게이트 패턴**은 객체 간의 일대일 커뮤니케이션을 위해, 특정 객체가 다른 객체의 행동을 대신 수행하도록 합니다.

- **콜백 함수**는 비동기 작업의 완료 후 실행되어야 하는 로직을 처리하기 위해 사용되며, 클로저를 통해 구현됩니다.

- **옵저버 패턴**은 하나의 객체가 변경될 때 그 변경 사항을 다수의 객체에게 알리고자 할 때 사용됩니다. 이 패턴은 앱의 다양한 부분에서 낮은 결합도를 유지하면서 효과적인 이벤트 기반 커뮤니케이션을 가능하게 합니다.


<br><br>

### Delegate 에서 반환값을 사용하는 경우는?
UIKit에서 TableView를 생각해보면 쉽게 생각할수 있다.
만약 MyViewController 라는 ViewController 가 있다고 가정해보자.

```swift
extension MyViewController: UITableViewDataSource, UITableViewDelegate {
    // UITableViewDataSource 메소드
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // 섹션당 행의 개수를 반환
        return 10
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // 셀을 생성하고 구성
        let cell = UITableViewCell(style: .default, reuseIdentifier: "cell")
        cell.textLabel?.text = "행 \(indexPath.row)"
        return cell
    }

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        // 각 행의 높이를 반환
        if indexPath.row % 2 == 0 {
            return 50.0 // 짝수 번째 행은 높이 50
        } else {
            return 100.0 // 홀수 번째 행은 높이 100
        }
    }

    // UITableViewDelegate 메소드
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("Row \(indexPath.row) 선택됨")
    }
}
```
테이블 뷰는 콘텐츠의 표시와 사용자 인터랙션을 처리하기 위해 델리게이트(UITableViewDelegate)와 데이터 소스(UITableViewDataSource)에 일부 책임을 위임하여 사용한다.

리턴 값과 같은경우에는 테이블뷰의 각셀의 높이를 조절하기위해 사용한다.

<br><br>

## 참고

[Delegate 패턴을 이해해보자](https://velog.io/@nala/iOS-Delegate-%ED%8C%A8%ED%84%B4%EC%9D%84-%EC%9D%B4%ED%95%B4%ED%95%B4%EB%B3%B4%EC%9E%90)
[Delegate 패턴이란 무엇일까?](https://velog.io/@zooneon/Delegate-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)
[Delegation Pattern in Swift](https://medium.com/@nimjea/delegation-pattern-in-swift-4-2-f6aca61f4bf5)

<br><br>

```toc
```