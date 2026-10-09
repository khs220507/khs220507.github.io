---
title: 경력 · CV
icon: fas fa-address-card
order: 2
permalink: /cv/
toc: true
---


{% assign cv = site.data.cv.cv %}
{{ cv.summary }}

## 경력

{% for entry in cv.sections.Experience %}
### {{ entry.company }}

**{{ entry.position }}**

{{ entry.summary }}

{% endfor %}
## 주요 프로젝트

{% for entry in cv.sections.Projects %}
### [{{ entry.name }}]({{ entry.url }})

{{ entry.summary }}

{% endfor %}
## 학력

{% for entry in cv.sections.Education %}
- **{{ entry.institution }}** · {{ entry.area }} {{ entry.studyType }}
{% endfor %}

## 기술

{% for entry in cv.sections.Skills %}
- **{{ entry.name }}** — {{ entry.keywords }}
{% endfor %}

## 교육

{% for entry in cv.sections.Training %}
- **{{ entry.label }}** · {{ entry.details }}
{% endfor %}

## 자격증

{% for entry in cv.sections.Certificates %}
- {{ entry.name }}
{% endfor %}

