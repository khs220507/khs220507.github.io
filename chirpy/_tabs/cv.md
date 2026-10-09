---
title: 경력 · CV
icon: fas fa-address-card
order: 2
permalink: /cv/
toc: false
---


{% assign cv = site.data.cv.cv %}
<div class="cv-sheet">
  <header class="cv-hero">
    <p class="cv-eyebrow">ENGINEERING PORTFOLIO · UPDATED {{ cv.updated }}</p>
    <div class="cv-heading-row">
      <div><h2 class="cv-name">{{ cv.name }}</h2><p class="cv-role">{{ cv.english_name }} · {{ cv.label }}</p></div>
      <button class="cv-print" type="button" onclick="window.print()"><i class="fas fa-print" aria-hidden="true"></i> 인쇄 · PDF 저장</button>
    </div>
    <p class="cv-headline">장비와 소프트웨어를 연결합니다.</p>
    <p class="cv-summary">{{ cv.summary }}</p>
    <div class="cv-focus" aria-label="관심 분야">{% for field in cv.research_focus %}<span>{{ field }}</span>{% endfor %}</div>
    <div class="cv-contact"><a href="mailto:{{ cv.email }}"><i class="fas fa-envelope" aria-hidden="true"></i> {{ cv.email }}</a><a href="https://github.com/khs220507"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a></div>
  </header>

  <nav class="cv-jump" aria-label="이력서 항목"><a href="#experience">경력</a><a href="#projects">프로젝트</a><a href="#education">학력</a><a href="#skills">기술</a><a href="#training">교육</a><a href="#certificates">자격증</a></nav>

  <div class="cv-grid">
    <div class="cv-primary">
      <section class="cv-card" aria-labelledby="experience">
        <h2 id="experience"><span class="cv-number">01</span> 경력</h2>
        <div class="cv-timeline">
        {% for entry in cv.sections.Experience %}
          <div class="cv-job"><div class="cv-entry-heading"><h3>{{ entry.company }}</h3><span class="cv-period">{{ entry.period }}</span></div><p class="cv-job-role">{{ entry.position }}{% if entry.department %} · {{ entry.department }}{% endif %}</p><p>{{ entry.summary }}</p></div>
        {% endfor %}
        </div>
      </section>
      <section class="cv-card" aria-labelledby="projects">
        <h2 id="projects"><span class="cv-number">02</span> 주요 프로젝트</h2>
        {% for entry in cv.sections.Projects %}
          <div class="cv-project"><h3><a href="{{ entry.url }}">{{ entry.name }} <span aria-hidden="true">↗</span></a></h3><p class="cv-entry-meta">{{ entry.period }} · {{ entry.organization }}<br>{{ entry.context }}</p><p>{{ entry.summary }}</p><ul class="cv-highlights">{% for point in entry.highlights %}<li>{{ point }}</li>{% endfor %}</ul></div>
        {% endfor %}
      </section>
    </div>
    <div class="cv-secondary">
      <section class="cv-card" aria-labelledby="education">
        <h2 id="education"><span class="cv-number">03</span> 학력</h2>
        {% for entry in cv.sections.Education %}<div class="cv-education"><h3>{{ entry.institution }}</h3><p class="cv-entry-meta">{{ entry.period }}</p><p>{{ entry.area }} · {{ entry.studyType }}</p>{% if entry.details %}<p>{{ entry.details }}</p>{% endif %}</div>{% endfor %}
      </section>
      <section class="cv-card" aria-labelledby="skills">
        <h2 id="skills"><span class="cv-number">04</span> 기술</h2>
        {% for entry in cv.sections.Skills %}
        <div class="cv-skill-group"><h3>{{ entry.name }}</h3><ul class="cv-chips">{% assign skills = entry.keywords | split: ',' %}{% for skill in skills %}<li>{{ skill | strip }}</li>{% endfor %}</ul></div>
        {% endfor %}
      </section>
      <section class="cv-card" aria-labelledby="training">
        <h2 id="training"><span class="cv-number">05</span> 교육</h2>
        {% for entry in cv.sections.Training %}<div class="cv-training"><h3>{{ entry.label }}</h3><p class="cv-entry-meta">{{ entry.period }}</p><p>{{ entry.details }}</p></div>{% endfor %}
      </section>
      <section class="cv-card" aria-labelledby="certificates">
        <h2 id="certificates"><span class="cv-number">06</span> 자격증</h2>
        <ul class="cv-certificates">{% for entry in cv.sections.Certificates %}<li>{{ entry.name }}<span class="cv-credential-meta">{{ entry.issuer }} · {{ entry.year }}</span></li>{% endfor %}</ul>
      </section>
    </div>
  </div>
</div>
