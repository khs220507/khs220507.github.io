---
title: Raypann Sim — 반도체 공정 시뮬레이터
description: 포토공정 시뮬레이션, CD 예측·EDS 모니터링 UI와 AI 모델 연동을 개발했습니다.
importance: 5
permalink: /projects/raypann-sim/
project_key: raypann-sim
period: null
organization: SPILAB
context: Korea Advanced Nano Fab Center (KANC)
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
