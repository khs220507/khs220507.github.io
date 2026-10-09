# Chirpy personal site

Official Chirpy 7.6.0 starter and theme.

The STM32 learning series is adapted from the owner's local `embedded-side-project/blog/` documents and checked against the current source files and `LEARNING_PROGRESS.md`. The published index is `/posts/embedded-learning/`. Hardware results are attributed to existing project records; no new board validation was performed during publication. Current UART DMA ring-buffer integration needs hardware revalidation; I2C device responses are unverified and SPI is pending.

Profile, CV, and project content follows `개인자료/CV_Hyunsu_Kim.pdf` (updated September 2026), as requested by the owner. Preserve the source's year-only dates, basic C++ level, GPA without an inferred scale, and exact training periods. Earlier themes and application resumes are not the current content source.

Home uses the original post-list layout. Profile and CV are in _tabs/about.md and _tabs/cv.md, with career data in _data/cv.yml. Projects: _projects/. Posts: _posts/.

Run bundle install and bundle exec jekyll serve. GitHub Actions builds this directory and deploys it to GitHub Pages.
