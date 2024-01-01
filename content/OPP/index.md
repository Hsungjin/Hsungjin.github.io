---
emoji: 🙃
title: Swift 객체지향프로그래밍(OOP) 이란?
date: '2023-01-01 01:00:00'
author: 황성진
tags: Swift
categories: Swift
---
## 객체(Object) 란?
CS에서 객체는 물리적으로 존재하거나 추상적으로 생각할 수 있는 것 중에 자신의 속성을 가지고 있고 다른것과 식별 가능한 것을 말합니다.

즉 컴퓨터로 예를 들면 키보드, 마우스, 스피커 등이 객체가 될 수 있고, 이것들은 각각 입력, 소리출력, 인터페이스 조작 등의 기능이 포함 됩니다.

<br><br>

## 객체지향 프로그래밍 (OOP, Object Oriented Programming)

> 객체들의 상호작용으로 서술하는 프로그래밍 기법
> 현실세계의 객체를 소프트웨어 객체로 설계 하는 것

<br><br>

### 특징 

객체지향 프로그래밍은 소프트웨어를 개발할 때 현실 세계의 객체를 모델링하고, 이러한 객체들 간의 상호 작용을 중심으로 프로그래밍하는 방법론입니다. 

- 재사용성: 상속을 통해 코드의 재사용성을 높일 수 있다.
- 생산성 향상: 잘 설계된 클래스를 만들어서 독립적인 객체를 사용함으로써 개발의 생산성을 향상시킬 수 있다.
- 자연적인 모델링: 일상생활에서 모습의 구조가 객체에 자연스럽게 녹아들었기 때문에 생각하고 있는 것을 그대로 자연스럽게 구현할 수 있다. (기능별로 나눠서 구현한다거나,,)
- 유지보수의 우수성: 기존 기능을 수정 시 함수를 새롭게 바꾸더라도 캡슐화 되어 그 함수의 세부 정보가 은닉되어 있기 때문에 주변에 미치는 영향을 최소화 하기 때문에 유지보수의 우수성을 갖는다. 새로운 객체의 종류를 추가 시에는 상속을 통해서 기존의 기능을 활용하고, 존재하지 않은 새로운 속성만 추가하면 되므로 매우 경제적이다.

<br><br>

### 추상화

- 복잡한 시스템을 간단한 개념으로 변환하는 프로세스
- 코드의 간결성 - 추상화를 통해 코드의 복잡성을 줄이고 이해하기 쉽게 만들어줌
- 타입 안정성 - 타입 안정성을 제공하여 런타임 오류의 가능성을 줄임
- 확장성 - 추상 클래스를 사용하면 새로운 기능을 추가하기 쉬움.

즉, 현실세계의 사물을 객체로 보고, 필요한 공통특성만 다루어 현실의 복잡성을 제거하고 목적에 집중할 수 있도록 합니다.

<br><br>

#### Procotol로 추상화 하기

아래 예제는 동물(강아지, 고양이) 에 공통된 특징을 protocol 바탕으로 추상화 한 것 입니다.

``` swift
protocol Animal {
    var name: String { get set }
    func makeNoise()
}

class Dog: Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func makeNoise() {
        print("\(name)는 왈왈!")
    }
}

class Cat: Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func makeNoise() {
        print("\(name)는 야옹!")
    }
}

let myDog: Animal = Dog(name: "진돌이")
let myCat: Animal = Cat(name: "길동이")

myDog.makeNoise() // 진돌이는 왈왈!
myCat.makeNoise() // 길동이는 야옹!

```
<p align="center">
  <img src="https://velog.velcdn.com/images/hsungjin__/post/3a7faba4-dfc6-4ee7-b50c-5c11cdab7073/image.png"> <br>
</p>

이렇게 Animal이라는 프로토콜로 동물의 울음소리 속성과 메서드들을 선언해 줍니다.

그리고 Dog, Cat 객체 클레스 생선시 Animal 프로토콜을 채택하여 name 과 makeNoise 함수에 각자 맞게 구현해 줍니다.

<br><br>

#### Class로 추상화 하기

``` swift
class Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func makeNoise() { }
}

class Dog: Animal {
    override init(name: String) {
        super.init(name: name)
    }
    
    override func makeNoise() {
        print("\(name)는 왈왈")
    }
}

class Cat: Animal {
    override init(name: String) {
        super.init(name: name)
    }
    
    override func makeNoise() {
        print("\(name)는 야옹")
    }
}

let myDog: Animal = Dog(name: "진돌이")
let myCat: Animal = Cat(name: "길동이")

myDog.makeNoise() // 진돌이는 왈왈!
myCat.makeNoise() // 길동이는 야옹!
```
<p align="center">
  <img src="https://velog.velcdn.com/images/hsungjin__/post/ac978259-1cde-4e48-bc09-0c3c4d05d8c7/image.png"> <br>
