
// ══ DATA ══
const P = [
  { id:'teamlead', name:'팀장', role:'프로젝트 총괄·의사결정', group:'리더십', icon:'👤', color:'#185FA5', bg:'#E6F1FB', tc:'#B5D4F4', tt:'#0C447C',
    desc:'전 프로그램 개발 현황·일정을 파악하고 팀 내 보고 자료를 취합합니다. 기술 세부보다 현황 요약, 이슈 트래킹, 일정 달성률이 주 관심사입니다.',
    goals:['전 프로그램 버그·유지보수 현황 모니터링','개발 일정 및 달성률 파악','팀 소개·성과 자료 최신화','신규 기획 방향성 검토'],
    ac:[4,8,20], cats:[3,5,9],
    pains:['요약 뷰 없이 폴더 10개 직접 순회','최신 버전 파일이 _version으로 숨겨져 식별 어려움','같은 정보가 [팀업무]·개별 프로그램 폴더에 중복'],
    scenarios:[
      {lv:'단순',t:'팀 소개 자료(한글·영문·스크립트) 확인',path:'[팀업무] › A.팀 소개 › 2)팀 소개 자료 (3종)',c:4,cat:3,time:'~1분',pain:'없음'},
      {lv:'중간',t:'천지인 + GIS Mapper 버그 현황 한눈에 비교',path:'[팀업무] › C.기능요청 및 Bug관리 › 1)천지인 + 2)GIS Mapper',c:8,cat:5,time:'~4분',pain:'[팀업무] 내 2섹션 이동'},
      {lv:'복잡',t:'팀 전체 개발 현황 종합 (일정+버그+회의록+소개)',path:'[팀업무] B.업무진행(1~4) + C.기능요청 Bug관리(1~4) + 각 프로그램 회의록',c:20,cat:9,time:'~35분',pain:'9개 카테고리 순회, 최신 파일 식별 어려움'},
    ],
    cd:[
      {lv:'단순',c:3,cat:2,time:'~1분',path:'[팀업무] › B.업무진행 › 4)개발현황 (즐겨찾기 직접)',pain:'없음'},
      {lv:'중간',c:6,cat:3,time:'~3분',path:'[팀업무] › B.업무진행 탐색 → 3)일정 오픈 후 재탐색 → 4)개발현황',pain:'3)일정과 4)개발현황 폴더명 유사, 혼동'},
      {lv:'복잡',c:12,cat:5,time:'~10분',path:'[팀업무] A·C 폴더 먼저 → B 1)~3) 순회 → 4)개발현황 발견',pain:'요약 뷰 없어 4개 폴더 순회 후 발견'},
    ]
  },
  { id:'newbie', name:'신입사원', role:'온보딩 중 (3개월 이내)', group:'구성원', icon:'🌱', color:'#3B6D11', bg:'#EAF3DE', tc:'#C0DD97', tt:'#27500A',
    desc:'팀 합류 후 제품군 전체를 처음 파악해야 합니다. 폴더 구조 자체가 낯설고, 어떤 문서가 최신인지, 어디서 찾아야 하는지 모르는 상태입니다.',
    goals:['팀 전체 제품군 개요 파악','온보딩 자료·절차 확인','담당 프로그램 기존 개발 이력 학습','팀 문화·업무 방식 이해'],
    ac:[5,12,22], cats:[4,7,10],
    pains:['어떤 폴더가 최상위 진입점인지 모름','_version, _attach 폴더의 역할이 불명확','최신 파일과 구버전 구분 불가'],
    scenarios:[
      {lv:'단순',t:'팀 소개 자료 1건 찾기',path:'[팀업무] › A.팀 소개 (탐색)',c:5,cat:4,time:'~3분',pain:'폴더 진입점 미숙지'},
      {lv:'중간',t:'천지인 기획 문서 찾기',path:'1.천지인 › B.기획 › 관련 문서 탐색',c:12,cat:7,time:'~10분',pain:'B.기획 내 세부 항목 탐색 시간 소요'},
      {lv:'복잡',t:'팀 전체 제품 개발 현황 파악',path:'1.천지인~21.HmMap 전체 순회',c:22,cat:10,time:'~35분',pain:'11개 대분류 순차 탐색, 최신본 식별 불가'},
    ],
    cd:[
      {lv:'단순',c:7,cat:4,time:'~5분',path:'[팀업무] 진입 → A 탐색 → B 발견',pain:'[팀업무]와 프로그램 폴더 구분 혼동'},
      {lv:'중간',c:14,cat:6,time:'~12분',path:'1.천지인 먼저 탐색 → [팀업무] 이동 → B.업무진행 발견',pain:'프로그램 폴더에 있을 것으로 오인'},
      {lv:'복잡',c:22,cat:9,time:'~35분',path:'전체 대분류 순회 → [팀업무] 발견 → 4)개발현황 도달',pain:'전체 폴더 구조 비숙지, 탐색 반복'},
    ]
  },
  { id:'senior_dev', name:'시니어 개발자', role:'핵심 기능 개발 담당', group:'개발', icon:'💻', color:'#5B3A8C', bg:'#EFE9F8', tc:'#CDBEF0', tt:'#3B2060',
    desc:'특정 프로그램의 핵심 기능을 개발합니다. 기존 소스·설계 문서와 버그 이슈를 빠르게 확인하고, 작업 결과를 팀과 공유해야 합니다.',
    goals:['담당 프로그램 개발 문서 빠른 탐색','버그 이슈 현황 파악 및 업데이트','개발 산출물 업로드 및 버전 관리','타팀 참조 문서 접근'],
    ac:[3,7,15], cats:[2,5,7],
    pains:['_version 폴더에서 최신본 파악 어려움','버그 문서가 [팀업무]와 개별 폴더에 분산','타팀 공유 문서 위치 예측 불가'],
    scenarios:[
      {lv:'단순',t:'담당 프로그램 최신 기능명세서 확인',path:'1.천지인 › C.구현·검증 › 최신 문서',c:3,cat:2,time:'~1분',pain:'없음'},
      {lv:'중간',t:'버그 이슈 목록 + 관련 설계 문서 함께 확인',path:'[팀업무] C.기능요청 Bug관리 + 1.천지인 C.구현',c:7,cat:5,time:'~5분',pain:'두 폴더 이동 필요'},
      {lv:'복잡',t:'릴리즈 준비: 전체 변경 이력·테스트·배포 문서 취합',path:'1.천지인 B.기획·C.구현 + [팀업무] B.업무진행 + 별도 서버',c:15,cat:7,time:'~20분',pain:'다수 폴더 순회, 최신 버전 확인 반복'},
    ],
    cd:[
      {lv:'단순',c:4,cat:2,time:'~2분',path:'[팀업무] › B.업무진행 › 4)개발현황',pain:'없음'},
      {lv:'중간',c:8,cat:4,time:'~6분',path:'1.천지인 탐색 후 [팀업무] 이동',pain:'초기 잘못된 경로로 시간 소요'},
      {lv:'복잡',c:14,cat:6,time:'~12분',path:'[팀업무] 전 폴더 순회 후 발견',pain:'요약 뷰 없어 전 폴더 확인'},
    ]
  },
  { id:'junior_dev', name:'주니어 개발자', role:'기능 구현 보조 (1~2년)', group:'개발', icon:'🔧', color:'#993C1D', bg:'#FAEADE', tc:'#E8A98A', tt:'#6B2510',
    desc:'담당 기능의 코드를 구현하고, 버그를 수정합니다. 설계 문서를 자주 참조하며, 선배가 알려준 경로 외의 폴더 구조는 잘 모릅니다.',
    goals:['구현 참고 문서 탐색','버그 docx 업로드·수정','선배 개발자 코드·문서 참조','팀 미팅 자료 확인'],
    ac:[4,9,17], cats:[3,6,8],
    pains:['알려준 경로 외 폴더 탐색 시 길 잃음','버그 docx 파일 어디에 올려야 할지 불명확','_attachment 폴더에 중요 파일 있는지 모름'],
    scenarios:[
      {lv:'단순',t:'특정 기능 설계 문서 1건 확인',path:'담당 프로그램 › C.구현·검증 › 특정 문서',c:4,cat:3,time:'~2분',pain:'없음'},
      {lv:'중간',t:'버그 수정 후 docx 업로드 + 팀장 공유',path:'[팀업무] C.기능요청 Bug관리 › 담당 프로그램',c:9,cat:6,time:'~8분',pain:'업로드 위치 불명확, 폴더 탐색 반복'},
      {lv:'복잡',t:'신규 기능 구현을 위한 관련 문서 전체 수집',path:'프로그램 B.기획·C.구현 + 공용 라이브러리 + 팀업무',c:17,cat:8,time:'~25분',pain:'관련 폴더 파악 어려움, _attachment 미인지'},
    ],
    cd:[
      {lv:'단순',c:5,cat:3,time:'~3분',path:'[팀업무] › B.업무진행 (경로 안내 받음)',pain:'없음'},
      {lv:'중간',c:10,cat:5,time:'~8분',path:'프로그램 폴더 탐색 후 [팀업무] 이동',pain:'구조 미숙지로 반복 탐색'},
      {lv:'복잡',c:18,cat:7,time:'~20분',path:'전체 탐색 후 [팀업무] B 발견',pain:'전체 폴더 구조 비인지'},
    ]
  },
  { id:'planner', name:'기획자', role:'제품 기획·요건 정의', group:'기획', icon:'📝', color:'#0F6E56', bg:'#DFF0EA', tc:'#9FD3C4', tt:'#0B4E3C',
    desc:'제품의 기능 요건을 정의하고 UI/UX를 기획합니다. 엔지니어의 도메인 로직과 개발자의 구현 내용 사이에서 인터페이스 역할을 합니다.',
    goals:['요건 정의서 작성 및 공유','UI/UX 기획 문서 관리','엔지니어링 로직 이해를 위한 설계 문서 참조','기획 진행 현황 보고'],
    ac:[4,8,16], cats:[3,5,7],
    pains:['엔지니어링 설계 문서 위치 모름','기획 문서와 개발 문서 경계 불명확','완료된 기능 문서와 진행 중 문서 구분 어려움'],
    scenarios:[
      {lv:'단순',t:'최신 UI 기획서 1건 확인',path:'담당 프로그램 › B.기획 › UI 기획서',c:4,cat:3,time:'~2분',pain:'없음'},
      {lv:'중간',t:'엔지니어링 로직 설계서 참조 후 기능명세서 작성',path:'엔지니어링 폴더 탐색 → 기획 폴더로 이동',c:8,cat:5,time:'~7분',pain:'엔지니어링 문서 위치 불명확'},
      {lv:'복잡',t:'전체 기획 진행 현황 취합 (다수 S/W)',path:'여러 S/W 폴더 B.기획 순회 + [팀업무]',c:16,cat:7,time:'~22분',pain:'S/W별 기획 폴더 구조 불일치'},
    ],
    cd:[
      {lv:'단순',c:4,cat:2,time:'~2분',path:'[팀업무] › B.업무진행 › 4)개발현황',pain:'없음'},
      {lv:'중간',c:8,cat:4,time:'~6분',path:'B.기획 탐색 후 [팀업무] 이동',pain:'기획 관련 파일 혼동'},
      {lv:'복잡',c:15,cat:6,time:'~14분',path:'전체 B.기획 폴더 순회 후 [팀업무] 발견',pain:'다수 S/W 순회'},
    ]
  },
  { id:'gis_engineer', name:'GIS 엔지니어', role:'공간정보 설계·분석', group:'엔지니어링', icon:'🌍', color:'#1A6B66', bg:'#E4F4F3', tc:'#9FD0CE', tt:'#124B47',
    desc:'GIS 기반 공간정보 설계·분석을 담당합니다. 좌표계·공간DB 설계, 외부 API 연동 검증이 주 업무입니다.',
    goals:['GIS 데이터 구조 설계 문서 관리','외부 연동 검증 결과 공유','좌표계·공간DB 관련 기술 문서 참조','현장 GIS 성과품 업로드'],
    ac:[3,7,14], cats:[2,5,6],
    pains:['공간정보 관련 문서가 여러 폴더에 분산','첨부 파일(GIS 데이터) 위치 불명확','외부 연동 문서와 내부 설계 문서 혼재'],
    scenarios:[
      {lv:'단순',t:'특정 좌표계 설계 문서 확인',path:'GIS 관련 S/W › B.데이터 설계·구조 탐색',c:3,cat:2,time:'~2분',pain:'없음'},
      {lv:'중간',t:'외부 API 연동 검증 결과 + 관련 설계서 함께 확인',path:'E.연동·검증 + B.데이터 설계·구조 폴더 이동',c:7,cat:5,time:'~6분',pain:'두 카테고리 이동 필요'},
      {lv:'복잡',t:'현장 GIS 성과품 + 연동 이력 + 좌표계 설계서 종합',path:'현장 그룹 + E.연동·검증 + B.설계 순회',c:14,cat:6,time:'~18분',pain:'현장 그룹과 S/W 폴더 분리로 탐색 복잡'},
    ],
    cd:[
      {lv:'단순',c:4,cat:2,time:'~2분',path:'[팀업무] › B.업무진행 › 4)개발현황',pain:'없음'},
      {lv:'중간',c:8,cat:4,time:'~7분',path:'GIS 폴더 탐색 → [팀업무] 이동',pain:'첨부파일에 GIS 데이터 있을 것으로 오인'},
      {lv:'복잡',c:14,cat:6,time:'~15분',path:'여러 GIS S/W 순회 → [팀업무] 발견',pain:'GIS 관련 문서 분산'},
    ]
  },
  { id:'struct_engineer', name:'구조 엔지니어', role:'구조 설계·계산 담당', group:'엔지니어링', icon:'🏗️', color:'#854F0B', bg:'#FAEEDA', tc:'#E8C48A', tt:'#5E3707',
    desc:'교량·터널 등 구조물의 설계 계산과 알고리즘을 담당합니다. 엔지니어링 로직 문서와 현장 성과품을 주로 생성·관리합니다.',
    goals:['구조 계산 알고리즘 문서 관리','현장 설계 성과품 업로드','엔지니어링 기준 문서 참조','구조 해석 결과 검증 문서 관리'],
    ac:[3,8,16], cats:[2,5,7],
    pains:['현장 성과품과 개발 문서 경계 불명확','구조 계산 알고리즘 문서 위치 산발','첨부 파일(계산서·도면) 12종 개별 다운로드'],
    scenarios:[
      {lv:'단순',t:'특정 교량 설계 알고리즘 문서 확인',path:'BridgePlanner › B.엔지니어링 설계 탐색',c:3,cat:2,time:'~2분',pain:'없음'},
      {lv:'중간',t:'현장 성과품 + 관련 알고리즘 문서 함께 확인',path:'현장 그룹 + S/W B.설계 이동',c:8,cat:5,time:'~8분',pain:'현장 그룹과 S/W 폴더 분리'},
      {lv:'복잡',t:'다수 현장 성과품 + 구조 해석 결과 종합',path:'현장 그룹 순회 + STRANA·BridgePlanner 설계 폴더',c:16,cat:7,time:'~25분',pain:'현장별 폴더 개별 탐색, 첨부 파일 다수'},
    ],
    cd:[
      {lv:'단순',c:4,cat:2,time:'~2분',path:'[팀업무] › B.업무진행 › 4)개발현황',pain:'없음'},
      {lv:'중간',c:9,cat:4,time:'~8분',path:'구조 S/W 폴더 탐색 → [팀업무] 이동',pain:'구조 관련 개발현황 혼동'},
      {lv:'복잡',c:16,cat:7,time:'~20분',path:'구조 S/W 전체 + 현장 그룹 순회 → [팀업무]',pain:'다수 폴더 순회, 첨부 12종 확인'},
    ]
  },
  { id:'qa_tester', name:'QA 테스터', role:'품질 검증·테스트', group:'QA', icon:'🔍', color:'#A32D2D', bg:'#FBEAEA', tc:'#E8A5A5', tt:'#721E1E',
    desc:'각 프로그램의 기능 테스트와 버그 검증을 담당합니다. 버그 문서 접근과 테스트 케이스 관리가 주 업무입니다.',
    goals:['버그 이슈 docx 접근 및 업데이트','테스트 케이스 문서 관리','QA 결과 보고서 작성·공유','릴리즈 전 검증 문서 확인'],
    ac:[4,9,18], cats:[3,6,8],
    pains:['버그 docx 위치가 [팀업무]와 S/W 폴더에 혼재','테스트 케이스 최신 버전 식별 어려움','대용량 첨부파일(120MB+) 접근 지연'],
    scenarios:[
      {lv:'단순',t:'특정 버그 이슈 docx 1건 확인',path:'[팀업무] C.기능요청 Bug관리 › 특정 버그',c:4,cat:3,time:'~2분',pain:'없음'},
      {lv:'중간',t:'릴리즈 전 전체 버그 현황 파악',path:'[팀업무] C.기능요청 Bug관리 전체 탐색',c:9,cat:6,time:'~8분',pain:'프로그램별 버그 폴더 개별 확인'},
      {lv:'복잡',t:'QA 완료 보고 — 버그·테스트 케이스·배포 문서 종합',path:'[팀업무] B·C 전체 + S/W E.운영·배포 탐색',c:18,cat:8,time:'~25분',pain:'버그·테스트·배포 문서 분산, 대용량 첨부'},
    ],
    cd:[
      {lv:'단순',c:5,cat:3,time:'~3분',path:'[팀업무] › B.업무진행 › 4)개발현황',pain:'없음'},
      {lv:'중간',c:10,cat:5,time:'~9분',path:'C.Bug관리 탐색 후 B.업무진행 이동',pain:'Bug관리와 업무진행 혼동'},
      {lv:'복잡',c:18,cat:7,time:'~22분',path:'[팀업무] 전체 + S/W E 폴더 순회',pain:'대용량 첨부 접근 지연, 전 폴더 확인'},
    ]
  },
  { id:'ops_manager', name:'운영 담당', role:'서비스 운영·배포 관리', group:'운영', icon:'⚙️', color:'#334155', bg:'#E2E8F0', tc:'#B4C4D4', tt:'#1E293B',
    desc:'서비스 배포, 서버 관리, 운영 매뉴얼을 담당합니다. 서버 정보와 배포 이력 문서를 주로 참조합니다.',
    goals:['서버 환경 설정 문서 관리','배포 이력 문서 접근','서비스 매뉴얼 최신화','장애 대응 이력 관리'],
    ac:[3,7,15], cats:[2,4,6],
    pains:['서버 정보 문서가 개발·운영 폴더에 분산','배포 이력과 서버 설정 문서 경계 불명확','docx+pdf 형식 혼재로 열람 도구 다수'],
    scenarios:[
      {lv:'단순',t:'특정 서버 환경 설정 문서 1건 확인',path:'S/W › D.개발문서 › 서버정보 탐색',c:3,cat:2,time:'~2분',pain:'없음'},
      {lv:'중간',t:'배포 이력 + 서버 설정 함께 확인',path:'E.운영·배포 + D.개발문서 이동',c:7,cat:4,time:'~6분',pain:'두 카테고리 이동'},
      {lv:'복잡',t:'신규 서버 전체 환경 구성 (서버정보 다수 탐색)',path:'D.개발문서 › 서버정보 1-3~1-16 (8종)',c:15,cat:6,time:'~15분',pain:'단일 섹션 내 12종 순차 탐색, docx+pdf 혼재'},
    ],
    cd:[
      {lv:'단순',c:5,cat:2,time:'~2분',path:'[팀업무] › B.업무진행 탐색',pain:'없음'},
      {lv:'중간',c:9,cat:4,time:'~7분',path:'S/W 폴더 먼저 탐색 → [팀업무] 이동',pain:'서버 문서 폴더에 있을 것으로 오인'},
      {lv:'복잡',c:15,cat:5,time:'~15분',path:'S/W 전체 + [팀업무] A→C 순회 → B 발견',pain:'팀업무 폴더 구조 비숙지'},
    ]
  },
  { id:'external', name:'외부 협력사', role:'과업 수행·성과품 납품', group:'외부', icon:'🤝', color:'#5F5E5A', bg:'#F1EFE8', tc:'#C9C8C0', tt:'#3A3930',
    desc:'현장 설계·시공을 담당하는 외부 협력사. TDC 접근 권한은 제한적이며, 성과품 납품과 현장 자료 참조가 주 목적입니다.',
    goals:['현장 성과품 업로드','과업 지시 및 기준 문서 다운로드','납품 현황 확인','현장 회의 자료 공유'],
    ac:[5,12,25], cats:[3,7,10],
    pains:['어떤 폴더에 성과품을 올려야 하는지 불명확','접근 권한 제한으로 탐색 가능 폴더 불명확','내부 폴더 구조가 외부자에게 직관적이지 않음'],
    scenarios:[
      {lv:'단순',t:'특정 현장 성과품 폴더 확인',path:'현장 그룹 › 해당 현장 탐색',c:5,cat:3,time:'~3분',pain:'폴더 구조 비숙지'},
      {lv:'중간',t:'기준 문서 다운로드 + 성과품 업로드',path:'기준 문서 폴더 탐색 + 성과품 폴더 이동',c:12,cat:7,time:'~12분',pain:'두 폴더 이동, 위치 불명확'},
      {lv:'복잡',t:'다수 현장 성과품 납품 현황 확인',path:'현장 그룹 전체 순회',c:25,cat:10,time:'~40분',pain:'현장별 폴더 개별 탐색, 내부 구조 비직관'},
    ],
    cd:[
      {lv:'단순',c:6,cat:3,time:'~4분',path:'현장 그룹 탐색 → 담당자 안내 받음',pain:'없음'},
      {lv:'중간',c:13,cat:6,time:'~12분',path:'내부 폴더 구조 탐색 반복',pain:'내부 구조 비직관적'},
      {lv:'복잡',c:25,cat:9,time:'~40분',path:'다수 폴더 순회, 담당자에게 반복 문의',pain:'접근 권한 한계, 구조 비인지'},
    ]
  }
];

