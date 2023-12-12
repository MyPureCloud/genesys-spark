@Library('pipeline-library')

Boolean isMainBranch = env.BRANCH_NAME == 'main'

Boolean isMaintenanceReleaseBranch = env.BRANCH_NAME.startsWith('maintenance/')

Boolean isFeatureBranch = env.BRANCH_NAME.startsWith('feature/')

Boolean isBetaBranch = env.BRANCH_NAME.startsWith('beta/')

Boolean isReleaseBranch = isMainBranch || isMaintenanceReleaseBranch || isBetaBranch

Boolean isPublicBranch = isReleaseBranch || isFeatureBranch || isBetaBranch

String releaseOptions = isBetaBranch ? '--prerelease beta' : ''
String publishOptions = isBetaBranch ? '--tag beta' : ''

// We track this globally because it will later be passed to the documentation build
String componentAssetsPath = ''

webappPipeline {
    projectName = 'spark-components'
    versionClosure = {
        // If this is a release branch, bump the version before reading it. The conditional is not
        // technically required, as the version closure is ignored for feature branches. However,
        // it may protect against problems if the pipeline behavior changes in the future.
        if (isReleaseBranch) {
            sh('npm ci')
            sh(
                label: 'Version bump & changelog generation',
                script: "npm run release -- ${releaseOptions}"
            )
            String releaseVersion = sh(
                script: 'npm run --silent current-version',
                returnStdout: true
            ).trim()
            sh(
                label: 'Sync package versions',
                script: """
                npm run version-sync ${releaseVersion}
                npm install --package-lock-only
                """
            )
            sh(
                label: 'Commit changes and tag release',
                script: """
                git add packages/**/package.json web-apps/**/package.json package-lock.json
                git commit --amend --no-edit --no-verify
                git tag -a \"v${releaseVersion}\" -m \"chore(release): ${releaseVersion}\"
                """
            )
            String unexpectedChanges = sh(
                label: 'Check for untracked / unexpected changes',
                script: 'git status --porcelain',
                returnStdout: true
            ).trim()

            if (unexpectedChanges != "") {
                error("I found uncommited changes that should not exist:\n${unexpectedChanges}")
            }
        }

        return readJSON(file: 'package.json').version
    }
    team = 'Core UI'
    mailer = 'matthew.cheely@genesys.com, daragh.king@genesys.com, jordan.stith@genesys.com, thomas.dillon@genesys.com, katie.bobbe@genesys.com, gavin.everett@genesys.com, jason.evans@genesys.com'
    chatGroupId = 'adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    nodeVersion = '18.16.1'
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
        // Skip module install if it ran during the version check
        if (!fileExists('node_modules')) {
            sh('npm ci')
        }
        sh('npm run test.ci')
        sh('npm run build --workspace=packages/genesys-spark-tokens')
        sh('npm run stencil --workspace=packages/genesys-spark-components')
        sh('npm run lint')
    }
    buildStep = { assetPrefix ->
        // All of the useful stencil output lives under /genesys-webcomponents, so
        // we add it to the loading path here to simplify internal code
        componentAssetsPath = "${assetPrefix}genesys-webcomponents/"
        chartComponentAssetsPath = "${assetPrefix}genesys-chart-webcomponents/"

        env.COMPONENT_ASSETS_PATH = componentAssetsPath
        env.CHART_COMPONENT_ASSETS_PATH = chartComponentAssetsPath

        sh('npm run build')
    }
    onSuccess = {
        if (isReleaseBranch) {
            stage('NPM Publish Packages') {
                withCredentials([
                  string(credentialsId: constants.credentials.npm,  variable: 'NPM_TOKEN')
                ]) {
                    sh(script: "npm publish --workspace=packages/genesys-spark-components ${publishOptions}",
                        label: 'Publish Components')

                    sh(script: "npm publish --workspace=packages/genesys-spark ${publishOptions}",
                        label: 'Publish Main Package'
                    )

                    sh(script: '''
                            RELEASE_VERSION="$(npm run --silent current-version)"
                            npm install --no-progress -P -E genesys-spark-components@${RELEASE_VERSION} --workspace=packages/genesys-spark-components-react
                        ''',
                        label: 'Set exact version dependency in React Components')

                    sh(script: "npm publish --workspace=packages/genesys-spark-components-react ${publishOptions}",
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
               parameters: [
                string(name: 'BRANCH_NAME', value: env.BRANCH_NAME),
                string(name: 'COMPONENT_ASSETS_PATH', value: componentAssetsPath)
               ],
                propagate: false,
                     wait: false)
            }
        }
    }
}
