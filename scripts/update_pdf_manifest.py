import os
import json
from datetime import datetime

def get_file_size(file_path):
    size = os.path.getsize(file_path)
    if size < 1024:
        return f"{size} B"
    elif size < 1024 * 1024:
        return f"{size/1024:.1f} KB"
    else:
        return f"{size/(1024*1024):.1f} MB"

def get_category_from_name(filename):
    """파일명의 대괄호 접두어를 기반으로 카테고리 판별"""
    if '[보고]' in filename:
        return 'reports'
    elif '[회의]' in filename:
        return 'meetings'
    elif '[사장님피드백]' in filename:
        return 'feedback'
    elif '[참고]' in filename:
        return 'references'
    return 'references' # 기본값

def update_manifest():
    base_path = "./assets/pdf"
    data_path = "./data/pdf-data.js"
    
    # 지원 확장자 확대
    valid_extensions = ('.pdf', '.xlsx', '.xls', '.html', '.htm', '.png', '.jpg', '.jpeg')
    
    manifest = {
        "description": "문서 데이터 - 로컬 파일 및 외부 링크 정보를 포함합니다.",
        "lastUpdated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "files": []
    }

    # 1. 파일 시스템 스캔 (assets/pdf 폴더 및 하위 폴더)
    if os.path.exists(base_path):
        for root, dirs, files in os.walk(base_path):
            for file in files:
                if file.lower().endswith(valid_extensions):
                    full_path = os.path.join(root, file)
                    # 상대 경로 계산
                    rel_path = os.path.relpath(full_path, os.getcwd()).replace('\\', '/')
                    if not rel_path.startswith('./'):
                        rel_path = './' + rel_path
                        
                    category = get_category_from_name(file)
                    
                    manifest["files"].append({
                        "name": file,
                        "path": rel_path,
                        "category": category,
                        "date": datetime.fromtimestamp(os.path.getmtime(full_path)).strftime("%Y-%m-%d"),
                        "size": get_file_size(full_path),
                        "type": os.path.splitext(file)[1][1:].lower() # 확장자 (pdf, xlsx 등)
                    })

    # 2. 외부 링크 수동 추가 예시 (필요 시 주석 해제하여 사용)
    # manifest["files"].append({
    #     "name": "[참고] 프로젝트 관리 구글 시트",
    #     "path": "https://docs.google.com/spreadsheets/d/your-id/edit",
    #     "category": "references",
    #     "date": "2026-05-12",
    #     "size": "LINK",
    #     "type": "sheet"
    # })

    # JS 파일로 저장 (전역 변수 PDF_DATA 선언)
    js_content = f"// 자동 생성된 데이터 파일 - {manifest['lastUpdated']} 갱신\nconst PDF_DATA = {json.dumps(manifest, indent=2, ensure_ascii=False)};"
    
    # 디렉토리 존재 확인
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    
    with open(data_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Manifest update complete: {len(manifest['files'])} files registered in data/pdf-data.js")

if __name__ == "__main__":
    update_manifest()