const bcCls = { '단순':'b-s', '중간':'b-m', '복잡':'b-c' };
const pbg   = { '단순':'#EAF3DE', '중간':'#FAEEDA', '복잡':'#FCEBEB' };
const pclr  = { '단순':'#3B6D11', '중간':'#854F0B', '복잡':'#A32D2D' };

// ══ NAV ══
function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'usertest') setTimeout(initUserTest, 100);
  if (id === 'parts') setTimeout(renderParts, 100);
}

// ══ PANEL ══
let activePanel = null;
function openPanel(id) {
  if (id === 'panel-allscenarios') buildAllScenarios();
  if (id === 'panel-cddetail') buildCdDetail();
  if (id === 'panel-partsdetail') buildPartsDetail();
  document.getElementById('overlay').classList.add('open');
  const p = document.getElementById(id);
  if (p) { p.classList.add('open'); activePanel = id; }
}
function closePanel() {
  document.getElementById('overlay').classList.remove('open');
  if (activePanel) document.getElementById(activePanel).classList.remove('open');
  activePanel = null;
}

// ══ USER TEST ══
let activeId = 'teamlead', barChart = null, userInited = false;

function initUserTest() {
  if (userInited) return;
  userInited = true;
  renderGrid();
  sel('teamlead');
  renderBar();
  renderTimeLine();
  renderCdBar();
  renderGapBars();
}

