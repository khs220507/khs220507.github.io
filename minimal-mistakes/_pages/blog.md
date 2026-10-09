---
layout: archive
title: 개발 노트
permalink: /blog/
redirect_from:
  - /posts/
author_profile: true
---

장비 통신과 임베디드 개발을 기록합니다.

{% for post in site.posts %}
{% include archive-single.html type="list" %}
{% endfor %}
