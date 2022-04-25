import mustache from 'mustache'

const html = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
        {{#bundle}}
        <link rel="prefetch" href="/{{.}}">
        {{/bundle}}
        {{#css}}
        <style>
        {{.}}
        </style>
        {{/css}}

        <title></title>
        
        
        {{#data}}
        <script>window.__INITIAL_DATA__ = {{{.}}}</script>
        {{/data}}
    </head>
    <body>
        {{&markup}}
        {{#bundle}}
        <script src="/{{.}}" defer></script>
        {{/bundle}}
    </body>
</html>`

type templateProps = {
  data: string
  markup: string
  bundle?: string[]
}

function templateBuilder({ data, markup, bundle }: templateProps): string {
  return mustache.render(html, {
    data,
    markup: markup,
    bundle: bundle,
  })
}

export default templateBuilder
