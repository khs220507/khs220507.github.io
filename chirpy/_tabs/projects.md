---
title: 프로젝트
icon: fas fa-layer-group
order: 3
permalink: /projects/
---

장비 제어부터 임베디드 개발까지, 직접 참여한 프로젝트입니다.

<div id="post-list" class="flex-grow-1 px-xl-1">
{% assign projects = site.projects | sort: 'importance' %}
{% for project in projects %}
<article class="card-wrapper card">
<a href="{{ project.url | relative_url }}" class="post-preview row g-0 flex-md-row-reverse">
<div class="col"><div class="card-body d-flex flex-column">
<h2 class="card-title my-2 mt-md-0">{{ project.title | escape }}</h2>
<p class="text-muted small mb-2">{{ project.organization }}<br>{{ project.context }}</p>
<div class="card-text content mt-0 mb-3"><p>{{ project.description | escape }}</p></div>
</div></div>
</a>
</article>
{% endfor %}
</div>
