@Library('pipeline-library')

def isMainBranch = {
    return env.BRANCH_NAME.equals('main')
}

def isActiveReleaseBranch = {
    return env.BRANCH_NAME.equals('maintenance/v2')
}

def isMaintenanceReleaseBranch = {
    return env.BRANCH_NAME.startsWith('maintenance/')
}

def isFeatureBranch = {
    return env.BRANCH_NAME.startsWith('feature/')
}

def isReleaseBranch = {
    return isMainBranch() || isActiveReleaseBranch() || isMaintenanceReleaseBranch()
}

def isPublicBranch = {
    isReleaseBranch() || isFeatureBranch()
}

webappPipeline {
    projectName = 'spark-components'
    team = 'Core UI'
    mailer = 'CoreUI@genesys.com'
    nodeVersion = '14.x'
    testJob = 'no-tests'
    deployConfig = [:]
    manifest = customManifest('./dist') {
        sh('./scripts/generate-manifest')
        readJSON(file: 'library-manifest.json')
    }
    buildType = {
        if (isReleaseBranch()) {
            return 'MAINLINE'
        } else if (isFeatureBranch()) {
            return 'FEATURE'
        } else {
            return 'CI'
        }
    }
    checkoutStep = {
        checkout(scm)
        sh("git checkout ${env.BRANCH_NAME}")
    }
    ciTests = {
        sh('npm ci')
        sh('stencil build') // Required for lint to pass
        sh('''
          npm run lint
          npm run test.ci.spec
        ''')

        // Run in CI step so we only run once
        // (builds happen twice, legacy and FedRAMP)
        if (isReleaseBranch()) {
            sh('npm run release')
        }
    }
    buildStep = { assetPrefix ->
        sh("""
          export CDN_URL=${assetPrefix}
          npm run build
        """)
    }
    onSuccess = {
        if (isReleaseBranch()) {
            stage('NPM Publish') {
                withCredentials([
              string(credentialsId: constants.credentials.npm,  variable: 'NPM_TOKEN')
            ]) {
                    sh('''
                  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ./.npmrc
                  echo ".npmrc" >> .npmignore
                  npm publish
                ''')
            }
                def publishedVersion = sh(script: 'node -e "console.log(require(\'./package.json\').version)"', returnStdout: true).trim()
                currentBuild.description = publishedVersion
            }

            stage('Push Changes') {
                sshagent(credentials: [constants.credentials.github.inin_dev_evangelists]) {
                    sh "git push --follow-tags -u origin ${env.BRANCH_NAME}"
                }
            }
        }

        stage('Run Docs Build') {
            if (isFeatureBranch() || isReleaseBranch()) {
                build(job: 'spark-component-docs',
                  parameters: [string(name: 'BRANCH_NAME', value: env.BRANCH_NAME )],
                  propagate: false,
                  wait: false
            )
            }
        }
    }
}
