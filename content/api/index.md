---
emoji: 🙃
title: URLSession 과 Alamofire 비교해서 사용하기
date: '2024-01-08 00:00:00'
author: 황성진
tags: API
categories: API
---

## URLSession 이란?

Swift의 URLSession은 네트워크 작업을 수행하는 데 사용되는 API 중 하나입니다.

URLSession은 URL을 통해 데이터를 가져오거나 전송하는 기능을 제공하며, 네트워크 요청 및 응답을 처리하는 데 유용합니다.

URLSession은 비동기적으로 작동하며, 앱의 성능을 향상시키는 데 도움이 됩니다.

URLSession은 기본적으로 세 가지 주요 작업을 수행합니다:

1. 데이터 가져오기 (Data Fetching): 웹에서 데이터를 가져오는 데 사용됩니다. 주로 GET 요청과 함께 사용됩니다.

2. 데이터 전송 (Data Task): 서버에 데이터를 전송하는 데 사용됩니다. 주로 POST 또는 PUT 요청과 함께 사용됩니다.

3. 다운로드 작업 (Download Task): 파일이나 큰 데이터를 다운로드할 때 사용됩니다.

<br><br>

## Alamofire 란?

Alamofire는 Swift로 작성된 네트워킹 라이브러리로, URLSession을 기반으로 한 HTTP 요청 및 응답을 쉽게 다룰 수 있게 도와줍니다.

Alamofire는 간편한 API, 네트워크 작업의 추상화, 자동으로 처리되는 헤더 및 응답의 파싱을 제공하여 개발자들이 네트워크 코드를 더 간편하게 작성할 수 있도록 돕는다는 특징이 있습니다.

Alamofire의 주요 기능과 예제 코드를 살펴보겠습니다.

1. 간편한 HTTP 요청: Alamofire는 HTTP 메서드(GET, POST, PUT, DELETE 등)에 대한 메서드를 제공하여 간단한 한 줄의 코드로 요청을 생성할 수 있습니다.

2. 파라미터 및 헤더 관리: 요청에 필요한 파라미터 및 헤더를 쉽게 추가할 수 있습니다.

3. 응답 처리: Alamofire는 응답을 쉽게 처리하고 JSON, String, 이미지 등의 데이터 형식으로 변환할 수 있도록 도와줍니다.

4. 업로드 및 다운로드 작업: 파일 업로드, 다운로드 등의 작업도 지원합니다.

5. 인증 및 보안: HTTP 기본 및 다이제스트 인증, SSL Pinning 등의 보안 기능을 지원합니다.

<br><br>

## 데이터 구조 정의

우선 URLSession 을 사용하거나 Alamofire를 사용해서 서버에서 json 구조의 데이터를 가져오기 위해서는 데이터 구조를 정의해야 됩니다.