</p>

이렇게 구현이 가능합니다.

Animal 클래스 타입으로 만들어 주고 Animal을 상속받는 하위 객체에서 override를 사용하여 각 역할을 프로토콜을 채택하고 실제 구현하는 것 처럼 기능을 구현 할 수 있지만,

프로토콜로 충분히 더 간단하게 사용할 수 있습니다.

<br><br>

### 다형성

Polymorphism이라고 부르는 다형성은 사전적 의미로는 하나의 타입에 여러 형태를 가질 수 있는 성질을 말합니다.

즉, 같은 속성 및 기능에 대해 다양한 현태의 객체가 서로 다른 동작을 수행하게 하는 것이죠!

우리가 바로 위에서 추상화를 하면서 계속 같이 자연스럽게 나왔던 부분인데요.

Dog는 Animal을 상속 및 채택하여 makeNoise 메서드를 구현하고 Cat도 그와 마찬가지죠.

그런데 makeNoise 메서드의 기능은 Dog와 Cat이 서로 다릅니다.

이렇게 Dog, Cat은 모두 부모 클래스나 프로토콜인 Animal의 makeNoise() 메서드를 공통적으로 가지고 있지만, 각각 다른 동작을 수행합니다.

> 이처럼 다형성은 같은 함수 이름을 가진 메서드가 객체의 타입에 따라 다르게 동작하는 특성입니다.

결국 다형성은 하나의 인터페이스를 가지고 있지만, 다른 객체마다 그 인터페이스에 따라 다양한 동작을 수행할 수 있도록 하는 방법 입니다.

코드의 재사용성을 높여주는 동시에 유지보수를 훨씬 더 편하게 해줄 수 있습니다.

<p align="center">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFgeRG%2FbtrMqtA5Xij%2FkdXRDU9TgBhdYuCaDOH4wk%2Fimg.png">
</p>

<br><br>

#### 오버라이드(override)

``` swift
class Animal {
    func makeNoise() {  }
}

class Dog: Animal {
    override func makeNoise() {
        print("왈왈")
    }
}

class Cat: Animal {
    override func makeNoise() {
        print("야옹")
    }
}

let myDog = Dog()
let myCat = Cat()
myDog.makeNoise() // 왈왈
myCat.makeNoise() // 야옹

```

이렇게 Animal 클래스를 상속받고 오버라이드 키워드를 붙여 해당 makeNoise 메서드를 재정의 해줍니다.

또한 오버라이딩 말고도 오버로딩(Overloading)이라는 것도 있습니다.

오버로딩은 같은 이름의 메서드 명을 가지면서 매개변수의 타입과 갯수가 다른 경우를 뜻합니다.

<br><br>

#### 오버로딩(overroading)

``` swift
enum primate {
    case gorilla
}

enum mammalia {
    case dog
    case cat
}

class Animal {
    func printAnimal(method: primate) {
        print("영장류")
    }
    
    func printAnimal(method: mammalia) {
        print("포유류")
    }
}

let animal = Animal()
animal.printAnimal(method: .gorilla) // 영장류
animal.printAnimal(method: .dog) // 표유류
```

간단하게 동물을 영장류, 포유류 열거형 타입으로 만들어줬습니다.

이때 Animal 객체 구현 시 같은 메서드 명을 가진 printAnimal을 가지고 매개변수의 타입만 다른 두개의 메서드를 만들어 줬습니다.

그리고 실제 animal 인스턴스를 만들고 printAnimal 메서드 호출 시 method 매개 변수에 primate, mammalia에 해당하는 각기 다른 인자를 넣어주면 그에 맞게 동장합니다.

이것이 오버로딩 입니다.

<br><br>

### 캡슐화

객체의 내부 구현을 외부에서 숨기고, 오직 공개된 인터페이스만을 통해 객체에 접근할 수 있도록 하는 것을 의미합니다. 

이를 통해 객체의 상태를 보호하고 안정성을 유지할 수 있습니다. 

Swift에서는 캡슐화를 위해 속성 (Properties)과 메서드 (Methods)에 대한 접근 제어 수준 (Access Control)을 사용합니다.

다음은 간단한 예제를 통해 Swift에서의 캡슐화를 설명하겠습니다. 

예제에서는 Person 클래스를 정의하고, 이 클래스의 내부 속성에 대한 접근을 캡슐화할 것입니다.

