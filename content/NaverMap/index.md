---
emoji: 🔑
title: SwiftUI로 NaverMap 사용하기
date: '2024-01-02 00:00:00'
author: 황성진
tags: API
categories: API
---

<!-- <p align="center">
  <img src="https://github.com/4T2F/ThinkBig/assets/120264964/6e0c20b0-947a-4422-81e0-b9696ee274e2"> <br>
  Happy 2024
</p> -->

## Naver API 발급

[네이버 클라우드 사이트](https://www.ncloud.com)에 접속하여 회원가입, 로그인을 합니다.

로그인 후 콘솔에 들어갑니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/6415d1e2-5cda-4df4-b1c9-f949a6c6208a">
</p>
네이버 지도는 Products & Services에서 AI-Application Service 하위의 AI·NAVER API에 포함되어 있습니다.

해당 API를 선택합니다.

그 다음 API 등록 버튼을 누르고

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/51ca1cea-bf32-4544-ab2f-ebdf63341d2a">
</p>

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/b3f7a140-aba4-4bfb-8439-40c1f1af178a">
</p>

현 예제에서는 Mobile Map 만 사용하므로 체크 하고 Bundel ID를 입력해 줍니다.

이렇게 진행하면 Client ID 값을 받을 수 있습니다.

<br><br>

## 키값 숨기기

보통 로컬환경에서 작업하면 크게 문제가 없지만 깃허브와 같은 환경에 올려 작업하면 키값이 노출되는 문제가 생깁니다.

이것을 방지해주기 위해서는 다음과 같이

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/3214d69e-ce00-439f-a3f1-607e25f9cbbc">
</p>

config파일을 만들어 줍니다.

```swift
// Config.xcconfig 파일 내부
NMFClientId = 발급받은 Naver Client id를 넣어줍니다
```

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/49170565-e63e-442c-b302-4dcffeaaf228">
</p>

그 다음 info.plist에 다음과 같이 $(NMFClientId) 를 넣어준 다음

.gitignore에 Config.xcconfig 을 추가해주면 키값 노출 없이 깃허브에 올릴수 있게 됩니다.

<br><br>

## Cocoapod으로 NavaerMap 설치

터미널을 통해 프로젝트 폴더로 이동합니다.

다음의 명령어를 차례대로 입력합니다.

```
pod init

vi Podfile
```

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/d22e6fa7-0897-4dd4-8dec-e8de6caa4d45">
</p>

저는 추후에 파이어베이스에서 저장된 위치값을 받아올수 있도록 하기 위해 다음과같이 Firebase도 설치하였습니다.

간단하게 NavaeMap만 사용하실분은 Firebase부분 없이 pod 'NMapsMap' 만 사용해 주시면 됩니다.

정상적인 설치가 되었으면 프로젝트 파일을 열고 import NMapsMap 가 정상적으로 작동 되는 것을 볼 수 있습니다.

<br><br>

### 빌드 시 오류 사항

여기서 저와같은 경우에는 빌드를 했을때

> Sandbox: rsync.samba(69150) deny(1) file-read-data 

오류가 발생했었는데 당황하지 마시고 

proejct - buildsetting - User Script Sandboxing 값을 No 로 변경하시면
<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/5adcc22e-e6b9-44ed-9fe9-5701db2c4842">
</p>

<br><br>

## 위치 권한 설정
iOS는 앱이 사용되는 동안 '나의 위치 정보를 제공하겠는가?'에 대한 **세부적인 통제권을 사용자가 소유하고** 있습니다. 따라서 개발자는 다양한 상황에 대한 권한을 사용자에게 요청해야 하고, 사용자가 이를 **허용했을 때 비로소 그 정보에 접근**할 수 있습니다.

- **Privacy - Location When *In Use* Usage Description (iOS 11 이상)**

    → 앱이 *포그라운드에서 실행 중일 때만* 위치 정보에 엑세스

- **Privacy - Location *Always* and When *In Use* Usage Description (iOS 11 이상)**

    → 앱이 *백그라운드에서 실행*되는 동안 위치 정보에 엑세스

- **Privacy - Location Always Usage Description (iOS 11 이전, deprecated)**

    → 앱이 *백그라운드*에서 위치 정보에 엑세스 하고, iOS 11이전의 대상에 배포하는 경우!

- **Privacy - Location Temporary Usage *Description* Dictionary**

    → 앱의 한 부분에서 사용자 위치에 대한 임시 엑세스를 요청하는 *이유*를 설명

- **Privacy - Location Usage Description(mac)**

    → macOS 앱이 사용자의 위치 정보에 엑세스하는 API를 사용하는 경우에만 필요

- **Privacy - Location Default *Accuracy* Reduced (iOS 14 이상)**

    → *위치 정확도*에 대한 **앱의 기본 동작**을 설정하려면 정보 속성 목록에 이 키를 포함할 수 있음

이렇게 다양한 권한 설정이 있는데 주로 사용하는 내용은

**Privacy - Location Default Accuracy Reduced**

**Privacy - Location Always Usage Description**

**Privacy - Location Always and When In Use Usage Description**

이렇게 3가지가 주로 사용된다고 합니다.

이 3가지를 Info.plist를 통해 사용해 주시면 됩니다.

아래는 Info.plist 의 소스 코드 입니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSLocationDefaultAccuracyReduced</key>
	<true/>
	<key>NSLocationAlwaysUsageDescription</key>
	<string>true</string>
	<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
	<string>true</string>
	<key>NMFCliendId</key>
	<string></string>
</dict>
</plist>
```

<br><br>

## NaverMap 사용하기

지금까지 따라오셨으면 NaverMap을 사용하기 위한 기본적인 준비는 완료 되었습니다.

[네이버 공식문서](https://navermaps.github.io/ios-map-sdk/guide-ko/0.html) 공식문서를 보시면 어떤 값을 넣어 사용하는지 이해가 더 잘될거라고 생각됩니다.

### ContentView.swift

ContentView 에서 NaverMap 서브 뷰를 호출해서 사용합니다.

onAppear 부분은 앱이 처음 실행되었을때 위치정보 동의를 얻기위한 함수를 호출하는 부분입니다.

``` swift
import SwiftUI

struct ContentView: View {
    @StateObject var coordinator: Coordinator = Coordinator.shared
    
    var body: some View {
        VStack {
            NaverMap()
                .ignoresSafeArea(.all, edges: .top)
        }
        .onAppear {
            Coordinator.shared.checkIfLocationServiceIsEnabled()
        }
    }
}

#Preview {
    ContentView()
}
```

<br><br>

### MapView.swift

기본적으로 NaverMap은 UIkit 기반이므로 SwiftUI에서 사용하기 위해서는 UIViewRepresentable 를 사용해야 됩니다.

Coordinator는 SwiftUI-UIKit간의 브릿지 역할을 하는 녀석 입니다.

``` swift
import SwiftUI
import NMapsMap

