---
title: 제조 데이터 기반 수율 예측
description: 제조 데이터 추출·전처리부터 시계열 예측 모델 비교와 주요 변수 분석까지 수행했습니다.
importance: 7
permalink: /projects/yield-prediction/
project_key: yield-prediction
period: null
organization: Nepirity
context: MES · EDS 제조 데이터
---

{% assign project = site.data.cv.cv.sections.Projects | where: 'slug', page.project_key | first %}

**소속 / 구분** · {{ project.organization }}

**협업 기관 / 환경** · {{ project.context }}

{% if project.period %}**기간** · {{ project.period }}{% if project.period_note %} — {{ project.period_note }}{% endif %}{% endif %}

## 수행 내용

{% for point in project.highlights %}
- {{ point }}
{% endfor %}

{% if project.technologies %}
## 개발환경

{{ project.technologies }}
{% endif %}

{% if project.details %}{{ project.details }}{% endif %}
{% if project.repository %}[프로젝트 저장소]({{ project.repository }}){% endif %}

[전체 프로젝트](/projects/) · [경력 · CV](/cv/)
