---
emoji: 🙃
title: Swift Generic에 대서
date: '2024-01-15 00:00:00'
author: 황성진
tags: Swift
categories: Swift
---

## 들어가기 앞서

해당 제네릭에 대해 작성된 내용은 야곰님의 스위프트 프로그래밍: Swift 5 책의 내용을 제가 이해할 부분과 추가로 알아간 내용에 대해 정리했습니다.

## Generic에 이란?

Swift에서 제공하는 강력한 기능 중 하나로 제네릭을 이용해 코드를 구현하면 어떤 타입에도 유연하게 대응할 수 있습니다. 

또한 제네릭으로 구현한 기능과 타입은 재사용하기도 쉽고, 코드의 중복을 줄 일 수 있습니다.

**야곰님의 책에 언급된 내용에 따르면 수많은 라이브러리에서 제네릭을 채택하고있다고 합니다!**

제네릭은 기본적으로 타입 또는 메서드의 이름 뒤의 홀화살괄호 기호 <> 사이에 제네릭을 위한 타입 매개 변수를 써주어 제네릭을 사용할 것임을 표시합니다.

> 제네릭을 사용하고자 하는 타입 이름 <타입 매개변수> <br>
> 제네릭을 사용하고자 하는 함수 이름 <타입 매개변수> (함수 매개변수...)

<br><br>

## Generic의 중요성

1. 타입 안전성: 제네릭을 사용하면 다양한 타입에 대해 동일한 작업을 수행할 수 있으면서도 타입 안전성을 유지할 수 있습니다.

2. 재사용성: 한 번 정의한 제네릭 코드는 다양한 타입에 대해 재사용할 수 있어 코드 중복을 줄일 수 있습니다.

3. 유연성: 제네릭을 사용하면 특정 타입에 국한되지 않고 여러 타입에 대해 유연하게 함수나 클래스를 사용할 수 있습니다.

<br><br>

## Generic 타입의 제약 조건 설정 방법

Swift에서 제네릭 타입에 제약 조건을 설정하는 것은 해당 타입이 특정 프로토콜을 준수하거나 특정 클래스를 상속받아야 함을 의미합니다. 

이를 통해 제네릭 함수나 클래스 내부에서 타입의 특정 속성이나 메소드를 안전하게 사용할 수 있습니다.

예를 들어, Comparable 프로토콜을 준수하는 타입에 대해서만 작동하는 함수를 작성하려면 다음과 같이 할 수 있습니다.

```swift
func compareTwoValues<T: Comparable>(_ value1: T, _ value2: T) -> Bool {
    return value1 < value2
}
```

<br><br>

T는 Comparable을 준수해야 하므로 <, >, == 등의 비교 연산자를 사용할 수 있습니다.

<br><br>

## Generic 사용해보기

제네릭의 기본적인 사용 방법을 코드 예시와 함께 살펴보겠습니다.

### 전위 연산자

```swift
// 연산자를 구현하기 위해 미리 선언
prefix operator **

// 제곱을 수행하는 연산자를 정의
prefix func ** (value: Int) -> Int {
    return value * value
}

let minusFive: Int = -5
let sqrtMinusFive: Int = **minusFive

print(sqrtMinusFive) // 25

```

<br><br>

위의 코드와 같이 일반적인 방법으로 구현했을때는 Int 타입에서만 사용자 정의 연산자를 사용할 수 있습니다. UInt 타입에서 Int 타입에 구현해준 사용자 정의 연산자를 사용하지 못합니다.

```swift
// 연산자를 구현하기 위해 미리 선언
prefix operator **

// 제곱을 수행하는 연산자를 정의
prefix func ** (value: UInt) -> UInt {
    return value * value
}

let Five: UInt = 5
let sqrtFive: UInt = **Five

print(sqrtFive) // 25

```

<br><br>

UInt 타입으로 사용하기 위해선 다음과 같이 코드를 전체적으로 수정해 줘야하는 번거로움이 생깁니다.

따라서 제네릭을 사용하면 다음과 같이 코드의 수정 없이 사용 가능합니다.

```swift
// 연산자를 구현하기 위해 미리 선언
prefix operator **

// BinaryInteger - 정수 타입 프로토콜
// 프로토콜이 해당값이면 연산을 수행
prefix func ** <T: BinaryInteger> (value: T) -> T {
    return value * value
}

let minusFive: Int = -5
let five: UInt = 5

let sqrtMinus: Int = **minusFive
let sqrtFive: UInt = **five

print(sqrtMinus) // 25
print(sqrtFive) // 25

```

