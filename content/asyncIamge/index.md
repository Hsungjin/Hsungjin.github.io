---
emoji: 🙃
title: SwiftUI KingFisher 와 Async Image 사용 비교
date: '2024-01-23 00:00:00'
author: 황성진
tags: Swift
categories: Swift
---

## 들어가기 앞서

Xcode 프로젝트 Assert에 이미지를 추가하여 이미지를 로드하는 경우도 있지만, 네트워킹을 통해 웹의 이미지를 로드하는 경우는 일일이 이미지를 저장하여 불러오는 것이 불가능하다. 

이때 Kingfisher 또는 Async Image 를 사용하면 웹 이미지를 보여줄 수 있다.

Async Image는 SwiftUI가 iOS 15부터 제공하는 새로운 기능으로, URL에서 이미지를 비동기적으로 로드하고 캐시하는 역할을 합니다.

이로 인해 이미지 로딩 및 표시가 더욱 원활하고 성능이 향상됩니다.

Kingfisher는 Swift 기반의 이미지 다운로딩 및 캐싱 라이브러리로, UIKit 및 SwiftUI에서 사용할 수 있습니다.

Kingfisher를 사용하면 더 많은 커스터마이제이션과 기능을 활용할 수 있습니다.

<br><br>

## AsyncImage

이미지를 비동기적으로 로드하고 표시하는 뷰입니다.

Async Image는 SwiftUI에서 도입된 이미지 로딩 및 표시를 위한 내장된 컴포넌트입니다.

이를 사용하면 이미지를 비동기적으로 로드하고 캐싱하여 효율적으로 처리할 수 있습니다.

<br><br>

### AsyncImage 예제

#### 기본적인 사용 방법

```swift
struct ContentView: View {
    // MARK: - PROPERTY
    var imageURL = "https://avatars.githubusercontent.com/u/120264964?v=4"
    // MARK: - BODY
    var body: some View {
        AsyncImage(url: URL(string: imageURL))
            .frame(width: 200, heith: 200)
    }
}
```

<br>

사용 결과 입니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/4d2cf751-9068-4471-b37b-4664dc149397">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/41e7f4bf-3368-49b9-8f28-c31b3d61e507">
</p>

이미지가 로드될 때까지 뷰에는 사용 가능한 공간을 채우는 표준 자리 표시자가 표시됩니다.

로드가 성공적으로 완료되면 보기가 업데이트되어 이미지가 표시됩니다.

위의 예에서 이미지는 프레임보다 크므로 자리 표시자보다 크게 나타납니다.

여기서 주의해야 할 점은 AsyncImage 에 프레임으로 크기를 설정해 주어도 이미지가 로드되기 이전의 뷰에만 사용이 가능하고 이미지에는 적용이 불가능 합니다.

이것을 해결하고 이미지 관련 modifier 또한 적용하기 위해선 아래와 같이 사용해 주어야 합니다.

```swift
struct ContentView: View {
    // MARK: - PROPERTY
    var imageURL = "https://avatars.githubusercontent.com/u/120264964?v=4"
    // MARK: - BODY
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { image in
            image.resizable()
        } placeholder: {
            ProgressView()
        }
        .frame(width: 100, height: 100)
    }
}
```

<br>

다음과 같이 placeholder를 사용하면 이미지가 로드 되기전에 ProgressView가 나타난 후에 이미지가 나타나게 됩니다.

그러면 에러를 처리하거나 하면 어떻게 해야될까요?

<br>

```swift

// 조건문을 사용한 에러처리 방법
struct ContentView: View {
    // MARK: - PROPERTY
    var imageURL = "https://avatars.githubusercontent.com/u/120264964?v=4"
    // MARK: - BODY
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { phase in
            if let image = phase.image {
                image // Displays the loaded image.
            } else if phase.error != nil {
                Color.red // Indicates an error.
            } else {
                Color.blue // Acts as a placeholder.
            }
        }
    }
}

// switch case를 이용한 에러처리 방법
struct AsyncImageView: View {
    var imageURL =  "https://avatars.githubusercontent.com/u/120264964?v=4"
    
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { phase in
            switch phase {
            case .empty:
                ProgressView()
            case .success(let image):
                image
                    .resizable()
                    .scaledToFit()
            case .failure(_):
                Image(systemName: "exclamationmark.icloud")
            @unknown default:
                EmptyView()
            }
        }
    }
}
```

<br>

다음과 같이 사용하면 에러 처리를 해 줄 수 있습니다.

<br><br>

## KingFisher

Kingfisher는 이미지 다운로드와 캐싱을 용이하게 만드는 강력한 라이브러리로, URL 기반의 이미지 로딩, 캐싱, 프리로딩 및 다양한 이미지 처리 옵션을 제공합니다.

Kingfisher 공식 문서에서 제공하는 특징으로는

- 비동기 이미지 다운로드 및 캐싱.