function renderGrid() {
  document.getElementById('persona-grid').innerHTML = P.map(p => `
    <div class="pcard ${p.id === activeId ? 'active' : ''}" onclick="sel('${p.id}')"
      style="${p.id === activeId ? `border-color:${p.color}` : ''}">
      <div class="pcard-icon" style="background:${p.bg}">${p.icon}</div>
      <div class="pcard-group">${p.group}</div>
      <div class="pcard-name">${p.name}</div>
      <span class="pcard-tag" style="background:${p.tc};color:${p.tt}">${p.role}</span>
    </div>`).join('');
}

function sel(id) {
  activeId = id;
  const p = P.find(x => x.id === id);
  renderGrid();
  document.getElementById('detail-title').textContent = `${p.icon} ${p.name} — 프로필`;
  document.getElementById('persona-detail').innerHTML = `
    <div class="pd-header">
      <div class="pd-avatar" style="background:${p.bg}">${p.icon}</div>
      <div><div class="pd-name">${p.name}</div><div class="pd-role">${p.role} · ${p.group}</div></div>
    </div>
    <div class="pd-desc">${p.desc}</div>
    <div>${p.goals.map(g => `<div class="pd-goal">${g}</div>`).join('')}</div>
    <div class="pd-stats">
      <div class="pd-stat"><div class="sv" style="color:${p.color}">${p.ac[0]}</div><div class="sl">단순 클릭</div></div>
      <div class="pd-stat"><div class="sv" style="color:${p.color}">${p.ac[1]}</div><div class="sl">중간 클릭</div></div>
      <div class="pd-stat"><div class="sv" style="color:${p.color}">${p.ac[2]}</div><div class="sl">복잡 클릭</div></div>
    </div>
    <div class="pain-title">주요 Pain Points</div>
    ${p.pains.map(pt => `<div class="pain-item">${pt}</div>`).join('')}`;
  document.getElementById('scenario-title').textContent = `${p.icon} ${p.name} 시나리오 상세`;
  document.getElementById('scenario-list').innerHTML = p.scenarios.map(s => `
    <div class="srow">
      <div class="srow-top">
        <span class="badge ${bcCls[s.lv]}">${s.lv}</span>
        <span class="srow-title">${s.t}</span>
        <div style="display:flex;gap:8px">
          <span class="srow-stat"><strong>${s.c}</strong> 클릭</span>
          <span class="srow-stat"><strong>${s.cat}</strong> 카테고리</span>
          <span class="srow-stat">${s.time}</span>
        </div>
      </div>
      <div class="srow-path">${s.path}</div>
      ${s.pain !== '없음' ? `<span class="srow-pain" style="background:${pbg[s.lv]};color:${pclr[s.lv]}">⚠ ${s.pain}</span>` : ''}
    </div>`).join('');
}

