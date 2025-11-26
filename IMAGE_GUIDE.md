# 이미지 교체 가이드 (Image Replacement Guide)

## 개요
현재 사이트의 AI 생성 이미지를 전문적이고 사실적인 부동산 사진으로 교체하기 위한 가이드입니다.

## 필요한 이미지 목록

### 1. Hero Main Image (메인 히어로 이미지)
- **파일 경로**: `/public/assets/images/hero-main.png`
- **권장 크기**: 1200x1200px (1:1 비율)
- **테마**: 전문적인 한국 부동산 전문가가 현대적인 오피스에서 계약서를 검토하는 모습

**추천 검색어 (Unsplash/Pexels):**
- "korean business professional office"
- "real estate professional documents"
- "business consultant reviewing contract"
- "modern office professional"
- "asian businessman office"

**다운로드 링크:**
- [Unsplash - Business Professionals](https://unsplash.com/s/photos/business-professional-office)
- [Pexels - Real Estate Professional](https://www.pexels.com/search/real%20estate%20professional/)

---

### 2. Feature Analysis (계약 분석 기능)
- **파일 경로**: `/public/assets/images/feature-analysis.png`
- **권장 크기**: 1600x900px (16:9 비율)
- **테마**: 계약서 및 문서 분석, 노트북과 함께 서류를 검토하는 손

**추천 검색어:**
- "contract document analysis"
- "business hands reviewing documents"
- "legal document laptop"
- "professional analyzing contract"
- "document review office"

**다운로드 링크:**
- [Unsplash - Document Review](https://unsplash.com/s/photos/document-review)
- [Pexels - Contract Analysis](https://www.pexels.com/search/contract%20analysis/)

---

### 3. Feature Issue Detection (문제 탐지)
- **파일 경로**: `/public/assets/images/feature-issue.png`
- **권장 크기**: 1600x900px (16:9 비율)
- **테마**: 컴퓨터 모니터에서 중요 사항을 확인하는 비즈니스 여성

**추천 검색어:**
- "businesswoman computer concern"
- "professional reviewing data screen"
- "woman analyzing business report"
- "business professional laptop serious"
- "data analysis professional"

**다운로드 링크:**
- [Unsplash - Business Analysis](https://unsplash.com/s/photos/business-analysis-computer)
- [Pexels - Professional Working](https://www.pexels.com/search/professional%20working%20computer/)

---

### 4. Feature Policy Check (정책 확인)
- **파일 경로**: `/public/assets/images/feature-policy.png`
- **권장 크기**: 1600x900px (16:9 비율)
- **테마**: 회의실에서 팀이 정책 문서를 검토하는 모습

**추천 검색어:**
- "business team meeting conference room"
- "professional meeting documents"
- "corporate team discussion"
- "business people reviewing policy"
- "office teamwork collaboration"

**다운로드 링크:**
- [Unsplash - Team Meeting](https://unsplash.com/s/photos/business-team-meeting)
- [Pexels - Corporate Meeting](https://www.pexels.com/search/corporate%20meeting/)

---

### 5. Feature Date Tracking (날짜 추적)
- **파일 경로**: `/public/assets/images/feature-date.png`
- **권장 크기**: 1600x900px (16:9 비율)
- **테마**: 태블릿이나 달력에서 중요한 날짜를 표시하는 손

**추천 검색어:**
- "professional calendar tablet"
- "business planning schedule"
- "hands marking calendar"
- "deadline planning professional"
- "business schedule management"

**다운로드 링크:**
- [Unsplash - Calendar Planning](https://unsplash.com/s/photos/business-calendar)
- [Pexels - Schedule Planning](https://www.pexels.com/search/schedule%20planning/)

---

## 이미지 다운로드 및 설치 방법

### Step 1: 이미지 다운로드
1. **Unsplash** (https://unsplash.com) 또는 **Pexels** (https://www.pexels.com) 방문
2. 위의 추천 검색어를 사용하여 이미지 검색
3. 마음에 드는 고해상도 이미지를 다운로드 (무료)
4. 이미지 크레딧을 확인하고 필요시 저장해둠

### Step 2: 이미지 최적화
다운로드한 이미지를 다음과 같이 최적화하는 것을 권장합니다:

```bash
# ImageMagick을 사용한 이미지 리사이즈 (옵션)
# brew install imagemagick

# Hero Image (1:1)
convert original-hero.jpg -resize 1200x1200^ -gravity center -extent 1200x1200 hero-main.png

# Feature Images (16:9)
convert original-feature.jpg -resize 1600x900^ -gravity center -extent 1600x900 feature-analysis.png
```

또는 온라인 도구 사용:
- [TinyPNG](https://tinypng.com/) - 이미지 압축
- [Squoosh](https://squoosh.app/) - 이미지 리사이즈 및 최적화

### Step 3: 이미지 배치
최적화된 이미지를 다음 경로에 복사:

```
/public/assets/images/
├── hero-main.png
├── feature-analysis.png
├── feature-issue.png
├── feature-policy.png
└── feature-date.png
```

### Step 4: 개발 서버 재시작
```bash
npm run dev
```

---

## 이미지 선택 팁

### ✅ 좋은 이미지의 특징:
- **고해상도**: 최소 1920px 이상의 너비
- **자연스러운 조명**: 과도한 필터나 후처리가 없는 자연광
- **전문적인 분위기**: 깔끔한 복장, 정돈된 환경
- **한국/아시아 모델**: 타겟 고객과의 연결감 향상
- **현대적인 환경**: 최신 오피스, 깔끔한 인테리어

### ❌ 피해야 할 이미지:
- 너무 포즈가 과한 스톡 사진
- 저해상도 또는 흐릿한 이미지
- 과도한 색보정이나 필터가 적용된 이미지
- 너무 오래되어 보이는 스타일
- 워터마크가 있는 이미지

---

## 대체 이미지 소스

무료 고품질 이미지를 제공하는 추가 사이트:

1. **Unsplash** (https://unsplash.com)
   - 가장 인기있는 무료 이미지 라이브러리
   - 상업적 사용 가능
   - 크레딧 표기 불필요 (권장)

2. **Pexels** (https://www.pexels.com)
   - 비디오도 제공
   - 상업적 사용 가능
   - 크레딧 표기 불필요

3. **Pixabay** (https://pixabay.com)
   - 다양한 이미지와 일러스트
   - 상업적 사용 가능
   - 크레딧 표기 불필요

4. **Burst by Shopify** (https://burst.shopify.com)
   - 비즈니스 중심 이미지
   - 상업적 사용 가능

---

## 라이센스 확인

모든 이미지를 사용하기 전에:
1. 라이센스 확인 (대부분 CC0 또는 Pexels/Unsplash License)
2. 상업적 사용 가능 여부 확인
3. 크레딧 표기 필요 여부 확인
4. 가능하면 이미지 크레딧 정보 저장

---

## 추가 도움

이미지 최적화나 배치에 문제가 있다면:
- Next.js Image 컴포넌트가 자동으로 최적화를 처리합니다
- 큰 이미지도 자동으로 압축되고 최적화됩니다
- WebP 형식으로 자동 변환됩니다

문의사항이 있으시면 개발팀에 연락해주세요!
