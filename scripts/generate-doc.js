const path          = require('path')
const fs            = require('fs')
const Handlebars    = require ('handlebars')

const srcPath       = path.resolve(__dirname, '../src/components')
const tplPath       = path.resolve(__dirname, 'templates')
const destPath      = path.resolve(__dirname, '../.docs')
                                                  

// generation functions
var generateDoc = () => {
  console.log('\x1b[36m%s\x1b[0m', 'Doc generation in progress')
  // first generate doc of typescript
  generateComponentsDocumentation()
  console.log('\x1b[32m%s\x1b[0m', 'Doc generation done')
}

generateComponentsDocumentation = () => {
  emptyFolder(path.resolve(destPath, 'genesys-components'))
  var fileSource = fs.readFileSync(path.resolve(tplPath, 'component.hbs'), 'utf8')
  var doc = JSON.parse(fs.readFileSync(path.resolve(destPath, 'data.json'), 'utf8'))
  for (var i = 0; i < doc.children.length; i++) {
    var componentType = doc.children[i].name.indexOf('rich') === 1 ? 'rich' : doc.children[i].name.indexOf('feature') === 1 ? 'feature' : 'global'
    var data = {
      name: doc.children[i].name,
      props: [],
      methods: [],
      events: []
    }
    // Here !!!
    data.name = data.name.split('/');
    data.name = data.name[data.name.length - 1].replace(/"/g, '').replace(/'/g, '');
    if (!doc.children[i].children) {
      continue
    }
    for (var j = 0; j < doc.children[i].children.length; j++) {
      if (doc.children[i].children[j].kindString === 'Class') {
        if (doc.children[i].children[j].comment && doc.children[i].children[j].comment.tags) {
          data.exampleTag = ''
          data.exampleScript = '""'
          for (var y = 0; y < doc.children[i].children[j].comment.tags.length; y++) {
            if (doc.children[i].children[j].comment.tags[y].tag === 'example') {
              if (!data.exampleTag) {
                data.exampleTag = doc.children[i].children[j].comment.tags[y].text.replace(/\n/g, '')
              } else {
                data.exampleScript = '"' + doc.children[i].children[j].comment.tags[y].text.trim().replace(/\n/g, '\\n').replace(/\"/g, '\'') + '"'
              }
            } else if (doc.children[i].children[j].comment.tags[y].tag === 'description') {
              data.description = doc.children[i].children[j].comment.tags[y].text
            }
          }
        }
        for (var k = 0; k < doc.children[i].children[j].children.length; k++) {
          var item = doc.children[i].children[j].children[k]
          if (item.decorators && item.decorators[0].name === 'Prop') {
            var name = item.name
            var description = item.comment && item.comment.shortText
            var defaultValue = item.defaultValue && item.defaultValue.replace(/['"]+/g, '')
            var type = 'any'
            if (item.type && item.type.name) {
              type = item.type.name
            } else if (item.type && item.type.type === 'union') {
              type = []
              for (var x = 0; x < item.type.types.length; x++) {
                if (item.type.types[x].name !== 'any') {
                  type.push(item.type.types[x].name)
                }
              }
              type = type.join(', ')
            }
            data.props.push({
              name: name,
              type: type,
              description: description,
              defaultValue: defaultValue
            })
          } else if (item.decorators && item.decorators[0].name === 'Method') {
            if (item.signatures) {
              var name = item.signatures[0].name
              var description = item.signatures[0].comment && item.signatures[0].comment.shortText
              var example = null
              if (item.signatures[0].comment && item.signatures[0].comment.tags && item.signatures[0].comment.tags[0].tag === 'example') {
                example = '"' + item.signatures[0].comment.tags[0].text.trim().replace(/\n/g, '\\n').replace(/\"/g, '\'') + '"'
              }
              var params = []
              if (item.signatures[0].parameters) {
                for (var z = 0; z < item.signatures[0].parameters.length; z++) {
                  // TODO add params types
                  params.push({
                    name: item.signatures[0].parameters[z].name
                  })
                }
              }
              data.methods.push({
                name: name,
                description: description,
                params: params,
                example: example
              })
            }
          } else if (item.decorators && item.decorators[0].name === 'Event') {
            var name = item.name
            var description = ''
            var detail = ''
            if (item.comment) {
              if (item.comment.shortText) {
                description = item.comment.shortText
              }
              if (item.comment.tags && item.comment.tags[0].tag === 'returns') {
                detail = item.comment.tags[0].text
              }
            }
            data.events.push({
              name: name,
              description: description,
              detail: detail
            })
          }
        }
      }
    }
    if (fs.existsSync(path.resolve(srcPath, componentType + '/' + data.name + '/README.md'))){
      var mdSource = fs.readFileSync(path.resolve(srcPath, componentType + '/' + data.name + '/README.md'), 'utf8')
      data.mdSource = mdSource
    } else {
      data.mdSource = ''
    }
    var fileResult = Handlebars.compile(fileSource)(data)
    if (!fs.existsSync(path.resolve(destPath, data.name))){
      fs.mkdirSync(path.resolve(destPath, data.name))
    }
    console.log(data.name)
    fs.writeFileSync(path.resolve(destPath, data.name + '/README.md'), fileResult)
  }
}

// Util functions may we could move into a separate file later
kebab2start = (string) => {
  string = string.replace(/-([a-z])/g, (g) =>' ' + g[1].toUpperCase())
  return string.charAt(0).toUpperCase() + string.slice(1)
}

emptyFolder = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      var curPath = path + "/" + file
      if (fs.statSync(curPath).isDirectory()) {
        emptyFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
  }
}

copyFolder = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }
  if (fs.existsSync(source)) {
    fs.readdirSync(source).forEach((file) => {
      var curSource = source + "/" + file
      var curDest = target + "/" + file
      if (fs.statSync(curSource).isDirectory()) {
        copyFolder(curSource, curDest)
      } else {
        fs.writeFileSync(curDest, fs.readFileSync(curSource))
      }
    })
  }
}

// Main loop
if (exports && module && module.parent) {
	exports.run = generateDoc
} else {
  generateDoc()
}