function renderBar() {
  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById('chart-bar'), {
    type: 'bar',
    data: {
      labels: P.map(p => p.name),
      datasets: [
        { label:'단순', data:P.map(p=>p.ac[0]), backgroundColor:'#70AD47', borderRadius:3 },
        { label:'중간', data:P.map(p=>p.ac[1]), backgroundColor:'#FFC000', borderRadius:3 },
        { label:'복잡', data:P.map(p=>p.ac[2]), backgroundColor:'#E24B4A', borderRadius:3 }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{
        x:{ ticks:{color:'#73726c',font:{size:10},autoSkip:false,maxRotation:40}, grid:{color:'rgba(0,0,0,.05)'} },
        y:{ ticks:{color:'#73726c',font:{size:10}}, grid:{color:'rgba(0,0,0,.05)'}, beginAtZero:true }
      }
    }
  });
}

function renderHeatmap() {
  const levels = ['단순','중간','복잡'];
  const allMax = Math.max(...P.map(p => Math.max(...p.ac)));
  const cols = {
    '단순':['#C7E6B0','#A5D07E','#70AD47'],
    '중간':['#FAD89A','#F7C25E','#EF9F27'],
    '복잡':['#F5AFAF','#EE7070','#E24B4A']
  };
  let html = `<div style="display:grid;gap:3px">
    <div style="display:flex;gap:3px;margin-bottom:2px">
      <div style="width:50px"></div>
      ${P.map(p=>`<div style="flex:1;font-size:9px;color:#73726c;text-align:center;line-height:1.2">${p.name}</div>`).join('')}
    </div>`;
  levels.forEach((lv,li) => {
    html += `<div style="display:flex;align-items:center;gap:3px">
      <div style="width:50px;text-align:right;font-size:10px;color:#73726c;padding-right:5px">${lv}</div>
      ${P.map(p => {
        const v = p.ac[li];
        const idx = Math.min(Math.round((v/allMax)*2),2);
        return `<div style="flex:1;height:22px;border-radius:3px;background:${cols[lv][idx]};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#2c2c2a">${v}</div>`;
      }).join('')}
    </div>`;
  });
  document.getElementById('heatmap-container').innerHTML = html + '</div>';
}

