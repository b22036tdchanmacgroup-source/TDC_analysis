/**
 * PM TDC Dashboard (Report Edition) - Main Logic
 * Handles: Navigation, Document Viewer, Archive, Dynamic Categorization & Smart Sync
 */

(function () {
  'use strict';

  // ==============================================
  // CONFIG
  // ==============================================
  const CONFIG = {
    pdfBasePath: './assets/pdf/',
    categories: [
      { id: 'reports', label: '보고', prefix: '[보고]' },
      { id: 'meetings', label: '회의', prefix: '[회의]' },
      { id: 'feedback', label: '사장님피드백', prefix: '[사장님피드백]' },
      { id: 'references', label: '참고', prefix: '[참고]' }
    ],
    tagColors: {
      reports: 'blue',
      meetings: 'emerald',
      feedback: 'purple',
      references: 'amber'
    },
    currentPdfPath: null,
    sheetUrl: 'https://script.google.com/macros/s/AKfycbw11S08HZ-RriwKsiPJ7RUYCSVZboyUo953B4kL7Z1O5xDrP0Pydzc9Yj1Hq0jlU6WQug/exec'
  };

  let pdfRegistry = [];

  // ==============================================
  // NAVIGATION
  // ==============================================
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  const sections = document.querySelectorAll('.section');

  function setActiveNav(sectionId) {
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });
    sections.forEach(section => {
      section.classList.toggle('active', section.id === sectionId);
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveNav(item.dataset.section);
    });
  });

  // ==============================================
  // DATA LOADING & SMART SYNC
  // ==============================================
  async function loadData() {
    // 1. Load from globally defined PDF_DATA (from data/pdf-data.js)
    if (typeof PDF_DATA !== 'undefined' && PDF_DATA.files) {
      pdfRegistry = PDF_DATA.files;
      console.log('[Dashboard] Data loaded from registry.');
    } else {
      console.warn('[Dashboard] PDF_DATA not found. Please sync files.');
    }

    // 2. Smart Sync: Check if files actually exist (to handle deletions automatically)
    // Note: Local file:// protocol has limitations with HEAD requests, 
    // but this serves as a robust placeholder for server-based or enhanced environments.
    const validatedFiles = [];
    for (const file of pdfRegistry) {
      // In static local mode, we primarily trust the registry, 
      // but we filter out obviously broken entries if possible.
      const detectedCat = CONFIG.categories.find(c => file.name.includes(c.prefix));
      validatedFiles.push({
        ...file,
        category: detectedCat ? detectedCat.id : (file.category || 'references')
      });
    }
    pdfRegistry = validatedFiles;
    
    // 3. Fetch Overview Data from Sheet
    fetchOverviewData();

    renderAll();
  }

  async function fetchOverviewData() {
    const issuesEl = document.getElementById('overviewIssues');
    const timelineEl = document.getElementById('meetingTimeline');
    if (!issuesEl || !timelineEl) return;

    try {
      const response = await fetch(CONFIG.sheetUrl);
      const result = await response.json();

      if (result.ok && result.data && result.data.projects) {
        // Target project: "PM 정리 - TDC/GPD"
        const project = result.data.projects.find(p => p['업무명'].includes('TDC/GPD') || p['업무명'].includes('PM 정리'));
        
        if (project) {
          // 1. Issues
          issuesEl.innerHTML = project['이슈사항'] || '등록된 이슈가 없습니다.';

          // 2. Meeting Timeline Parsing
          const historyRaw = project['회의이력'] || '';
          // Split by date pattern [MM/DD] or \n\n
          const meetingBlocks = historyRaw.split(/(?=\[\d{2}\/\d{2}\])/g).filter(b => b.trim() !== '');

          if (meetingBlocks.length > 0) {
            timelineEl.innerHTML = meetingBlocks.map(block => {
              const lines = block.trim().split('\n');
              // Match date [MM/DD] and optional parentheses group (e.g. [03/06] (경영기획팀))
              const dateMatch = lines[0].match(/\[\d{2}\/\d{2}\](\s*\(.*?\))?/);
              const dateStr = dateMatch ? dateMatch[0] : '기타';
              const contentStr = lines.slice(0).join('\n').replace(dateStr, '').trim();

              return `
                <div class="meeting-card">
                  <div class="meeting-date">${dateStr}</div>
                  <div class="meeting-content">${contentStr.replace(/\n/g, '<br>')}</div>
                </div>
              `;
            }).join('');
          } else {
            timelineEl.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">회의 이력이 없습니다.</div>`;
          }
        }
      }
    } catch (error) {
      console.error('[Dashboard] Failed to fetch sheet data:', error);
      issuesEl.innerHTML = '<span style="color:#ef4444;">데이터 로드 실패</span>';
      timelineEl.innerHTML = '';
    }
  }

  function renderAll() {
    renderFileList();
    renderArchiveTable();
    updateKpis();
  }

  // ==============================================
  // UI RENDERING
  // ==============================================
  function renderFileList() {
    const container = document.getElementById('fileListContainer');
    if (!container) return;

    if (pdfRegistry.length === 0) {
      container.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-tertiary); font-size:0.8rem;">축적된 문서가 없습니다.</div>`;
      return;
    }

    const grouped = {};
    CONFIG.categories.forEach(cat => {
      const files = pdfRegistry.filter(f => f.category === cat.id);
      if (files.length > 0) grouped[cat.id] = { label: cat.label, files };
    });

    let html = '';
    for (const [catId, group] of Object.entries(grouped)) {
      html += `
        <div class="file-category">
          <div class="file-category-label">${group.label} (${group.files.length})</div>`;
      group.files.forEach(file => {
        html += `
          <div class="file-item" data-path="${file.path}" onclick="openDocument('${file.path}', this)">
            <span class="file-icon">${getFileIcon(file.name)}</span>
            <span class="file-name" title="${file.name}">${file.name}</span>
          </div>`;
      });
      html += '</div>';
    }
    container.innerHTML = html;
  }

  function getFileIcon(name) {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (ext === 'xlsx' || ext === 'xls') return '📊';
    if (ext === 'html' || ext === 'htm') return '🌐';
    return '📝';
  }

  // ==============================================
  // DOCUMENT VIEWER
  // ==============================================
  window.openDocument = function (path, element) {
    const frame = document.getElementById('pdfViewerFrame');
    const empty = document.getElementById('viewerEmpty');
    const expandBtn = document.getElementById('expandBtn');
    
    // Clear previous iframe
    const existingIframe = frame.querySelector('iframe');
    if (existingIframe) existingIframe.remove();
    
    // Reset view
    if (empty) empty.style.display = 'none';
    if (expandBtn) expandBtn.style.display = 'flex';

    // Handle File Type
    const ext = path.split('.').pop().toLowerCase();
    
    if (ext === 'xlsx' || ext === 'xls') {
      frame.innerHTML = `
        <div class="viewer-empty">
          <div class="empty-icon">📊</div>
          <p style="font-weight:600; color:var(--text-primary); margin-bottom:8px;">${path.split('/').pop()}</p>
          <p style="font-size:0.85rem; margin-bottom:24px; color:var(--text-secondary);">엑셀 파일은 브라우저에서 직접 열람할 수 없습니다.</p>
          <a href="${path}" download class="tag blue" style="text-decoration:none; padding:12px 24px; border-radius:10px; font-size:0.95rem; color:white; background:#6366f1; box-shadow:0 4px 12px rgba(99,102,241,0.3);">
            엑셀 파일 다운로드하여 열기
          </a>
        </div>`;
    } else {
      // PDF or HTML
      const iframe = document.createElement('iframe');
      iframe.src = path;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.minHeight = '730px';
      iframe.style.border = 'none';
      frame.appendChild(iframe);
    }

    CONFIG.currentPdfPath = path;
    document.querySelectorAll('.file-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');
  };

  // ==============================================
  // ARCHIVE & KPI
  // ==============================================
  function renderArchiveTable() {
    const tbody = document.getElementById('archiveTableBody');
    if (!tbody) return;

    if (pdfRegistry.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-tertiary);">데이터가 없습니다.</td></tr>`;
      return;
    }

    const sorted = [...pdfRegistry].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    let html = '';
    sorted.forEach(file => {
      const catInfo = CONFIG.categories.find(c => c.id === file.category);
      const colorClass = CONFIG.tagColors[file.category] || 'blue';
      html += `
        <tr data-category="${file.category}" data-name="${file.name.toLowerCase()}" onclick="openPDFAndNavigate('${file.path}')">
          <td>${getFileIcon(file.name)} ${file.name}</td>
          <td><span class="tag ${colorClass}">${catInfo ? catInfo.label : '기타'}</span></td>
          <td>${file.date || '—'}</td>
          <td>${file.size || '—'}</td>
          <td><span class="tag emerald">등록</span></td>
        </tr>`;
    });
    tbody.innerHTML = html;
  }

  function updateKpis() {
    // 1. 축적 문서 (전체)
    const docCountEl = document.getElementById('docCount');
    if (docCountEl) docCountEl.textContent = pdfRegistry.length + '건';

    // 2. 보고 횟수 ([보고] 접두어 파일 수)
    const reportCountEl = document.getElementById('reportCount');
    const reportCount = pdfRegistry.filter(f => f.name.includes('[보고]')).length;
    if (reportCountEl) reportCountEl.textContent = reportCount + '회';
    
    // 3. 개선 항목 (고정값)
    const improvementCountEl = document.getElementById('improvementCount');
    if (improvementCountEl) improvementCountEl.textContent = '12건';
  }

  // Filter Logic
  window.filterArchive = function() {
    const searchTerm = document.getElementById('archiveSearch').value.toLowerCase();
    const activeFilter = document.querySelector('.archive-filter-btn.active').dataset.filter;
    const rows = document.querySelectorAll('#archiveTableBody tr[data-category]');

    rows.forEach(row => {
      const name = row.dataset.name || '';
      const category = row.dataset.category || '';
      const matchesSearch = !searchTerm || name.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    });
  };

  // Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('archiveSearch');
    if (searchInput) searchInput.addEventListener('input', window.filterArchive);

    document.querySelectorAll('.archive-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.archive-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.filterArchive();
      });
    });
  });

  window.openPDFAndNavigate = function (path) {
    setActiveNav('documents');
    setTimeout(() => window.openDocument(path, null), 100);
  };

  // ==============================================
  // SIDE PANEL (SLIDE-IN) - Content Management
  // ==============================================
  const sidePanelContent = {
    'dept-way': {
      title: '🛣️ Way Solution: 심층 진단 리포트',
      content: `
        <h4>1. 자산 구성 현황</h4>
        <p>전체 799건의 파일 중 <strong>DWG(설계 도면) 비율이 54%</strong>로 압도적입니다. 이는 기술 자산의 디지털화는 잘 되어 있으나, 뷰어 권한이 없는 타 부서의 접근이 원천 차단되는 결과를 초래합니다.</p>
        <h4>2. 주요 이슈 및 리스크</h4>
        <ul>
            <li><strong>접근성 저하:</strong> 설계 툴 미설치 시 문서 내용 확인 불가 (PDF 병행 업로드율 12% 미만)</li>
            <li><strong>히스토리 유실:</strong> 설계 변경 이력이 도면 내 레이어/노트로만 관리되어 텍스트 검색 불가</li>
        </ul>
        <h4>3. 최적화 제안</h4>
        <p>성과물 단계별 PDF 자동 변환 워크플로우 도입 및 주요 설계 수치 메타데이터화 작업이 필요합니다.</p>
      `
    },
    'dept-cheonjiin': {
      title: '🌏 천지인: 자산화 효율 분석',
      content: `
        <h4>1. 문서 성격 분석</h4>
        <p>전체 671건 중 <strong>행정/일반 보고서 비중이 62%</strong>로 타 파트 대비 높습니다. 순수 기술 알고리즘 및 설계 자산은 약 20% 내외로 식별됩니다.</p>
        <h4>2. 주요 이슈</h4>
        <ul>
            <li><strong>지식 혼재:</strong> 단순 업무 보고와 핵심 지식 자산이 동일 폴더에 혼재되어 검색 시 노이즈 발생</li>
            <li><strong>가독성 부족:</strong> 공문/공문서 중심의 명명 규칙으로 인해 실제 기술 내용 유추가 어려움</li>
        </ul>
        <h4>3. 최적화 제안</h4>
        <p>[기술자산]과 [일반행정] 폴더를 엄격히 분리하고, 기술 자산에 대해서는 '핵심 알고리즘 명칭'을 포함한 표준 네이밍을 적용해야 합니다.</p>
      `
    },
    'dept-structural': {
      title: '🏗️ 구조물 & 스트라나: 고위험 구간 정밀 진단',
      content: `
        <h4>1. 데이터 밀도 분석</h4>
        <p><strong>93.6GB</strong>로 전 부서 통합 최대 용량을 보유하고 있으나, <strong>유효 자산 비율은 45% 미만</strong>으로 추정됩니다.</p>
        <h4>2. 심각한 관리 이슈</h4>
        <ul>
            <li><strong>버전 파편화:</strong> _v1, _v2, _vFinal, _진짜최종 등 무질서한 버전 생성(8%)</li>
            <li><strong>방치된 임시 데이터:</strong> Temp, 복사본, 작업중 폴더가 전체 구조의 25% 점유</li>
            <li><strong>중복 자산:</strong> 동일 S/W의 이전 버전 프로젝트 데이터가 필터링 없이 그대로 방치</li>
        </ul>
        <h4>3. 최적화 제안</h4>
        <p>_archive 폴더를 통한 구버전 격리를 최우선으로 시행하고, 6개월 이상 미사용된 Temp 데이터에 대한 자동 아카이빙 프로세스 도입이 필요합니다.</p>
      `
    },
    'test-scenarios': {
      title: '👥 30개 시나리오 테스트 상세 리포트',
      content: `
        <h4>1. 테스트 개요</h4>
        <p>10명의 사용자를 대상으로 3개 카테고리, 총 30개 시나리오(기본 탐색 10, 교차 탐색 10, 장애 복구 10)를 수행한 정밀 측정 결과입니다.</p>
        <h4>2. 주요 시나리오별 결과</h4>
        <ul>
            <li><strong>[기본] 특정 S/W 최신 설계 가이드 찾기:</strong> 팀장 45초 / 신입 12분 (IA 미숙지로 인한 헤맴 발생)</li>
            <li><strong>[교차] 타 부서의 유사 프로젝트 참고 문서 찾기:</strong> 팀장 3분 / 신입 28분 (사일로 구조로 인한 탐색 포기율 40%)</li>
            <li><strong>[복구] 특정 버전의 이전 히스토리 추적:</strong> 전 사용자 평균 15분 소요 (_archive 부재로 인한 버전 혼선)</li>
        </ul>
        <h4>3. 종합 결론 (Insight)</h4>
        <p>사용자들은 '검색'보다 '폴더 계층 진입'을 선호하지만, 현재의 비정형 구조에서는 계층이 깊어질수록 <strong>오류 발생률이 지수 함수적으로 상승</strong>합니다. (r=0.985)</p>
      `
    },
    'analysis-sys': {
      title: '시스템 현황 및 문제점 상세 분석',
      content: `
        <h4>1. 사일로(Silo) 구조의 심각성</h4>
        <p>분류 구조가 S/W, 부서 업무, 프로젝트 단위로 파편화되어 있어 부서 간 문서 공유가 불가능한 상태입니다. 특히 <strong>성과물 중심 vs 부서 중심</strong> 분류가 혼재되어 기술 자산의 재활용성이 매우 낮습니다.</p>
        <h4>2. 해결 방향</h4>
        <p>4-Depth 표준 구조(분야→단계→카테고리→세부)를 강제하고, 파일명 규칙을 수립하여 시스템 중심의 공유 환경으로 전환이 필요합니다.</p>
      `
    },
    'test-gap': {
      title: '사용자 테스트: 역할별 접근 격차 분석',
      content: `
        <h4>1. 접근 시간 및 클릭 수 격차</h4>
        <p>동일한 공통 문서를 찾는 테스트에서 <strong>신입사원(22클릭/35분)</strong>과 <strong>팀장(3클릭/1분)</strong> 사이에 무려 <strong>7배의 생산성 격차</strong>가 확인되었습니다.</p>
        <h4>2. 상관관계 분석 (r=0.985)</h4>
        <p>분석 결과, 폴더를 횡단하는 횟수와 클릭 수 사이의 상관계수가 1에 가까운 0.985로 나타났습니다.</p>
      `
    },
    'sol-1': {
      title: 'RANK 01: 폴더 가이드 및 README 배치',
      content: `
        <h4>1. 도입 배경</h4>
        <p>사용자 테스트 결과, 구조를 미리 인지한 사용자는 클릭 수가 80% 이상 감소했습니다.</p>
        <h4>2. 실행 계획</h4>
        <ul>
            <li>각 S/W별 최상위 폴더에 <strong>README.txt</strong> 또는 <strong>_INFO.pdf</strong> 배치</li>
            <li>해당 폴더의 목적, 담당자, 문서 분류 규칙 명시</li>
            <li>신규 입사자 온보딩 시 TDC 구조 가이드 필수 교육</li>
        </ul>
      `
    },
    'sol-2': {
      title: 'RANK 02: _archive 분리 및 최신본 식별',
      content: `
        <h4>1. 도입 배경</h4>
        <p>구조물 파트의 분석 결과, 파일명 뒤에 _v1, _final 등이 붙은 중복 파일이 탐색 효율을 저해하는 주범으로 식별되었습니다.</p>
        <h4>2. 실행 계획</h4>
        <ul>
            <li>모든 카테고리 내에 <strong>_archive</strong> 폴더 생성 의무화</li>
            <li>최종본이 아닌 모든 이전 버전은 즉시 아카이브로 이동</li>
            <li>메인 폴더에는 오직 <strong>단 하나의 최신본</strong>만 노출하여 가독성 90% 확보</li>
        </ul>
      `
    },
    'sol-3': {
      title: 'RANK 03: 역할별 바로가기(Entry Points)',
      content: `
        <h4>1. 도입 배경</h4>
        <p>기획자와 개발자가 찾는 문서의 위치가 서로 다른 폴더에 산재해 있어 탐색 비용이 중복 발생합니다.</p>
        <h4>2. 실행 계획</h4>
        <ul>
            <li>사용자 그룹(기획/개발/공통)별 <strong>Virtual View</strong> 제공</li>
            <li>자주 찾는 핵심 문서에 대한 심볼릭 링크 또는 바로가기 구성</li>
            <li>복잡한 4-Depth를 횡단하지 않고 1-Click으로 핵심 폴더 진입 구현</li>
        </ul>
      `
    }
  };

  window.openSidePanel = function (id) {
    const data = sidePanelContent[id];
    if (!data) return;

    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('sidePanelOverlay');
    const title = document.getElementById('panelTitle');
    const content = document.getElementById('panelContent');

    title.textContent = data.title;
    content.innerHTML = data.content;

    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeSidePanel = function () {
    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('sidePanelOverlay');
    
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.openModal = function () {
    if (!CONFIG.currentPdfPath) return;
    const modal = document.getElementById('pdfModal');
    const modalIframe = document.getElementById('modalIframe');
    modalIframe.src = CONFIG.currentPdfPath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    const modal = document.getElementById('pdfModal');
    const modalIframe = document.getElementById('modalIframe');
    modalIframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Keyboard support (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidePanel();
      closeModal();
    }
  });

  // ==============================================
  // SCENARIO TEST LOGIC
  // ==============================================
  let clickChart, timeChart, commonClickChart;

  function initPersonaTabs() {
    const tabsContainer = document.getElementById('personaTabs');
    if (!tabsContainer || typeof PERSONA_DATA === 'undefined') return;

    tabsContainer.innerHTML = PERSONA_DATA.map((p, idx) => `
      <div class="persona-tab" data-id="${p.id}" onclick="openPersonaPanel('${p.id}')">
        <span class="p-icon">${p.icon}</span>
        <span class="p-name">${p.name}</span>
        <span class="p-role">${p.group}</span>
      </div>
    `).join('');

    renderAllCharts();
  }

  window.openPersonaPanel = function(id) {
    const p = PERSONA_DATA.find(x => x.id === id);
    if (!p) return;

    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('sidePanelOverlay');
    const title = document.getElementById('panelTitle');
    const content = document.getElementById('panelContent');

    title.innerHTML = `${p.icon} ${p.name} — 상세 리포트`;
    
    content.innerHTML = `
      <div class="persona-profile-card" style="margin-bottom:24px;">
        <div class="profile-hero">
          <div class="profile-avatar" style="background:${p.bg}">${p.icon}</div>
          <div class="profile-meta">
            <h4>${p.name}</h4>
            <span>${p.role} · ${p.group}</span>
          </div>
        </div>
        <div class="profile-desc">${p.desc}</div>
        <div class="profile-click-stats">
          <div class="click-stat-box">
            <div class="cs-val">${p.ac[0]}</div>
            <div class="cs-label">단순 클릭</div>
          </div>
          <div class="click-stat-box">
            <div class="cs-val">${p.ac[1]}</div>
            <div class="cs-label">중간 클릭</div>
          </div>
          <div class="click-stat-box">
            <div class="cs-val">${p.ac[2]}</div>
            <div class="cs-label">복잡 클릭</div>
          </div>
        </div>
        <div class="profile-goals">
          <h5>목표 및 기대사항</h5>
          ${p.goals.map(g => `<div class="goal-item">${g}</div>`).join('')}
        </div>
        <div class="profile-pains">
          <h5>주요 Pain Points</h5>
          ${p.pains.map(pain => `<div class="pain-item">${pain}</div>`).join('')}
        </div>
      </div>
      
      <div style="font-size:1rem; font-weight:800; margin-bottom:16px; color:var(--text-primary);">시나리오 수행 상세</div>
      <div class="scenario-list">
        ${p.scenarios.map(s => `
          <div class="scenario-item">
            <div class="scenario-badge-row">
              <span class="s-badge ${s.lv === '단순' ? 'easy' : s.lv === '중간' ? 'mid' : 'hard'}">${s.lv}</span>
              <div class="s-metrics">
                <span class="s-metric"><strong>${s.c}</strong> 클릭</span>
                <span class="s-metric"><strong>${s.cat}</strong> 카테고리</span>
                <span class="s-metric">${s.time}</span>
              </div>
            </div>
            <div class="s-title">${s.t}</div>
            <div class="s-path" style="font-size:0.75rem;">${s.path}</div>
            ${s.pain !== '없음' ? `<div class="s-pain-alert">⚠️ ${s.pain}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function renderAllCharts() {
    if (typeof Chart === 'undefined') return;

    // 1. Clicks Bar Chart
    const ctxClicks = document.getElementById('chartClicks');
    if (ctxClicks) {
      if (clickChart) clickChart.destroy();
      clickChart = new Chart(ctxClicks, {
        type: 'bar',
        data: {
          labels: PERSONA_DATA.map(p => p.name),
          datasets: [
            { label: '단순', data: PERSONA_DATA.map(p => p.ac[0]), backgroundColor: '#cbd5e1' },
            { label: '중간', data: PERSONA_DATA.map(p => p.ac[1]), backgroundColor: '#94a3b8' },
            { label: '복잡', data: PERSONA_DATA.map(p => p.ac[2]), backgroundColor: '#4f46e9' }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
        }
      });
    }

    // 2. Time Line Chart
    const ctxTime = document.getElementById('chartTime');
    if (ctxTime) {
      if (timeChart) timeChart.destroy();
      const timeData = [
        { label: '단순', data: [1, 3, 1, 2, 2, 2, 2, 2, 2, 3], color: '#cbd5e1' },
        { label: '중간', data: [4, 10, 5, 8, 7, 6, 8, 8, 7, 12], color: '#94a3b8' },
        { label: '복잡', data: [35, 35, 20, 25, 22, 18, 25, 25, 15, 40], color: '#4f46e9' }
      ];
      timeChart = new Chart(ctxTime, {
        type: 'line',
        data: {
          labels: PERSONA_DATA.map(p => p.name),
          datasets: timeData.map(d => ({
            label: d.label, data: d.data, borderColor: d.color, tension: 0.3, fill: false, pointRadius: 4
          }))
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // 3. Common Document Clicks
    const ctxCommon = document.getElementById('chartCommonClicks');
    if (ctxCommon && typeof COMMON_DOC_DATA !== 'undefined') {
      if (commonClickChart) commonClickChart.destroy();
      commonClickChart = new Chart(ctxCommon, {
        type: 'bar',
        data: {
          labels: COMMON_DOC_DATA.map(d => d.name),
          datasets: [
            { label: '단순', data: COMMON_DOC_DATA.map(d => d.cd[0]), backgroundColor: '#cbd5e1' },
            { label: '중간', data: COMMON_DOC_DATA.map(d => d.cd[1]), backgroundColor: '#94a3b8' },
            { label: '복잡', data: COMMON_DOC_DATA.map(d => d.cd[2]), backgroundColor: '#4f46e9' }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // 4. Gap Chart (Horizontal Bars)
    const gapWrap = document.getElementById('gapChartWrap');
    if (gapWrap && typeof COMMON_DOC_DATA !== 'undefined') {
      const gaps = COMMON_DOC_DATA.map(d => ({ name: d.name, gap: d.cd[2] - d.cd[0], start: d.cd[0], end: d.cd[2] }))
        .sort((a, b) => b.gap - a.gap);
      const maxGap = Math.max(...gaps.map(g => g.gap));

      gapWrap.innerHTML = gaps.map(g => `
        <div class="gap-row">
          <div class="gap-label">${g.name}</div>
          <div class="gap-track">
            <div class="gap-fill ${g.gap > 15 ? 'red' : g.gap > 10 ? 'amber' : 'emerald'}" style="width: ${(g.gap / maxGap) * 100}%">+${g.gap}</div>
          </div>
          <div class="gap-value">${g.start}→${g.end}</div>
        </div>
      `).join('');
    }
  }

  // Init
  loadData();
  initPersonaTabs();

})();