- URLSession기반 네트워킹 또는 로컬 제공 데이터 에서 이미지를 로드합니다.

- 유용한 이미지 프로세서와 필터가 제공됩니다.

- 메모리와 디스크 모두를 위한 다중 계층 하이브리드 캐시.

- 캐시 동작을 미세하게 제어합니다. 만료 날짜 및 크기 제한을 사용자 정의할 수 있습니다.

- 성능 향상을 위해 다운로드를 취소하고 이전에 다운로드한 콘텐츠를 자동으로 재사용합니다.

- 독립 구성 요소. 필요에 따라 다운로더, 캐싱 시스템, 이미지 프로세서를 별도로 사용하세요.

- 이미지를 미리 가져오고 캐시에서 표시하여 앱을 강화합니다.

- UIImageView, NSImageView, NSButton, UIButton, NSTextAttachment, WKInterfaceImage, TVMonogramView및 CPListItemURL에서 이미지를 직접 설정하는 확장자입니다.

- 이미지 설정 시 내장된 전환 애니메이션.

- 이미지를 로드하는 동안 사용자 정의 가능한 자리 표시자 및 표시기.

- 이미지 처리 및 이미지 포맷을 쉽게 확장할 수 있습니다.

- 저데이터 모드 지원.

- SwiftUI 지원.

<br><br>

### 설치

cocoapod

> pod 'Kingfisher'

swift package

> https://github.com/onevcat/Kingfisher.git

<br><br>

### 간단 사용 예제

<br>

```swift
import Kingfisher

struct KingFisher: View {
    // MARK: - PROPERTY
    let imageURL = "https://avatars.githubusercontent.com/u/120264964?v=4"
    
    // MARK: - BODY
    var body: some View {
        KFImage(URL(string: imageURL))
            .frame(width: 100, height: 100)
    }
}
```

<br>

kingfisher를 사용하면 바로 이미지에 Modifier를 사용할 수 있습니다.

그러면 오류를 처리하기 위해선 어떻게 해야 할 까요?

<br>

```swift
struct KingFisher: View {
    // MARK: - PROPERTY
    let imageURL = "https://avatars.githubusercontent.com/u/120264964?v=4"
    
    // MARK: - BODY
    var body: some View {
        VStack {
            Text("KingFisher")
            KFImage(URL(string: imageURL))
                .onFailure({ error in
                    print("Error : \(error)")
                })
                .resizable()
                .frame(width: 100, height: 100)
        }
    }
}
```

<br>

다음과 같이 사용하면 오류 처리를 할 수 있습니다.

Kingfisher 에서는 우리가 일반적으로 사용하는 Modifier 외에도 일부 다른 Modifier도 사용가능 합니다.

<br>

```swift
    KFImage(URL(string: imageURL))
        .placeholder {
            // Placeholder while downloading.
            Image(systemName: "arrow.2.circlepath.circle")
                    .font(.largeTitle)
                    .opacity(0.3)
        }
        .retry(maxCount: 3, interval: .seconds(5))
        .onSuccess { r in
            // r: RetrieveImageResult
            print("success: \(r)")
        }
        .onFailure { e in
            // e: KingfisherError
            print("failure: \(e)")
        }
```

<br>

또한 리스트에 넣어서 관리 할 수도 있습니다.

<br>

```swift
List {
    ForEach(0..<10) { i in
        KFImage(self.urls[i])
            .cancelOnDisappear(true)
}
```

<br><br>

## 그래서 두개가 뭐가 다를까?

1. 캐싱: Kingfisher는 이미지 캐싱에 있어서 매우 강력합니다. 디스크 및 메모리 캐싱을 지원하며, 맞춤 설정도 가능합니다. 반면, AsyncImage는 기본적인 캐싱만 제공합니다.

2. 이미지 처리 및 변환: Kingfisher는 이미지를 로드하기 전이나 후에 다양한 처리를 할 수 있는 옵션을 제공합니다. AsyncImage는 이러한 추가 기능이 없습니다.

3. UI 커스터마이징: AsyncImage는 로딩 및 에러 상태에 대한 간단한 커스터마이징을 제공하지만, Kingfisher는 더 많은 커스터마이징 옵션을 제공합니다.

4. 성능: AsyncImage는 시스템에 통합되어 있어 빠른 성능을 제공합니다. 하지만 Kingfisher는 고급 기능을 많이 사용할수록 성능이 다소 떨어질 수 있습니다.

<br><br>

## 결론

- 간단한 사용 목적이라면 AsyncImage가 적합할 수 있습니다.

- 복잡하거나 고급 기능이 필요한 경우 Kingfisher가 더 나은 선택일 수 있습니다.

<br><br>

## 참고

[Kingfisher 공식문서](https://github.com/onevcat/Kingfisher/wiki/SwiftUI-Support)
[Apple async Image 공식문서](https://developer.apple.com/documentation/swiftui/asyncimage)

<br><br>

```toc
```