struct NaverMap: UIViewRepresentable {
    
    func makeCoordinator() -> Coordinator {
        Coordinator.shared
    }
    
    func makeUIView(context: Context) -> NMFNaverMapView {
        context.coordinator.getNaverMapView()
    }
    
    func updateUIView(_ uiView: NMFNaverMapView, context: Context) {}
    
}
```
Coordinator의 경우 UIKit -> SwiftUI로의 데이터 전달이

Coordinator라고 해서 새로운 개념 같지만, 사실상 "delegate"의 역할을 한다고 봐도 무방합니다.

Naver Map에 필요한 Delegate를 사용하기 위해 Coordinator를 사용하려고 합니다.

makeCoordinator() 함수는 말그대로 Cooridnator를 만드는 함수고,
코디네이터 클래스는 UIView -> SwiftUI로의 브릿지 역할을 하는 delegate라고 보면 됩니다.

<br><br>

### Coordinator.swift

각자 코드에 주석을 사용해서 정리 했습니다.

``` swift
import UIKit
import NMapsMap

// - NMFMapViewCameraDelegate 카메라 이동에 필요한 델리게이트,
// - NMFMapViewTouchDelegate 맵 터치할 때 필요한 델리게이트,
// - CLLocationManagerDelegate 위치 관련해서 필요한 델리게이트

