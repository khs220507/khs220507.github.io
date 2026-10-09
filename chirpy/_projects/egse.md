---
title: EGSE 시험 장비·유도탄 모의기
description: 시험 장비와 모의기의 제어·모니터링 GUI, 장비 통신 및 시험 시나리오를 개발했습니다.
importance: 3
permalink: /projects/egse/
project_key: egse
period: 2025.02.01 – 2025.08.29
organization: Vine Telecom
context: LIG Nex1 · Agency for Defense Development (ADD)
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
