# al-folio migration

Official starter commit: d83066c21e6cdb9c0846e548a499064abe23e0ef
Theme runtime: al_folio_core 1.0.15, CV: al_folio_cv 1.0.2.

Original Hugo sources remain in ../site; deployment now builds this directory.
Public content was migrated from the existing site. Career titles and undated entries are preserved because the older attached application PDF differs from the current profile. No employment dates were inferred. The private application PDF is not included in the public site.

Edit _pages/about.md, _data/cv.yml, _projects/, and _posts/. Build: bundle install; bundle exec jekyll build. GitHub Actions builds and deploys through the Pages artifact workflow.