<br><br>

위의 코드는 이전에 구현한 전위 연산자에 대해 제네릭으로 방식을 변환했습니다.

프로토콜과 제네릭이라는 스위프트의 훌륭한 기능을 조합하여 정수타입 프로토콜(BinaryInteger) 일 경우 해당 연산자를 사용할 수 있도록 구현하였습니다.


<br><br>

### 두개의 값을 바꿔주는 함수

다음은 제네릭을 사용했을때와 사용하지 않았을때의 형변환 함수에 대해 코드를 통해 알아보겠습니다.

```swift
func swapToInts(a: inout Int, b: inout Int) {
    let temp: Int = a
    a = b
    b = temp
}

var numberOne: Int = 5
var numberTwo: Int = 10

swapToInts(a: &numberOne, b: &numberTwo)
print("\(numberOne) \(numberTwo)") // 10 5

```

```swift
func swapToStrings(a: inout String, b: inout String) {
    let temp: String = a
    a = b
    b = temp
}

var stringOne: String = "A"
var stringTwo: String = "B"

swapToStrings(a: &stringOne, b: &stringTwo)
print("\(stringOne) \(stringTwo)") // B A

```

위의 코드들은 평소에 우리가 자주 접하는 방식으로 만들어진 변수 두개의 값을 변경하는 함수 입니다.

이것을 제네릭 형식으로 바꿔보겠습니다.

```swift
func swapTwoValues<T>(a: inout T, b: inout T) {
    let temp: T = a
    a = b
    b = a
}

swapTwoValues(a: &numberOne, b: &numberTwo) // 10 5
swapTwoValues(a: &stringOne, b: &stringTwo) // B A

```

다음과 같이 변경해주면 T에 Int 타입이 들어와도, String 타입이 들어와도 값을 오류 없이 변경해 줄 수 있습니다.


### What is T?

여기서 T는 플레이스 홀더라고 불립니다.

T는 타입의 종류를 알려주지 않았지만 호출되는 순간 타입이 결정되면서 Int 타입의 변수가 전달 되었다면 Int 가 되고, String 타입의 변수가 전달되었다면 String 타입이 됩니다.

### 그림 요약

야곰님 책의 내용입니다.

이 사진은 보고 저는 제네릭에 대해 좀 더 쉽게 이해할 수 있어 첨부하였습니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/70b53297-8688-40de-9b11-5a3c936f966d">
</p>

<br><br>

## 제네릭 타입

제네릭 함수에 이어 제네릭 타입을 구현하여 사용자 정의 구조체, 클래스 연거형 등 어떤 타입과도 연관되어 동작할 수 있습니다.

Stack이라는 제네릭 컬렉션 타입을 통해 제네릭을 사용했을때와 사용하지 않았을때의 차이를 코드를 통해 알아보겠습니다.

### 일반 구조체

일반적인 방법으로 Stack을 만들어 pop과 push를 통해 배열에 값을 추가하고 삭제하는 구조체를 만들어 보겠습니다.

```swift
struct IntStack {
    var items = [Int]()
    
    mutating func push(_ item: Int) {
        items.append(item)
    }
    
    mutating func pop() -> Int {
        items.removeLast()
    }
}

var integerStack: IntStack = IntStack()

integerStack.push(3)
print(integerStack.items) // [3]

integerStack.push(1)
print(integerStack.items) // [3,1]

integerStack.pop()
print(integerStack.items) // [3]

integerStack.push(2)
print(integerStack.items) // [3,2]

```

<br><br>

다음과 같이 push 와 pop을 통해 값을 넣고 삭제하는 것을 볼 수 있습니다.

이 구조체를 제네릭 타입으로 만들어 보겠습니다.

<br><br>

### 제네릭 구조체

구조체를 제네릭 타입으로 만들면 아래 코드와 같이 만들 수 있습니다.

