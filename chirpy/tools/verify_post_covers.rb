require 'yaml'
require 'date'
require 'pathname'

root = Pathname.new(__dir__).parent.expand_path
posts = root.join('_posts').glob('*.md')
abort 'No posts found' if posts.empty?
errors = []
posts.each do |post|
  begin
    frontmatter = post.read(encoding: 'UTF-8').match(/\A---\r?\n(.*?)\r?\n---/m)
    raise 'missing frontmatter' unless frontmatter
    metadata = YAML.safe_load(frontmatter[1], permitted_classes: [Date, Time], aliases: true)
    image = metadata.fetch('image')
    raise 'image must define path and alt' unless image.is_a?(Hash)
    image_path = image.fetch('path')
    raise 'image.path must use /assets/img/' unless image_path.is_a?(String) && image_path.start_with?('/assets/img/')
    asset = root.join(image_path.delete_prefix('/')).cleanpath
    raise 'image path escapes assets/img' unless asset.to_s.start_with?(root.join('assets/img').to_s + File::SEPARATOR)
    raise 'image file missing or empty' unless asset.file? && asset.size.positive?
    raise 'image.alt is required' unless image['alt'].is_a?(String) && !image['alt'].strip.empty?
  rescue StandardError => error
    errors << "#{post.basename}: #{error.message}"
  end
end
abort errors.join("\n") unless errors.empty?
puts "Verified required thumbnails for #{posts.length} posts."
