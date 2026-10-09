---
title: 배달 플랫폼 클론 팀 프로젝트
description: Java·Spring·MySQL 기반 배달 플랫폼 클론 프로젝트에 팀장으로 참여했습니다.
importance: 8
permalink: /projects/delivery-platform/
project_key: delivery-platform
period: 2023.10.20 – 2023.12.07
organization: Acorn Academy
context: 5인 팀 프로젝트
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
