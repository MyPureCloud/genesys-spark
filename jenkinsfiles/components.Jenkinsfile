@Library('pipeline-library')

def isMainBranch = {
    return env.BRANCH_NAME.equals('main')
}

def isMaintenanceReleaseBranch = {
    return env.BRANCH_NAME.startsWith('maintenance/')
}

def isFeatureBranch = {
    return env.BRANCH_NAME.startsWith('feature/')
}

def isReleaseBranch = {
    return isMainBranch() || isMaintenanceReleaseBranch()
}

def isPublicBranch = {
    isReleaseBranch() || isFeatureBranch()
}

webappPipeline {
    projectName = 'spark-components'
    team = 'Core UI'
    mailer = 'matthew.cheely@genesys.com, daragh.king@genesys.com, jordan.stith@genesys.com, thomas.dillon@genesys.com, katie.bobbe@genesys.com, gavin.everett@genesys.com, jason.evans@genesys.com'
    chatGroupId='adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    nodeVersion = '16.18.0'
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
        // Make sure we have tags, which are required for version bumps
        sshagent(credentials: [constants.credentials.github.inin_dev_evangelists]) {
          sh('git fetch --tags')
        }
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
        String cdnUrl = assetPrefix
        // This is a bit of a kludge, but the build pipeline is intended for apps, which
        // can use relative URLs to load assets. Because the components are running inside
        // apps, they have to load their assets from a full URL on the new UI hosting stack.
        if (assetPrefix.startsWith('/')) {
            cdnUrl = "https://app.mypurecloud.com${assetPrefix}genesys-webcomponents/"
        }

        sh("""
          export CDN_URL=${cdnUrl}
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
            }

            stage('Push Changes') {
                sshagent(credentials: [constants.credentials.github.inin_dev_evangelists]) {
                    // Make sure we have the latest version of the branch so we can push our changes
                    sh "git pull"
                    sh "git push --follow-tags -u origin ${env.BRANCH_NAME}"
                }
            }
        }

        stage('Run React Bindings Build') {
            if (isReleaseBranch()) {
                build(job: 'spark-component-react-bindings',
                  parameters: [string(name: 'BRANCH_NAME', value: env.BRANCH_NAME)],
                  propagate: false,
                  wait: false
                )
            }
        }

        stage('Run Docs Build') {
            if (isPublicBranch()) {
                build(job: 'spark-component-docs',
                  parameters: [string(name: 'BRANCH_NAME', value: env.BRANCH_NAME)],
                  propagate: false,
                  wait: false
            )
            }
        }
    }
}
