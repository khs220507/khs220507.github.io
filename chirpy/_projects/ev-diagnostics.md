---
title: EV 저전압 노드 진단 시뮬레이터
description: 고장 시나리오와 진단 결과를 다루는 UI 및 전류·전압·온도 데이터 시각화를 개발했습니다.
importance: 6
permalink: /projects/ev-diagnostics/
project_key: ev-diagnostics
period: null
organization: SPILAB
context: Hyundai Motor 제안 POC
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