class Coordinator: NSObject, ObservableObject,
                         NMFMapViewCameraDelegate,
                         NMFMapViewTouchDelegate,
                         CLLocationManagerDelegate {
    static let shared = Coordinator()
    
    @Published var coord: (Double, Double) = (0.0, 0.0)
    @Published var userLocation: (Double, Double) = (0.0, 0.0)
    
    var locationManager: CLLocationManager?
    let startInfoWindow = NMFInfoWindow()
    
    let view = NMFNaverMapView(frame: .zero)
    
    override init() {
        super.init()
        
        view.mapView.positionMode = .direction
        view.mapView.isNightModeEnabled = true
        
        view.mapView.zoomLevel = 15 // 기본 맵이 표시될때 줌 레벨
        view.mapView.minZoomLevel = 1 // 최소 줌 레벨
        view.mapView.maxZoomLevel = 17 // 최대 줌 레벨
        
        view.showLocationButton = true // 현위치 버튼: 위치 추적 모드를 표현합니다. 탭하면 모드가 변경됩니다.
        view.showZoomControls = true // 줌 버튼: 탭하면 지도의 줌 레벨을 1씩 증가 또는 감소합니다.
        view.showCompass = true //  나침반 : 카메라의 회전 및 틸트 상태를 표현합니다. 탭하면 카메라의 헤딩과 틸트가 0으로 초기화됩니다. 헤딩과 틸트가 0이 되면 자동으로 사라집니다
        view.showScaleBar = true // 스케일 바 : 지도의 축척을 표현합니다. 지도를 조작하는 기능은 없습니다.
        
        view.mapView.addCameraDelegate(delegate: self)
        view.mapView.touchDelegate = self
        
    }
    
    func mapView(_ mapView: NMFMapView, cameraWillChangeByReason reason: Int, animated: Bool) {
        // 카메라 이동이 시작되기 전 호출되는 함수
    }
    
    func mapView(_ mapView: NMFMapView, cameraIsChangingByReason reason: Int) {
        // 카메라의 위치가 변경되면 호출되는 함수
    }
    
    // MARK: - 위치 정보 동의 확인
    
    /*
     ContetView 에서 .onAppear 에서 위치 정보 제공을 동의 했는지 확인하는 함수를 호출한다.
     위치 정보 제공 동의 순서
     1. MapView에서 .onAppear에서 checkIfLocationServiceIsEnabled() 호출
     2. checkIfLocationServiceIsEnabled() 함수 안에서 locationServicesEnabled() 값이 true인지 체크
     3. true일 경우(동의한 경우), checkLocationAuthorization() 호출
     4. case .authorizedAlways(항상 허용), .authorizedWhenInUse(앱 사용중에만 허용) 일 경우에만 fetchUserLocation() 호출
     */

    func checkLocationAuthorization() {
        guard let locationManager = locationManager else { return }
        
        switch locationManager.authorizationStatus {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .restricted:
            print("위치 정보 접근이 제한되었습니다.")
        case .denied:
            print("위치 정보 접근을 거절했습니다. 설정에 가서 변경하세요.")
        case .authorizedAlways, .authorizedWhenInUse:
            print("Success")
            
            coord = (Double(locationManager.location?.coordinate.latitude ?? 0.0), Double(locationManager.location?.coordinate.longitude ?? 0.0))
            userLocation = (Double(locationManager.location?.coordinate.latitude ?? 0.0), Double(locationManager.location?.coordinate.longitude ?? 0.0))
            
            fetchUserLocation()
            
        @unknown default:
            break
        }
    }
    
    func checkIfLocationServiceIsEnabled() {
        DispatchQueue.global().async {
            if CLLocationManager.locationServicesEnabled() {
                DispatchQueue.main.async {
                    self.locationManager = CLLocationManager()
                    self.locationManager!.delegate = self
                    self.checkLocationAuthorization()
                }
            } else {
                print("Show an alert letting them know this is off and to go turn i on")
            }
        }
    }
    
    // MARK: - NMFMapView에서 제공하는 locationOverlay를 현재 위치로 설정
    func fetchUserLocation() {
        if let locationManager = locationManager {
            let lat = locationManager.location?.coordinate.latitude
            let lng = locationManager.location?.coordinate.longitude
            let cameraUpdate = NMFCameraUpdate(scrollTo: NMGLatLng(lat: lat ?? 0.0, lng: lng ?? 0.0), zoomTo: 15)
            cameraUpdate.animation = .easeIn
            cameraUpdate.animationDuration = 1
            
            let locationOverlay = view.mapView.locationOverlay
            locationOverlay.location = NMGLatLng(lat: lat ?? 0.0, lng: lng ?? 0.0)
            locationOverlay.hidden = false
            
            locationOverlay.icon = NMFOverlayImage(name: "location_overlay_icon")
            locationOverlay.iconWidth = CGFloat(NMF_LOCATION_OVERLAY_SIZE_AUTO)
            locationOverlay.iconHeight = CGFloat(NMF_LOCATION_OVERLAY_SIZE_AUTO)
            locationOverlay.anchor = CGPoint(x: 0.5, y: 1)
            
            view.mapView.moveCamera(cameraUpdate)
        }
    }
    
    func getNaverMapView() -> NMFNaverMapView {
        view
    }
    
    // 마커 부분의 lat lng를 init 부분에 호출해서 사용하면 바로 사용가능하지만
    // 파이어베이스 연동의 문제를 생각해서 받아오도록 만들었습니다.

    func setMarker(lat : Double, lng:Double) {
        let marker = NMFMarker()
        marker.iconImage = NMF_MARKER_IMAGE_PINK
        marker.position = NMGLatLng(lat: lat, lng: lng)
        marker.mapView = view.mapView
        
        let infoWindow = NMFInfoWindow()
        let dataSource = NMFInfoWindowDefaultTextSource.data()
        dataSource.title = "서울특별시청"
        infoWindow.dataSource = dataSource
        infoWindow.open(with: marker)
    }
}

