---
title: STM32 센서 수집·통신 모니터링 시스템
description: 베어메탈 펌웨어의 센서 수집부터 Ethernet·RS-485 통신과 WPF 모니터링까지 연결했습니다.
importance: 1
permalink: /projects/stm32/
project_key: stm32
period: null
organization: 개인 프로젝트
context: C · STM32 · CMSIS · C# WPF
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