``` swift
class Person {
    // 내부 속성은 private으로 선언하여 외부에서 접근 불가능하게 함
    private var name: String
    private var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    // 외부에서 접근 가능한 메서드를 통해 속성에 접근
    func introduce() {
        print("안녕하세요, 제 이름은 \(name)이고, \(age)살입니다.")
    }

    // 외부에서 속성에 직접 접근하지 못하도록 하는 메서드
    func haveBirthday() {
        age += 1
        print("\(name)이 생일을 맞이하여 \(age)살이 되었습니다.")
    }
}

// 외부에서 Person 클래스의 인스턴스 생성
let person = Person(name: "황성진", age: 26)

// 외부에서는 private으로 선언된 속성에 직접 접근할 수 없음
person.name // 에러 발생!

// 외부에서는 공개된 메서드를 통해 속성에 접근
person.introduce() // 안녕하세요, 제 이름은 황성진이고, 26살입니다.
person.haveBirthday() // 황성진이 생일을 맞이하여 27살이 되었습니다.
```

위의 예제에서 Person 클래스의 name과 age 속성은 private으로 선언되어 있어 외부에서 직접 접근할 수 없습니다. 

대신, introduce()와 haveBirthday() 메서드를 통해 속성에 접근할 수 있습니다. 

이를 통해 캡슐화가 구현되어 객체의 내부 상태를 외부로부터 보호하고 있습니다.

<br><br>

### 상속

Swift에서 상속은 클래스 간의 관계를 구축하여 코드를 재사용하고 확장하는 데 사용되는 객체 지향 프로그래밍의 핵심 개념 중 하나입니다.

부모 클래스에서 정의된 속성과 메서드를 자식 클래스에서 상속받아 사용할 수 있습니다. 

이를 통해 코드의 재사용성이 높아지며, 계층적인 구조를 형성할 수 있습니다.

다음은 간단한 예제를 통해 Swift에서의 상속을 설명하겠습니다. 

예제 에서는 Vehicle 부모 클래스를 정의하고, 이를 상속받는 Car 자식 클래스를 만들어 보겠습니다.


``` swift
// 부모 클래스
class Vehicle {
    var brand: String

    init(brand: String) {
        self.brand = brand
    }

    func start() {
        print("차량이 출발합니다.")
    }

    func stop() {
        print("차량이 정지합니다.")
    }
}

// 자식 클래스
class Car: Vehicle {
    var model: String

    init(brand: String, model: String) {
        self.model = model
        // 부모 클래스의 이니셜라이저 호출
        super.init(brand: brand)
    }

    // 부모 클래스에서 상속받은 메서드를 재정의
    override func start() {
        print("\(brand) \(model)가 출발합니다.")
    }

    // 자식 클래스에서 추가된 메서드
    func honk() {
        print("\(brand) \(model)가 경적을 울립니다.")
    }
}

// 자식 클래스의 인스턴스 생성
let myCar = Car(brand: "현대", model: "벨로스터")

// 부모 클래스에서 상속받은 메서드 호출
myCar.start() // 현대 벨로스터가 출발합니다.
myCar.stop() // 차량이 정지합니다.

// 자식 클래스에서 추가된 메서드 호출
myCar.honk() // 현대 벨로스터가 경적을 울립니다.
```

<br><br>

## 상충의 예제
``` swift
class Animal {
    private var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("Generic animal sound")
    }
}

class Dog: Animal {
    override func makeSound() {
        print("Woof!")
    }
}

class Zoo {
    var animals: [Animal] = []

    func addAnimal(animal: Animal) {
        animals.append(animal)
    }
}
```

위의 코드에서 Animal 클래스는 name 속성을 가지고 있고, Dog 클래스는 이를 상속받아 특정한 소리를 출력합니다. 

그리고 Zoo 클래스는 Animal 타입의 배열을 관리합니다.

Zoo 클래스는 Animal 배열을 외부에 노출하고 있으며, 이로 인해 캡슐화가 깨집니다. 

외부에서는 어떤 동물이 Zoo에 추가되었는지를 쉽게 알 수 있습니다. 

즉, Zoo 클래스가 내부의 동물 목록에 대한 세부 정보를 숨기지 못하고 노출하고 있습니다.

```swift
class Animal {
    private var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("Generic animal sound")
    }

    func getName() -> String {
        return name
    }
}

class Zoo {
    private var animals: [Animal] = []

    func addAnimal(animal: Animal) {
        animals.append(animal)
    }

    func displayAnimalNames() {
        for animal in animals {
            print(animal.getName())
        }
    }
}
```
Zoo 클래스에서는 Animal 객체의 getName() 메서드를 통해 동물의 이름을 가져올 수 있도록 수정합니다.

Zoo 클래스는 외부에 동물 목록의 세부 정보를 노출하지 않으면서, 필요한 정보에 대한 접근은 getName() 메서드를 통해 가능해졌습니다. 

이렇게 함으로써 캡슐화를 보호하면서도 Zoo 클래스에서 동물의 이름을 가져올 수 있게 되었습니다.

<br><br>

## 참고 블로그
[(iOS/Swift 기준) 객체지향 프로그래밍 (OOP)](https://didu-story.tistory.com/320)

[추상화와 다형성](https://green1229.tistory.com/429#recentComments)

```toc
```