let cdBarChart = null;
function renderCdBar() {
  if (cdBarChart) cdBarChart.destroy();
  cdBarChart = new Chart(document.getElementById('cd-chart-bar'), {
    type:'bar',
    data:{
      labels: P.map(p=>p.name),
      datasets:[
        { label:'단순', data:P.map(p=>p.cd[0].c), backgroundColor:'#70AD47', borderRadius:2 },
        { label:'중간', data:P.map(p=>p.cd[1].c), backgroundColor:'#FFC000', borderRadius:2 },
        { label:'복잡', data:P.map(p=>p.cd[2].c), backgroundColor:'#E24B4A', borderRadius:2 }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ display:false } },
      scales:{
        x:{ ticks:{color:'#73726c',font:{size:10},autoSkip:false,maxRotation:40}, grid:{color:'rgba(0,0,0,.05)'} },
        y:{ ticks:{color:'#73726c',font:{size:10}}, grid:{color:'rgba(0,0,0,.05)'}, beginAtZero:true }
      }
    }
  });
}

function renderGapBars() {
  const gapData = P.map(p => ({ name:p.name, gap: p.cd[2].c - p.cd[0].c, s:p.cd[0].c, c:p.cd[2].c }))
    .sort((a,b) => b.gap - a.gap);
  const maxGap = Math.max(...gapData.map(d=>d.gap));
  document.getElementById('gap-bar-wrap').innerHTML = gapData.map(d => `
    <div class="gap-bar-row">
      <div class="gap-bar-label">${d.name}</div>
      <div class="gap-bar-track">
        <div class="gap-bar-fill" style="width:${(d.gap/maxGap)*100}%;background:${d.gap>=18?'#E24B4A':d.gap>=12?'#FFC000':'#70AD47'}">+${d.gap}</div>
      </div>
      <div class="gap-bar-val">${d.s}→${d.c}</div>
    </div>`).join('');
}

// ══ PANEL BUILDERS ══
function buildAllScenarios() {
  document.getElementById('panel-allscenarios-body').innerHTML = P.map(p => `
    <div style="margin-bottom:22px">
      <div style="display:flex;align-items:center;gap:9px;margin-bottom:9px;padding-bottom:7px;border-bottom:1px solid var(--border)">
        <div style="width:30px;height:30px;border-radius:50%;background:${p.bg};display:flex;align-items:center;justify-content:center;font-size:15px">${p.icon}</div>
        <div>
          <div style="font-size:13px;font-weight:700">${p.name}</div>
          <div style="font-size:11px;color:var(--text3)">${p.role} · ${p.group}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:10px">
          <span style="font-size:11px;color:var(--text2)">단순 <strong>${p.ac[0]}</strong>클릭</span>
          <span style="font-size:11px;color:var(--text2)">중간 <strong>${p.ac[1]}</strong>클릭</span>
          <span style="font-size:11px;color:var(--red)">복잡 <strong>${p.ac[2]}</strong>클릭</span>
        </div>
      </div>
      ${p.scenarios.map(s => `
        <div class="srow" style="margin-bottom:5px">
          <div class="srow-top">
            <span class="badge ${bcCls[s.lv]}">${s.lv}</span>
            <span class="srow-title" style="font-size:11.5px">${s.t}</span>
            <div style="display:flex;gap:7px">
              <span class="srow-stat"><strong>${s.c}</strong>클릭</span>
              <span class="srow-stat">${s.time}</span>
            </div>
          </div>
          <div class="srow-path">${s.path}</div>
          ${s.pain !== '없음' ? `<span class="srow-pain" style="background:${pbg[s.lv]};color:${pclr[s.lv]}">⚠ ${s.pain}</span>` : ''}
        </div>`).join('')}
    </div>`).join('');
}

