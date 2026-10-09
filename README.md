# khs220507.github.io

김현수의 경력·프로젝트·개발 노트. 공식 **Chirpy 7.6.0** 기반입니다.

- 사이트: https://khs220507.github.io
- 현재 소스: `chirpy/`
- 소개: `chirpy/_tabs/about.md`
- CV: `chirpy/_data/cv.yml`
- 프로젝트: `chirpy/_projects/`
- 기술 글: `chirpy/_posts/`

`chirpy/`에서 `bundle install`, `bundle exec jekyll serve`로 실행합니다.
main에 push하면 GitHub Actions에서 Jekyll 빌드와 검증 후 GitHub Pages로 배포합니다.
이전 소스는 `site/`, `al-folio/`, `minimal-mistakes/`에 보관되어 있으며 배포 대상은 `chirpy/`입니다.
기존 `export-notes.mjs`는 이전 Hugo용이므로 현재 사이트 수정에는 사용하지 않습니다.
