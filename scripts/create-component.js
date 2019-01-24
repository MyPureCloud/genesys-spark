const inquirer      = require('inquirer')
const path          = require('path')
const fs            = require('fs')
const Handlebars    = require ('handlebars')

const srcPath       = path.resolve(__dirname, '../src/components')
const tplPath       = path.resolve(__dirname, 'templates/component')

const prefix = 'gux-'
const GLOBAL_PATH = path.resolve(srcPath, 'global')
const RICH__PATH = path.resolve(srcPath, 'rich')
const FEATURE_PATH = path.resolve(srcPath, 'feature')


// Creation functions
createComponentRepository = (componentName, dir) => {
    const target = path.resolve(dir, componentName)
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
        fs.mkdirSync(target + '/stories')
        fs.mkdirSync(target + '/tests')
    } else {
        console.log('\x1b[41m%s\x1b[0m', 'Repository already exist')
    }
}

createComponentStencilFiles = (componentName, componentType, dir) => {
    const tsxTpl = fs.readFileSync(path.resolve(tplPath, 'component.tsx.hbs'), 'utf8')
    const lessTpl = fs.readFileSync(path.resolve(tplPath, 'component.less.hbs'), 'utf8')
    const mdTpl = fs.readFileSync(path.resolve(tplPath, 'README.md.hbs'), 'utf8')
    const storyTpl = fs.readFileSync(path.resolve(tplPath, 'story.tsx.hbs'), 'utf8')
    const specTpl = fs.readFileSync(path.resolve(tplPath, 'component.spec.ts.hbs'), 'utf8')
    const e2eTpl = fs.readFileSync(path.resolve(tplPath, 'component.e2e.ts.hbs'), 'utf8')
    const data = {
        componentName: componentName,
        componentClassName: kebab2start(componentName),
        componentStoryName: kebab2words(componentName),
        componentType: componentType,
        componentPrefix: prefix
    }

    fs.writeFileSync(path.resolve(dir, componentName + '/' + componentName + '.tsx'), Handlebars.compile(tsxTpl)(data))
    fs.writeFileSync(path.resolve(dir, componentName + '/' + componentName + '.less'), Handlebars.compile(lessTpl)(data))
    fs.writeFileSync(path.resolve(dir, componentName + '/tests/' + componentName + '.spec.ts'), Handlebars.compile(specTpl)(data))
    fs.writeFileSync(path.resolve(dir, componentName + '/tests/' + componentName + '.e2e.ts'), Handlebars.compile(e2eTpl)(data))
    fs.writeFileSync(path.resolve(dir, componentName + '/readme.md'), Handlebars.compile(mdTpl)(data))
    fs.writeFileSync(path.resolve(dir, componentName + '/stories/story.tsx'), Handlebars.compile(storyTpl)(data))
}


// Util functions may we could move into a separate file later
kebab2start = (string) => {
    string = string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    return string.charAt(0).toUpperCase() + string.slice(1)
}

kebab2words = (string) => {
    string = string.replace(/-([a-z])/g, (g) => ' ' +g[1].toUpperCase())
    return string.charAt(0).toUpperCase() + string.slice(1)
}

word2kebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

formatComponentName = (componentName) => {
    if (!componentName) {
        return componentName
    }
    componentName = componentName.replace(/\s/g, '-').toLowerCase()
    if (componentName.indexOf(prefix) !== 0) {
        componentName = prefix + componentName
    }
    return componentName
}

// main loop
inquirer
  .prompt([
    {
        name: 'componentType',
        message: 'What is the type of component you want to create?',
        type: 'list',
        choices: ['Component', 'Rich Component', 'Feature Component']
    },
    {
        name: 'componentName',
        message: 'What is the name of your component ?',
        validate: (componentName) => {
            componentName = formatComponentName(componentName)
            const target = path.resolve(srcPath, 'global/' + componentName)
            const target2 = path.resolve(srcPath, 'rich/' + componentName)
            const target3 = path.resolve(srcPath, 'feature/' + componentName)
            return fs.existsSync(target) || fs.existsSync(target2) || fs.existsSync(target3) ? 'component with the same name already exists !' : true
        }
    }
  ])
  .then(answers => {
    const componentName = formatComponentName(answers.componentName)
    const componentType = answers.componentType + 's'
    let dir = srcPath
    switch (componentType) {
        case 'Components':
            dir = GLOBAL_PATH
        break
        case 'Rich Components':
            dir = RICH__PATH
        break
        case 'Feature Components':
            dir = FEATURE_PATH
        break
    }
    console.log('\x1b[36m%s\x1b[0m', 'Creation of the repository')
    createComponentRepository(componentName, dir)
    console.log('\x1b[36m%s\x1b[0m', 'Creation of the files')
    createComponentStencilFiles(componentName, componentType, dir)
    console.log('\x1b[32m%s\x1b[0m', 'Creation succeed')
  })