function buildCdDetail() {
  const burdens = P.map(p => ({
    name:p.name, icon:p.icon, color:p.color,
    burden: p.ac[2] + p.ac[1]*0.5 + p.pains.length*2,
    gap: p.cd[2].c - p.cd[0].c, s:p.cd[0].c, c:p.cd[2].c
  })).sort((a,b)=>b.burden-a.burden);
  const maxBurden = burdens[0].burden;
  document.getElementById('panel-cddetail-body').innerHTML = `
    <div style="margin-bottom:22px">
      <div style="font-size:13px;font-weight:700;margin-bottom:11px">사용자별 종합 접근 부담 지수 (개선 우선순위)</div>
      <p style="font-size:11px;color:var(--text3);margin-bottom:11px">부담 지수 = 복잡 클릭 + 중간 클릭 × 0.5 + Pain Point 수 × 2</p>
      ${burdens.map((d,i) => `
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:7px;font-size:12px">
          <div style="width:18px;height:18px;border-radius:50%;background:${i<3?'#FCEBEB':'#EAF3DE'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:${i<3?'#A32D2D':'#3B6D11'}">${i+1}</div>
          <div style="width:90px">${d.icon} ${d.name}</div>
          <div style="flex:1;height:16px;background:var(--surface2);border-radius:4px;overflow:hidden">
            <div style="width:${d.burden/maxBurden*100}%;height:100%;background:${i===0?'#E24B4A':i<3?'#FFC000':'#70AD47'};border-radius:4px;display:flex;align-items:center;padding-left:7px;font-size:10px;color:#fff;font-weight:700">${d.burden.toFixed(1)}점</div>
          </div>
        </div>`).join('')}
    </div>
    <div style="font-size:13px;font-weight:700;margin-bottom:11px">공통 문서 시나리오 — 전체 상세</div>
    ${P.map(p => `
      <div style="margin-bottom:16px;border:1px solid var(--border);border-radius:11px;overflow:hidden">
        <div style="padding:10px 15px;background:var(--surface2);display:flex;align-items:center;gap:8px">
          <span>${p.icon}</span><strong>${p.name}</strong><span style="font-size:11px;color:var(--text3)">${p.role}</span>
        </div>
        ${p.cd.map(s => `
          <div style="padding:9px 15px;border-bottom:1px solid var(--border)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
              <span class="badge ${bcCls[s.lv]}">${s.lv}</span>
              <span style="font-size:11px;font-weight:600">${s.c}클릭 · ${s.cat}카테고리 · ${s.time}</span>
            </div>
            <div style="font-size:11px;color:var(--text2)">${s.path}</div>
            ${s.pain !== '없음' ? `<span class="srow-pain" style="background:${pbg[s.lv]};color:${pclr[s.lv]}">⚠ ${s.pain}</span>` : ''}
          </div>`).join('')}
      </div>`).join('')}`;
}

function buildPartsDetail() {
  const PARTS = [
    { label:'🛣️ Way Solution', color:'#3B6D11',
      good:['대분류 6개로 구조가 가장 단순 — 최상위 탐색 부담 낮음','_version 파일 비율 3% — 구버전 혼재 문제 가장 적음','알파벳(A/B/C/D) 중분류 체계로 순서 파악 용이'],
      bad:['DWG 파일 431개(54%) — CAD 뷰어 없는 사용자 열람 불가','날짜가 붙은 폴더명 — 최신본 구분 어려움','Temp·아카이브 개념 폴더 부재 — 구버전 도면 정리 기준 없음'] },
    { label:'🌏 천지인', color:'#185FA5',
      good:['docx 파일 341개(51%) — 형식 통일도 3파트 중 최고','_version 파일 비율 1% — 버전 관리 상태 3파트 중 최우수','A.소개/B.기획/C.구현 3단계 계층이 전 프로그램에 일관 적용','첨부파일 보유율 10% — 숨겨진 첨부 탐색 부담 가장 낮음'],
      bad:['대분류 11개(프로그램 수) — 신입사원 어떤 폴더 먼저 봐야 할지 불명확','jpg 54개·mp4 16개·txt 26개 — 미디어·텍스트 파일이 문서와 혼재','[팀업무] 폴더가 프로그램 폴더와 같은 레벨 — 공통 vs 프로그램 구분 모호'] },
    { label:'🏗️ 구조물&STRANA', color:'#854F0B',
      good:['실제 시공 프로젝트 성과물(도면·계산서·사진) 체계적 아카이빙 시도','중분류에 프로젝트명 기반 폴더 구성 — 맥락 파악은 용이'],
      bad:['Temp_ 폴더 3개(Temp_Archive·Temp_Prototype·Temp_지침) — 399개(25%) 미정리','_version 파일 125개(8%) — 구버전이 원본 폴더에 가장 많이 혼재','중분류 57개로 3파트 중 압도적 최다 — 탐색 경로 예측 불가','첨부파일 보유율 33% — _attachment 숨겨진 파일 탐색 부담 최고','pdf·hwp·dwg·xls·jpg·xlsx 혼재 — 열람 소프트웨어 다수 필요','총 용량 39GB·평균 25MB — 다운로드·열람 시간 부담 최고'] }
  ];
  document.getElementById('panel-partsdetail-body').innerHTML = PARTS.map(p => `
    <div style="margin-bottom:22px;border:1px solid var(--border);border-radius:11px;overflow:hidden">
      <div style="padding:13px 17px;background:${p.color};color:#fff;font-size:13px;font-weight:700">${p.label}</div>
      <div style="padding:15px 17px">
        <div style="font-size:12px;font-weight:700;color:var(--green);margin-bottom:7px">✅ 강점</div>
        ${p.good.map(g=>`<div style="font-size:11.5px;color:var(--text2);padding:3px 0 3px 11px;border-left:2px solid var(--green);margin-bottom:4px">${g}</div>`).join('')}
        <div style="font-size:12px;font-weight:700;color:var(--red);margin-top:13px;margin-bottom:7px">⚠ 문제점</div>
        ${p.bad.map(b=>`<div style="font-size:11.5px;color:var(--text2);padding:3px 0 3px 11px;border-left:2px solid var(--red);margin-bottom:4px">${b}</div>`).join('')}
      </div>
    </div>`).join('');
}

