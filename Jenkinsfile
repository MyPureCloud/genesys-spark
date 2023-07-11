@Library('pipeline-library')

Boolean isMainBranch = env.BRANCH_NAME == 'main'

Boolean isMaintenanceReleaseBranch = env.BRANCH_NAME.startsWith('maintenance/')

Boolean isFeatureBranch = env.BRANCH_NAME.startsWith('feature/')

Boolean isReleaseBranch = isMainBranch || isMaintenanceReleaseBranch

Boolean isPublicBranch = isReleaseBranch || isFeatureBranch

webappPipeline {
    projectName = 'spark-components'
    team = 'Core UI'
    mailer = 'matthew.cheely@genesys.com, daragh.king@genesys.com, jordan.stith@genesys.com, thomas.dillon@genesys.com, katie.bobbe@genesys.com, gavin.everett@genesys.com, jason.evans@genesys.com'
    chatGroupId='adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    nodeVersion = '16.18.0'
    testJob = 'no-tests'
    deployConfig = [:]
    manifest = customManifest('./packages/genesys-spark-components/dist') {
        sh('./packages/genesys-spark-components/scripts/generate-manifest.js')
        readJSON(file: './packages/genesys-spark-components/manifest.json')
    }
    buildType = {
        if (isReleaseBranch) {
            return 'MAINLINE'
        }

        return isFeatureBranch ? 'FEATURE' : 'CI'
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

        // Run in CI step so we only run once
        // (builds happen twice, legacy and FedRAMP)
        if (isReleaseBranch) {
            sh('''
                npm run release --workspace=packages/genesys-spark-components
               RELEASE_VERSION="$(npm run --silent current-version --workspace=packages/genesys-spark-components)"
               npm run version-sync $RELEASE_VERSION
               npm install
               git add . && git commit --amend --no-edit --no-verify
               git tag -a v$RELEASE_VERSION -m "chore(release): $RELEASE_VERSION"
            ''')
        }

        sh('npm run test.ci')
        sh('npm run build --workspace=packages/genesys-spark-tokens')
        sh('npm run stencil --workspace=packages/genesys-spark-components')
        sh('npm run lint')
    }
    buildStep = { assetPrefix ->
        String cdnUrl = assetPrefix
        // This is a bit of a kludge, but the build pipeline is intended for apps, which
        // can use relative URLs to load assets. Because the components are running inside
        // apps, they have to load their assets from a full URL on the new UI hosting stack.
        if (assetPrefix.startsWith('/')) {
            cdnUrl = "${assetPrefix}genesys-webcomponents/"
        }

        env.CDN_URL = cdnUrl

        sh('npm run build')
    }
    onSuccess = {
        if (isReleaseBranch) {
            stage('NPM Publish Packages') {
                withCredentials([
                  string(credentialsId: constants.credentials.npm,  variable: 'NPM_TOKEN')
                ]) {
                    sh(script: 'npm publish --workspace=packages/genesys-spark-components',
                        label: 'Publish Components')

                    sh(script: '''
                            RELEASE_VERSION="$(npm run --silent current-version --workspace=packages/genesys-spark-components)"
                            npm install --legacy-peer-deps --no-progress -P -E genesys-spark-components@${RELEASE_VERSION} --workspace=packages/genesys-spark-components-react
                        ''',
                        label: 'Set exact version dependency in React Components')

                    sh(script: 'npm publish --workspace=packages/genesys-spark-components-react',
                        label: 'Publish React Components')
                }
            }

            stage('Push Changes') {
                sshagent(credentials: [constants.credentials.github.inin_dev_evangelists]) {
                    // Make sure we have the latest version of the branch so we can push our changes
                    sh("""
                        git pull
                        git push --follow-tags -u origin ${env.BRANCH_NAME}
                    """)
                }
            }
        }

        stage('Run Docs Build') {
            if (isPublicBranch) {
                build(job: 'spark-monorepo-examples',
               parameters: [string(name: 'BRANCH_NAME', value: env.BRANCH_NAME)],
                propagate: false,
                     wait: false)
            }
        }
    }
}
