import mustache from 'mustache'

const html = `<div class="page">
  <div class="container">
    <header class="header">
      <div class="logo">
        Logo
      </div>
      <div class="navigation">
        {{&navMenu}}
      </div>
    </header>

    <div class="main-body">
      <aside class="main-sidebar">
        {{&sideMenu}}
      </aside>
      <div class="main-content">
        {{&content}}
      </div>
    </div>
          
  </div>
  <aside class="main-digest">
    <p>Digest</p>
  </aside>
</div>`

function templateBuilder(content: string): string {
  const res = mustache.render(html, {
    navMenu: '<div id="menu" class="menu_container"></div>',
    sideMenu: '<div id="side-menu" class="menu_container"></div>',
    content: content,
  })
  return res
}

export default templateBuilder