// ══ PARTS DATA & CHARTS ══
const PARTS_DATA = {
  way:   { label:'Way Solution',    color:'#3B6D11', total:799,  vrate:3,  arate:19, avg:9.1,  p1:6,  p2:17, p3:63,
    verdict:'폴더 깊이 가장 단순(대분류 6개). _version 비율이 가장 낮아 버전 관리 양호. DWG 파일 집중(54%)으로 CAD 뷰어 없는 사용자는 접근 불가.',
    qrows:[{label:'폴더 계층 명확성',s:4,note:'알파벳 A/B/C 중분류 체계 일관'},{label:'네이밍 일관성',s:3,note:'숫자+알파벳 혼용, 날짜 붙은 폴더'},{label:'버전 관리',s:4,note:'_version 비율 3%—가장 낮음'},{label:'파일 형식 통일',s:2,note:'DWG 54% 편중, hwp·pdf·grm 혼재'},{label:'첨부파일 접근성',s:3,note:'첨부 보유율 19%—중간 수준'},{label:'폴더 구조 단순성',s:4,note:'대분류 6개—3파트 중 가장 적음'}] },
  cheon: { label:'천지인',          color:'#185FA5', total:671,  vrate:1,  arate:10, avg:7.9,  p1:11, p2:23, p3:102,
    verdict:'docx 중심(51%)으로 파일 형식이 가장 통일됨. _version 1%로 버전 관리 최우수. 단, 대분류 11개로 프로그램이 분산되어 있어 신입사원 탐색 어려움.',
    qrows:[{label:'폴더 계층 명확성',s:4,note:'A.소개/B.기획/C.구현 체계 일관'},{label:'네이밍 일관성',s:3,note:'번호+한글 혼용, 일부 불일치'},{label:'버전 관리',s:5,note:'_version 비율 1%—최저'},{label:'파일 형식 통일',s:4,note:'docx 51% 중심—가장 통일됨'},{label:'첨부파일 접근성',s:4,note:'첨부 보유율 10%—가장 낮음'},{label:'폴더 구조 단순성',s:2,note:'대분류 11개—프로그램 분산 많음'}] },
  struct:{ label:'구조물&STRANA',   color:'#854F0B', total:1584, vrate:8,  arate:33, avg:25.1, p1:12, p2:57, p3:155,
    verdict:'3파트 중 파일 수·용량·_version·첨부파일·중분류 수 모두 최다. Temp_ 폴더 399개(25%)가 미정리 상태. 구조 개편이 가장 시급.',
    qrows:[{label:'폴더 계층 명확성',s:2,note:'중분류 57개—과도한 세분화'},{label:'네이밍 일관성',s:2,note:'번호·알파벳·한글 3가지 체계 혼용'},{label:'버전 관리',s:1,note:'_version 125개(8%)—3파트 중 최악'},{label:'파일 형식 통일',s:1,note:'pdf·hwp·dwg·xls·jpg 5종 이상 혼재'},{label:'첨부파일 접근성',s:1,note:'첨부 보유율 33%—3파트 중 최고'},{label:'폴더 구조 단순성',s:1,note:'Temp_ 폴더 3개(399개, 25%) 미정리'}] }
};
const PK = ['way','cheon','struct'];
let partsDonut=null, partsDepth=null, partsInited=false;

function renderParts() {
  if (partsInited) return;
  partsInited = true;
  const D = PARTS_DATA;
  const totals = PK.map(k=>D[k].total);
  const totalAll = totals.reduce((a,b)=>a+b,0);
  const dc = ['#3B6D11','#185FA5','#854F0B'];

  if (partsDonut) partsDonut.destroy();
  partsDonut = new Chart(document.getElementById('parts-donut'),{
    type:'doughnut',
    data:{ labels:PK.map(k=>D[k].label), datasets:[{data:totals,backgroundColor:dc,borderWidth:2,borderColor:'#F4F1ED'}] },
    options:{ cutout:'60%', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
  });
  document.getElementById('parts-legend').innerHTML = PK.map((k,i)=>`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px">
      <div style="width:10px;height:10px;border-radius:2px;background:${dc[i]};flex-shrink:0"></div>
      <span>${D[k].label}</span>
      <span style="margin-left:auto;font-weight:700;font-family:inherit,monospace">${D[k].total.toLocaleString()}</span>
      <span style="font-size:10px;color:var(--text3)">${Math.round(D[k].total/totalAll*100)}%</span>
    </div>`).join('');

  if (partsDepth) partsDepth.destroy();
  partsDepth = new Chart(document.getElementById('parts-depth-chart'),{
    type:'bar',
    data:{
      labels:PK.map(k=>D[k].label),
      datasets:[
        {label:'대분류',data:PK.map(k=>D[k].p1),backgroundColor:'#70AD47',borderRadius:3},
        {label:'중분류',data:PK.map(k=>D[k].p2),backgroundColor:'#FFC000',borderRadius:3},
        {label:'소분류',data:PK.map(k=>D[k].p3),backgroundColor:'#E24B4A',borderRadius:3}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:{size:10},boxWidth:10}}},scales:{x:{ticks:{color:'#73726c',font:{size:11}},grid:{color:'rgba(0,0,0,.05)'}},y:{ticks:{color:'#73726c',font:{size:10}},grid:{color:'rgba(0,0,0,.05)'},beginAtZero:true}}}
  });

  function makeBar(id, data) {
    const max = Math.max(...data.map(d=>d.val),1);
    document.getElementById(id).innerHTML = data.map(d=>`
      <div class="pmc-bar-row">
        <div class="pmc-bar-label">${d.label}</div>
        <div class="pmc-bar-track"><div class="pmc-bar-fill" style="width:${d.val/max*100}%;background:${d.color}">${d.display}</div></div>
        <div class="pmc-bar-num">${d.display}</div>
      </div>`).join('');
  }
  makeBar('parts-version-bars',PK.map(k=>({label:D[k].label,color:{way:'#3B6D11',cheon:'#185FA5',struct:'#854F0B'}[k],val:D[k].vrate,display:`${D[k].vrate}%`})));
  makeBar('parts-attach-bars', PK.map(k=>({label:D[k].label,color:{way:'#3B6D11',cheon:'#185FA5',struct:'#854F0B'}[k],val:D[k].arate,display:`${D[k].arate}%`})));
  makeBar('parts-size-bars',   PK.map(k=>({label:D[k].label,color:{way:'#3B6D11',cheon:'#185FA5',struct:'#854F0B'}[k],val:D[k].avg,  display:`${D[k].avg}MB`})));

  function stars(n){ return Array.from({length:5},(_,i)=>`<div class="qstar ${i<n?'on':'off'}"></div>`).join(''); }
  document.getElementById('parts-quality-grid').innerHTML = PK.map(k=>{
    const d = D[k];
    const avg = +(d.qrows.reduce((s,r)=>s+r.s,0)/d.qrows.length).toFixed(1);
    const vc = avg>=3.5?'#3B6D11':avg>=2.5?'#854F0B':'#A32D2D';
    return `<div class="quality-card">
      <div class="qc-header">
        <div class="qc-title">${d.label} 구조 품질 평가</div>
        <div class="qc-avg" style="color:${vc}">${avg}/5.0</div>
      </div>
      ${d.qrows.map(r=>`<div class="qr-row"><div class="qr-label">${r.label}</div><div class="qstar-row">${stars(r.s)}</div><div class="qr-note">${r.note}</div></div>`).join('')}
      <div style="margin-top:10px;padding:8px 11px;background:var(--surface2);border-radius:7px;font-size:11px;color:var(--text2)">${d.verdict}</div>
    </div>`;
  }).join('');
}


