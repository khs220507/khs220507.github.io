import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'
const root = path.dirname(fileURLToPath(import.meta.url))
const vault = path.resolve(root, '../..')
const source = path.join(vault, '블로그')
const output = path.join(root, 'site/content')
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)])
const notes = walk(source).filter(f=>f.endsWith('.md')).map(file => {
  const raw=fs.readFileSync(file,'utf8')
  const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  const meta=match ? yaml.load(match[1]) : {}
  const name=path.basename(file,'.md')
  const slug=meta.slug || ({'통신 프로토콜 비교':'serial-comparison'}[name]) || name.toLowerCase().replaceAll(' ','-')
  const url=name==='index' ? '/' : name==='소개' ? '/about/' : `/posts/${slug}/`
  return {file,name,meta,slug,url,body:match ? raw.slice(match[0].length):raw}
})
for(const n of notes) {
  n.body=n.body.replace(/\[\[([^\]]+)\]\]/g,(_,link)=>{
    const [target,label]=link.split('|')
    const [base,anchor]=target.split('#')
    const found=notes.filter(x=>x.name===path.basename(base).replace(/\.md$/,''))
    if(found.length!==1) throw new Error(`Unresolved note link in ${n.name}: ${link}`)
    return `[${label||base}](${found[0].url}${anchor?'#'+anchor:''})`
  })
}
if(output!==path.resolve(root,'site','content') || !output.startsWith(root+path.sep)) throw new Error('Invalid output path')
fs.rmSync(output,{recursive:true,force:true})
fs.mkdirSync(path.join(output,'posts'),{recursive:true})
for(const n of notes) {
  const meta={...n.meta,title:n.meta.title||n.name}
  let dest
  if(n.name==='index') { dest='profile.md'; meta.build={list:'never',render:'never'} }
  else if(n.name==='소개') { dest='about.md'; meta.url='/about/'; meta.hidemeta=true }
  else {
    dest=`posts/${n.slug}.md`; meta.url=n.url; meta.summary=meta.description||n.body.split('\n\n')[0]
    meta.aliases=[`/기술노트/${n.name.replaceAll(' ','-')}/`]
    if(!meta.date) throw new Error(`Missing date: ${n.name}`)
  }
  fs.writeFileSync(path.join(output,dest),'---\n'+yaml.dump(meta,{lineWidth:-1})+'---\n\n'+n.body)
}
fs.writeFileSync(path.join(output,'search.md'),'---\ntitle: 검색\nlayout: search\nurl: /search/\n---\n')
fs.writeFileSync(path.join(output,'posts/_index.md'),'---\ntitle: 글\ndescription: 장비 통신과 임베디드 개발 노트\n---\n')
fs.mkdirSync(path.join(root,'site/static/images'),{recursive:true})
fs.copyFileSync(path.join(vault,'증명사진.jpg'),path.join(root,'site/static/images/profile.jpg'))
console.log(`Exported ${notes.length} notes to PaperMod`)