```swift
struct Stack<Element> {
    var items = [Element]()
    
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element {
        items.removeLast()
    }
}

var doubleStack: Stack<Double> = Stack<Double>()

doubleStack.push(1.0)
print(doubleStack.items) // [1.0]

doubleStack.push(2.0)
print(doubleStack.items) // [1.0, 2.0]

doubleStack.pop()
print(doubleStack.items) // [1.0]

var stringStack: Stack<String> = Stack<String>()

stringStack.push("A")
print(stringStack.items) // ["A"]

stringStack.push("B")
print(stringStack.items) // ["A", "V"]

stringStack.pop()
print(stringStack.items) // "A"]
```

<br><br>

앞서 봤던 Stack 구조체에는 Int 대신 Element 라는 타입 매게변수를 사용했습니다.

Stack 인스턴스를 생성할 때 실제로 Element 대신 어떤 타입을 사용할지 명시해주는 방법은 Stack<Type> 처럼 선언해 주면 됩니다.

doubleStack에서는 Stack<Double> 이라는 타입을 선언해주고 stringStack Stack<String> 이라는 타입을 선언해서 사용해 주었습니다.

<br><br>

## 제네릭과 관련된 성능 문제 해결 방법

1. 타입 명확화(Type Erasure): 제네릭을 사용할 때, 컴파일러는 각 타입 인스턴스에 대해 별도의 코드를 생성합니다. 이는 메모리 사용과 실행 시간 측면에서 비효율적일 수 있습니다. 타입 명확화는 이러한 문제를 해결하기 위해 사용되며, 런타임에 타입 정보를 지워 단일 타입으로 처리합니다.

```swift
func substractTwoValue<T>(a: T, b: T) -> T {
    return a - b
}

// 보다는 타입을 명확화 하여사용

func substractTwoValue<T: BinaryInteger>(a: T, b: T) -> T {
    return a - b
}
```

<br>


2. 프로토콜 지향 프로그래밍: 제네릭 대신 프로토콜을 사용하여 유사한 기능을 구현할 수 있습니다. 프로토콜은 런타임 다형성을 제공하며, 컴파일 시 제네릭보다 더 효율적일 수 있습니다.

```swift
protocol Container {
    var count: Int { get }
    mutating func append(_ item: ItemType)
}

class MyContainer: Container {
    var items: Array<Int> = Array<Int>()

    var count: Int {
        return items.count
    }

    func append(_ item: Int) {
        items.append(item)
    }

}
```

<br>

3. 최적화된 자료구조 사용: 특정 작업에 대해 최적화된 자료구조를 사용하여 성능을 향상시킬 수 있습니다. 예를 들어, 대용량 데이터를 다룰 때는 배열 대신 연결 리스트나 해시 테이블을 고려할 수 있습니다.

```swift
let array = [1, 2, 2, 3, 4, 4, 5]
let uniqueElements = Set(array) // 중복 요소 제거
```

<br>

4. 컴파일러 힌트 제공: 때로는 컴파일러에게 추가 정보를 제공하여 최적화를 돕는 것이 유용할 수 있습니다. 예를 들어, @inlinable 및 @inline(__always) 속성을 사용하여 특정 함수가 인라인 될 수 있도록 할 수 있습니다.

```swift
@inlinable
func multiplyByTwo(_ value: Int) -> Int {
    return value * 2
}
```

<br>

 - @inlinable
   - 인라인이란, 메서드 호출을 해당 메서드의 본문으로 대체하는 컴파일러 최적화 방법
   
   - 인라인을 사용하면 오버헤드를 줄일 수 있으므로, 구현부가 간단한 메소드인 것들을 인라인으로 설정하여 오버헤드를 낮추어 컴파일러 최적화를 적용 (단 재귀호출 시 사용하면 더 비효율적)

 ```swift
 // 일반적인 사용
func printPlusOne(number: Int) {
    print("value is \(number + 1)")
}

@inlinable
func printPlusOne(number: Int) {
    print("value is \(number + 1)")
}
 ```

<br><br>

## 참고

[스위프트 프로그래밍: Swift 5](https://search.shopping.naver.com/book/catalog/32436017914?cat_id=50010920&frm=PBOKPRO&query=%EC%95%BC%EA%B3%B0+swift&NaPm=ct%3Dlrdwh4g0%7Cci%3D446939692b6f9d4926afaebf6605d9cf7846fc2c%7Ctr%3Dboknx%7Csn%3D95694%7Chk%3D9f11df0e5bfec7a9ef6daa964a90d7f11381dfaa)

<br><br>

```toc
```