// ══ LINE CHART: 복잡도별 소요 시간 ══
let timeLineChart = null;
function renderTimeLine() {
  if (timeLineChart) timeLineChart.destroy();
  const ctx = document.getElementById('chart-time-line');
  if (!ctx) return;
  timeLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: P.map(p => p.name),
      datasets: [
        { label:'단순(분)', data:[1,3,1,2,2,2,2,2,2,4],   borderColor:'#70AD47', backgroundColor:'rgba(112,173,71,.12)', pointBackgroundColor:'#70AD47', pointRadius:5, pointHoverRadius:7, tension:.35, fill:true },
        { label:'중간(분)', data:[4,10,5,8,7,6,8,8,7,12],  borderColor:'#FFC000', backgroundColor:'rgba(255,192,0,.1)',  pointBackgroundColor:'#FFC000', pointRadius:5, pointHoverRadius:7, tension:.35, fill:true },
        { label:'복잡(분)', data:[35,35,20,25,22,18,25,25,25,40], borderColor:'#E24B4A', backgroundColor:'rgba(226,75,74,.08)', pointBackgroundColor:'#E24B4A', pointRadius:5, pointHoverRadius:7, tension:.35, fill:true }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{ position:'bottom', labels:{ font:{size:10}, boxWidth:12, padding:12 } },
        tooltip:{ callbacks:{ label: c => `${c.dataset.label}: ${c.raw}분` } }
      },
      scales:{
        x:{ ticks:{color:'#73726c',font:{size:10},autoSkip:false,maxRotation:40}, grid:{color:'rgba(0,0,0,.05)'} },
        y:{ ticks:{color:'#73726c',font:{size:10},callback:v=>v+'분'}, grid:{color:'rgba(0,0,0,.05)'}, beginAtZero:true, title:{display:true,text:'소요 시간 (분)',color:'#73726c',font:{size:10}} }
      }
    }
  });
}

// 체크박스 토글
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.check-box').forEach(box => {
    box.addEventListener('click', function() {
      this.classList.toggle('checked');
      const label = this.nextElementSibling;
      if (label) label.classList.toggle('done');
    });
  });
});

// ══ RESIZER ══
document.addEventListener('DOMContentLoaded', () => {
  const resizer = document.getElementById('resizer');
  const sidebar = document.getElementById('sidebar');
  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    resizer.classList.add('resizing');
    document.body.style.cursor = 'col-resize';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    let newWidth = e.clientX;
    if (newWidth < 180) newWidth = 180;
    if (newWidth > 600) newWidth = 600;
    sidebar.style.width = newWidth + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      resizer.classList.remove('resizing');
      document.body.style.cursor = '';
    }
  });
  
  // 기존 showSection 함수 덮어쓰기 (트리 노드 강조를 위함)
  const origShowSection = window.showSection;
  window.showSection = function(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tree-node').forEach(t => t.classList.remove('active'));
    
    const sec = document.getElementById('section-' + id);
    if (sec) sec.classList.add('active');
    
    // 부모 노드들(tree-node)을 찾아 active 처리 및 확장 토글
    if (el) {
        let current = el;
        while(current && current.classList) {
            if(current.classList.contains('tree-node')) {
                current.classList.add('active');
                
                // 만약 자식이 있는 노드라면 확장 상태 토글
                const hasChildren = current.querySelector('.tree-children');
                if (hasChildren) {
                    current.classList.toggle('expanded');
                    const icon = current.querySelector('.toggle-icon');
                    if (icon) {
                        icon.textContent = current.classList.contains('expanded') ? '▼' : '▶';
                    }
                }
                break;
            }
            current = current.parentElement;
        }
    }
    const mainPanel = document.getElementById('mainPanel');
    if (mainPanel) mainPanel.scrollTo(0, 0);
    
    if (id === 'usertest' && window.initUserTest) setTimeout(window.initUserTest, 100);
    if (id === 'parts' && window.renderParts) setTimeout(window.renderParts, 100);
  };
  
  // 최초 로드 시 첫 번째 트리 항목 활성화
  const firstNode = document.querySelector('.tree-node');
  if(firstNode) {
      firstNode.classList.add('active');
  }
});

// ══ TREE TOGGLE ══
function toggleTree(rowElement) {
  const node = rowElement.parentElement;
  node.classList.toggle('expanded');
  const icon = rowElement.querySelector('.toggle-icon');
  if (icon) {
    icon.textContent = node.classList.contains('expanded') ? '▼' : '▶';
  }
}

// ══ SLIDE PANEL TOGGLE ══
function openComparePanel() {
  document.getElementById('compareSlideOverlay').classList.add('active');
  document.getElementById('compareSlidePanel').classList.add('active');
}

function closeComparePanel() {
  document.getElementById('compareSlideOverlay').classList.remove('active');
  document.getElementById('compareSlidePanel').classList.remove('active');
}
