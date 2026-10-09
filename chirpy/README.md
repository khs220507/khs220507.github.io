# Chirpy personal site

Official Chirpy 7.6.0 starter and theme.

The STM32 learning series is adapted from the owner's local `embedded-side-project/blog/` documents and checked against the current source files and `LEARNING_PROGRESS.md`. The published index is `/posts/embedded-learning/`. Hardware results are attributed to existing project records; no new board validation was performed during publication. Current UART DMA ring-buffer integration needs hardware revalidation; I2C device responses are unverified and SPI is pending.

Profile, CV, and projects follow the owner's latest resume, `개인자료/장비 제어 경험과 임베디드 프로젝트 경험을 갖춘 개발자_khs220507-e90.pdf`. This replaces the earlier CV PDF as the content source. Employer names are English. Project-specific dates are shown only when supplied by the document; employment periods are not inferred as project dates. The CV summarizes projects; project details render from the shared CV data. Phone numbers, street address, birth date, and the private PDF are not published.

Home uses the original post-list layout. Profile and CV are in _tabs/about.md and _tabs/cv.md, with career data in _data/cv.yml. Projects: _projects/. Posts: _posts/.

Run bundle install and bundle exec jekyll serve. GitHub Actions builds this directory and deploys it to GitHub Pages.