[itunesAPI](https://itunes.apple.com/search?term=taylor+swift&entity=song)

데이터 구조는 다음 과 같이 생겼습니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/fa4c0215-7ff7-4afa-8e54-27a51fc562ab">
</p>

처음 Json 구조를 접하신 분들은 무슨소리지 라는 생각이 드실 수 있습니다.

하지만 구조만 이해하면 안에더 필요한 데이터의 구조를 정의하는 것은 어렵지 않습니다.

제가 필요한 데이터는 결국 result 라는 배열안의 trackId, artistName, trackName, collectionName, artworkUrl100 이 필요하다고 가정하고 정의해 보겠습니다.

```swift
import Foundation


struct Response: Codable {
    var result: [Result]
}

struct Result: Codable {
    var trackId: Int
    var artistName: String
    var trackName: String
    var collectionName: String
    var artworkUrl100: String
}
```

다음과 같이 struct를 정의해서 사용 할 수 있습니다.

<br><br>

## URLSession 사용해보기

위에 정의된 구조를 사용해서 데이터를 파싱해 보겠습니다.

### URLSessionManager

URL은 자신이 가져오고 싶은 URL 주소 위에서 정의한 itunes API 주소를 넣어줍니다.

ObservableObject를 사용해서 다른 뷰에서 해당 데이터에 접근 가능하도록 선언해 주었습니다.

guard let 구문을 통해 해당 URL 이 정상인지 확인합니다.

async await를 통해 비동기 통신을 사용합니다.

통신을 통해 data, meta 데이터를 가져옵니다.

data 를 JSONDecoder를 통해 파싱합니다.

```swift
import SwiftUI


class URLSessionManager: ObservableObject {
    
    @Published var results = [Result]()
    
    func loadData() async {
        guard let url = URL(string: "https://itunes.apple.com/search?term=taylor+swift&entity=song") else {
            print("Invalid URL")
            return
        }
        
        do {
            let (data, meta) = try await URLSession.shared.data(from: url)
            print(meta)
            if let decodedResponse = try? JSONDecoder().decode(Response.self, from: data) {
                results = decodedResponse.results
            }
        } catch {
            print("Invalid data")
        }
    }
}
```

<br><br>

### URLSessionView

ObservedObject URLSessionManager를 불러오고 해당 값을 List에 넣어 사용하는 모습 입니다.

trackId는 id값으로 사용하기 위해 불러와 주었고,

이미지는 URL 형식으로 전달되기 때문에 AsyncImage 를 사용해 주었습니다.

```swift
import SwiftUI

struct URLSessionView: View {
    // MARK: - PROPERTY
    
    @ObservedObject var urlSessionManager = URLSessionManager()
    
    // MARK: - BODY
    var body: some View {
        List(urlSessionManager.results, id: \.trackId) { item in
            
            HStack {
                AsyncImage(url: URL(string: item.artworkUrl100))
                
                VStack {
                    Text("Tack Name - \(item.trackName)")
                    Divider()
                    Text("CollectionName - \(item.collectionName)")
                    Divider()
                    Text("Artist - \(item.artistName)")
                }
            }
            
            Rectangle()
                .frame(height: 2)
                .foregroundStyle(.gray)
        }
        .task {
            await urlSessionManager.loadData()
        }
    }
}
```

<br>

다음과 같은 결과를 볼 수 있습니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/12bc018a-5717-4b39-830f-c118de352149"> <br>
</p>


<br><br>

## Alamofire 사용해보기

다음은 URLSession의 방식과 Alamofire 방식의 차이를 보기 위해서 Alamofire로 똑같은 코드를 만들어 보겠습니다.

우선 spm 설치를 진행 해 줍니다.

[spm설치 관련 링크](https://tech.kakao.com/2022/06/02/swift-package-manager/) 해당 링크를 참고하여 https://github.com/Alamofire/Alamofire 를 설치해 줍니다.

<br><br>

### AlamoFireManager

URLSession 때와 똑같이 ObservableObject로 사용해 주었습니다.

guard let 구문을 통해 url의 유효성 검사를 진행 해 주었습니다.

async await를 통해 비동기 통신을 사용합니다.

AF.request 의 url 구문에는 API 통신에 필요한 url을 넣어줍니다.

method는 get, post, put, delete 등의 메소드가 사용가능합니다.

파라미터, 헤더를 쉽게 추가 할 수 있습니다.

validate 를 통해 상태코드가 200~300 사이의 값이면 정상 값으로 간주하게 됩니다.

```swift
import SwiftUI
import Alamofire

class AlamoFireManager: ObservableObject {
    @Published var results = [Result]()
    
    func loadData() async {
        guard let url = URL(string: "https://itunes.apple.com/search?term=taylor+swift&entity=song") else {
            print("Invalid URL")
            return
        }
        
        AF.request(url,
                   method: .get, // HTTP메서드 설정
                   parameters: nil, // 파라미터 설정
                   encoding: URLEncoding.default, // 인코딩 타입 설정
                   headers: ["Content-Type":"application/json", "Accept":"application/json"]) // 헤더 설정
        .validate(statusCode: 200..<300) // 유효성 검사
        // responseDecodable을 통해 UserDatas form으로 디코딩, response의 성공 여부에 따라 작업 분기
        .responseDecodable (of: Response.self) { response in
            switch response.result {
            case .success(let value):
                self.results = value.results
            case .failure(let error):
                print(error)
            }
        }
    }
}
```

<br><br>

### AlamoFireView

URLSessionView 와 마찬가지로 사용해 줍니다.

```swift
import SwiftUI

struct AlamoFireView: View {
    // MARK: - PROPERTY
    
    @ObservedObject var alamofireManager = AlamoFireManager()
    
    // MARK: - BODY
    var body: some View {
        List(alamofireManager.results, id: \.trackId) { item in
            
            HStack {
                AsyncImage(url: URL(string: item.artworkUrl100))
                
                VStack {
                    Text("Tack Name - \(item.trackName)")
                    Divider()
                    Text("CollectionName - \(item.collectionName)")
                    Divider()
                    Text("Artist - \(item.artistName)")
                }
            }
            
            Rectangle()
                .frame(height: 2)
                .foregroundStyle(.gray)
        }
        .task {
            await alamofireManager.loadData()
        }
    }
}
```

<br>

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/12bc018a-5717-4b39-830f-c118de352149"> <br>
</p>

결과는 URLSession과 똑같이 나오는걸 볼 수 있습니다.

<br><br>

## 전체코드

위에서 사용된 전체 코드는 Github에서 볼 수 있습니다. [github-code](https://github.com/Hsungjin/SwiftUI-Study/tree/main/URLSessionAndAlamofire)

<video width="600" height="400" controls>
  <source src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/89f11f2f-5616-46c0-b07b-d3b086225186" type="video/mp4">
</video>


<br><br>

## 그래서 두개의 차이점이 뭘까?

Swift의 URLSession과 Alamofire은 둘 다 네트워킹 작업을 수행하기 위한 도구로 사용됩니다. 그러나 각각의 특징과 목적이 다르며, 다음은 두 라이브러리 간의 주요 차이점입니다:

### 크기와 복잡성

- URLSession: Swift의 표준 라이브러리에 포함된 내장 네트워킹 라이브러리입니다. 무겁지 않고 기본적인 네트워킹 작업을 수행하는 데 사용됩니다.

- Alamofire: URLSession을 감싸고 있는 외부 라이브러리로, 좀 더 추상화된 인터페이스와 편의성을 제공합니다. 좀 더 간편하게 네트워킹 작업을 처리할 수 있도록 도와줍니다.

### 간편성 및 가독성

- URLSession: 기본적인 사용법은 상대적으로 직접적이고 명시적입니다. URLSession을 사용하면 네트워크 요청 및 응답을 직접 다룰 수 있습니다.

- Alamofire: 더 간결하고 명시적인 문법을 제공하며, 코드의 가독성을 높여줍니다. Request 및 Response를 추상화하여 개발자가 더 직관적으로 코드를 작성할 수 있도록 돕습니다.

### 기능 및 확장성

- URLSession: 기본적인 기능을 제공하며, 필요한 경우 직접 확장하여 사용할 수 있습니다. 하지만 추가적인 기능을 수동으로 구현해야 합니다.
- Alamofire: 다양한 기능을 제공하며, JSON 파싱, 업로드 및 다운로드 지원, 헤더 및 인증 관리 등을 내장하고 있습니다. 또한 플러그인 아키텍처를 통해 기능을 확장할 수 있습니다.

### 유지보수와 업데이트

- URLSession: Apple이 제공하는 정식 라이브러리이기 때문에 Swift 및 iOS 업데이트에 자연스럽게 포함됩니다.
- Alamofire: 외부 라이브러리이기 때문에 개발자가 직접 업데이트를 관리해야 합니다. 하지만 Alamofire는 활발하게 관리되고 업데이트되고 있으므로 최신 기능 및 보안 업데이트를 받을 수 있습니다.

### 요약

URLSession은 기본적이고 직접적인 네트워킹 작업을 위한 것이며, Alamofire는 좀 더 편리하고 추상화된 인터페이스를 제공하여 개발자에게 더 풍부한 기능과 가독성을 제공합니다. 선택은 프로젝트의 요구사항 및 개발자의 선호도에 따라 다를 수 있습니다.

<br><br>

## 참고

[URLSession과 Alamofire를 비교해보자. with SwiftUI](https://velog.io/@simh3077/URLSession%EA%B3%BC-Alamofire%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4%EB%B3%B4%EC%9E%90.-with-SwiftUI)

[[SwiftUI] URLSession을 이용한 간단한 JSON 통신 및 데이터 파싱](https://code-algo.tistory.com/113)

<br><br>

```toc
```