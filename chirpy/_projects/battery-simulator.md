---
title: Pack Architect — 배터리팩 설계 시뮬레이터
description: 설계 조건에 따른 배터리팩 수명·열·원가 비교와 3D 디지털트윈을 구현했습니다.
importance: 4
permalink: /projects/battery-simulator/
project_key: battery-simulator
period: null
organization: SPILAB
context: UNIST 자문
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
