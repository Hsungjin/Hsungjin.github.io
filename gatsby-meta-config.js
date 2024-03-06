module.exports = {
  title: `망각의 코딩러`,
  description: `망각의 코딩러의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://hsungjin.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `Hsungjin/Hsungjin.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-D12TP2RG9B', // Google Analytics Tracking ID
  author: {
    name: `황성진`,
    bio: {
      role: `iOS 개발자`,
      description: ['WWDC와 친한', '스스로 학습하는', '소통을 중요시 하는'],
      thumbnail: 'thumbnail.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/Hsungjin`, // `https://github.com/zoomKoding`,
      linkedIn: `https://velog.io/@hsungjin__/posts`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `hsungjin142@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '2023.07 ~ ',
        activity: 'iOS 개발',
        links: {
          github: 'https://github.com/Hsungjin',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2017.03 ~ 2021.02',
        activity: '상명대학교 소프트웨어학과 졸업',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        date: '2019.09 ~ 2019.12',
        activity: 'YOLO를 활용한 포트홀 탐지 어플리케이션 개발',
        links: {
          post: 'https://sj-d.tistory.com/20',
          github: '',
          demo: '',
        },
      },
      {
        date: '2020.03 ~ 2023.06',
        activity: 'YOLO를 활요한 차량 부착형 포트홀 탐지 시스템 개발',
        links: {
          post: 'https://sj-d.tistory.com/28',
          github: '',
          demo: '',
        },
      },
      {
        date: '2023.09 ~ 2024.02',
        activity: '멋쟁이 사자처럼 앱스쿨 3기',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        date: '2023.09 ~ 2023.11',
        activity: 'TouchSchool iOS 앱 개발',
        links: {
          post: '',
          github: 'https://github.com/Hsungjin/TouchSchool',
          appStore: 'https://apps.apple.com/kr/app/touchschool-%ED%84%B0%EC%B9%98-%ED%84%B0%EC%B9%98-%ED%95%99%EA%B5%90%EB%8C%80%ED%95%AD%EC%A0%84/id6474486132',
          demo: '',
        },
      },
      {
        date: '2023.12 ~ 2023.12',
        activity: 'CYC iOS 앱 개발',
        links: {
          post: '',
          github: 'https://github.com/4T2F/CYC/blob/main/README.md',
          demo: '',
        },
      },
      {
        date: '2024.01 ~ 2024.02',
        activity: 'PADO iOS 앱 개발',
        links: {
          post: '',
          github: 'https://github.com/4T2F/PADO/blob/main/README.md',
          appStore: 'https://apps.apple.com/kr/app/pado-%ED%8C%8C%EB%8F%84/id6475384446',
          demo: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'PADO iOS 앱 개발',
        description:
          '안티SNS라는 앱으로 요즘 SNS는 잘나오는 사진, 예쁜사진을 비롯한 자기과시의 느낌이 강한 공간이 되어가고 있습니다. 사람들이 온라인에서 자기 과시만 하고, 그걸 보면서 자신도 모르게  남들과 비교하게 되면서 마음이 편하지 않은걸 느꼈습니다. 상대방이 뭘 얼마나 잘하는지, 어디를 가는지 보여주는 거 말고, 온라인에서도 마치 진짜로 얼굴을 보고 이야기하는 것처럼, 편하고 재밌게 지내고 싶어서  만들게 된 프로젝트 입니다. 그래서 파도는 기존의 SNS와는 다른 새로운 방식의 소통으로 자기과시를 지양하며, 친구의 피드에 추억을 공유하며 꾸며주는 재미를 제공합니다.',
        techStack: ['SwiftUI', 'MVVM', 'KingFisher', 'Firebase', 'Image'],
        thumbnailUrl: 'pado.png',
        links: {
          post: '',
          github: 'https://github.com/4T2F/PADO/blob/main/README.md',
          appStore: 'https://apps.apple.com/kr/app/pado-%ED%8C%8C%EB%8F%84/id6475384446',
          demo: '',
        },
      },
      {
        title: 'TouchSchool iOS 앱 개발',
        description:
          'TouchSchool은 전국 학교 API를 활용해 학교 목록을 받아 Firebase 서버에 업로드 후 자신의 학교에 터치를 통해 순위를 대결하는 게임입니다. iOS 개발을 접하고 처음으로 시작한 프로젝트로 첫 협업, 앱스토어에 출시한 프로젝트 입니다.',
        techStack: ['SwiftUI', 'MVVM', 'RESTful API', 'Firebase'],
        thumbnailUrl: 'touchschool.png',
        links: {
          post: '',
          github: 'https://github.com/Hsungjin/TouchSchool',
          appStore: 'https://apps.apple.com/kr/app/touchschool-%ED%84%B0%EC%B9%98-%ED%84%B0%EC%B9%98-%ED%95%99%EA%B5%90%EB%8C%80%ED%95%AD%EC%A0%84/id6474486132',
          demo: '',
        },
      },
      {
        title: 'CYC iOS 앱 개발',
        description:
          'Check Your Commit(CYC)는 깃허브를 시작한 입장에서 1일 1커밋의 목표를 설정한 사람에게 오늘의 커밋 여부를 API를 통해 불러와 사용자가 까먹지 않고 커밋을 확인하고 독려해주는 앱 입니다. 처음으로 Figma 를 통한 기획부터 시작하여 개발한 프로젝트 입니다.',
        techStack: ['SwiftUI', 'RESTful API'],
        thumbnailUrl: 'cyc.png',
        links: {
          post: '',
          github: 'https://github.com/4T2F/CYC/blob/main/README.md',
          demo: '',
        },
      },
    ],
  },
};