```

<br><br>

## Firebase와의 연동

[Firebase 연동방법](https://dev-workplace.tistory.com/9) 다음 블로그를 참고해서 Firebase를 연동해 주어야 됩니다!

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/638d4c3d-144e-421a-850c-83a2214e0f9a">
</p>

제가 사용한 데이터베이스의 구조 입니다.

코드를 통해 let, lng 값을 불러와 사용합니다.

<br><br>

### ContentView.swift

파이어 베이스를 사용해서 위도 경도 값을 불러오는데 비동기로 코드를 작성해서 값이 불러와진 상태에서 작업할 수 있도록 수정했습니다.

``` swift
import SwiftUI

struct ContentView: View {
    @StateObject var coordinator: Coordinator = Coordinator.shared
    @StateObject var firestoreManager = FireStoreManager()
    
    var body: some View {
        ZStack {
            VStack {
                NaverMap()
                    .ignoresSafeArea(.all, edges: .top)
            }
            Spacer()

        }
        .onAppear {
            Coordinator.shared.checkIfLocationServiceIsEnabled()
            Task {
                await firestoreManager.fetchData()
                Coordinator.shared.setMarker(lat: firestoreManager.mylat, lng: firestoreManager.mylng)
            }
        }
    }
}
```

<br><br>

### FireStoreManager.swift

FireStoreManager는  ObservableObject를 따르도록 만들어 줍니다.

fetchData는 Firebase에 올라간 데이터에 접근해서 lat, leg를 불러오는 함수 입니다.

@Published 로 사용해서 ContentView에서도 접근할수 있도록 선언해 주었고,

let docRef = db.collection("freeboard").document("EBvvECgiQidPmdWf0Byq")

collection에는 컬렉션 이름을 document에는 document 값을 넣어줍니다.

여기서 읽어와야 될 데이터 정보가 lat, lng 이기 떄문에 

> self.mylat = data["lat"] as? Double ?? 0 <br>
> self.mylng = data["lng"] as? Double ?? 0

다음과 같이 사용해 주었습니다.

``` swift
import Foundation
import FirebaseFirestore

class FireStoreManager: ObservableObject {
    @Published var mylat: Double = 0
    @Published var mylng: Double = 0
    
    func fetchData() async {
        let db = Firestore.firestore()
        let docRef = db.collection("freeboard").document("EBvvECgiQidPmdWf0Byq")
        
        do {
            let document = try await docRef.getDocument()
            if document.exists {
                if let data = document.data() {
                    self.mylat = data["lat"] as? Double ?? 0
                    self.mylng = data["lng"] as? Double ?? 0
                    print(self.mylat)
                    print(self.mylng)
                }
            }
        } catch {
            print("Error fetching document: \(error)")
        }
    }
}
```

<br><br>

### NaverMapApp.swift

Firebase 사용을 위해 Firebase에서 제공해주는 예시를 추가한 코드 입니다.

```swift
import SwiftUI
import FirebaseCore


class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        FirebaseApp.configure()
        
        return true
    }
}

@main
struct NaverMapApp: App {
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
            }
        }
    }
}
```

<br><br>

다음과 같이 코드를 작성해서 넣어주면 파이어 베이스에서 위도 경도를 읽어들여 마커가 찍히는 것을 볼수 있습니다.

<p align="center">
  <img src="https://github.com/Hsungjin/Hsungjin.github.io/assets/120264964/0fe92e7e-4cf9-4278-99b2-056abb3bf156">
</p>

막상 코드를 보면 이해가 되었는데 역시 글로 쓰면서 설명하는건 쉽지 않은것 같습니다.

## 전체 코드
[깃허브 소스코드](https://github.com/Hsungjin/SwiftUI-Study/tree/main/NaverMap/NaverMap) 전체 소스 코드입니다.

<br><br>

## 참고 블로그
[[iOS/Swift] 네이버 지도(Maps) 사용하기](https://jeong9216.tistory.com/198)
[SwiftUI Firebase firestore 연동 (2)](https://dev-workplace.tistory.com/9)

```toc
```