@Library('pipeline-library')
import com.genesys.jenkins.Notifications

Boolean isMainBranch = env.BRANCH_NAME == 'main'

Boolean isMaintenanceReleaseBranch = env.BRANCH_NAME.startsWith('maintenance/')

Boolean isBetaBranch = env.BRANCH_NAME.startsWith('beta/')

Boolean isFeatureBranch = env.BRANCH_NAME.startsWith('feature/')

Boolean isReleaseBranch = isMainBranch || isMaintenanceReleaseBranch || isBetaBranch

Boolean isPublicBranch = isReleaseBranch || isFeatureBranch

String releaseOptions = isBetaBranch ? '--prerelease beta' : ''
String publishOptions = isBetaBranch ? '--tag beta' : ''

// We track this globally because it will later be passed to the documentation build
String componentAssetsPath = ''
String charComponentAssetsPath = ''

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
    mailer = 'CoreUI@genesys.com'
    chatGroupId = 'adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    nodeVersion = '20.x multiarch'
    testJob = 'no-tests'
    deployConfig = [:]
    manifest = customManifest('./dist') {
        sh('./scripts/create-manifest.js')
        readJSON(file: './manifest.json')
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
        sh('npm run build --workspace=packages/genesys-spark')
        sh('npm run stencil --workspace=packages/genesys-spark-components')
        sh('npm run lint')
    }
    buildStep = { assetPrefix ->
        // All of the useful stencil output lives under /genesys-webcomponents, so
        // we add it to the loading path here to simplify internal code
        componentAssetsPath = "${assetPrefix}genesys-webcomponents/"
        chartComponentAssetsPath = "${assetPrefix}chart/genesys-chart-webcomponents/"

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
                    def failures = new ArrayList<String>()

                    def componentStatCode = sh(script: "npm publish --workspace=packages/genesys-spark-components ${publishOptions}",
                        label: 'Publish Components',
                        returnStatus: true
                        )

                    if(componentStatCode > 0) {
                      failures.add('Publish Components')
                    }

                    def chartStatCode = sh(script: "npm publish --workspace=packages/genesys-spark-chart-components ${publishOptions}",
                        label: 'Publish Chart Components',
                        returnStatus: true
                        )

                    if(chartStatCode > 0) {
                      failures.add('Publish Chart Components')
                    }

                    def mainPackageStatCode = sh(script: "npm publish --workspace=packages/genesys-spark ${publishOptions}",
                        label: 'Publish Main Package',
                        returnStatus: true
                    )

                    if(mainPackageStatCode > 0) {
                      failures.add('Publish Main Package')
                    }

                    sh(script: '''
                            RELEASE_VERSION="$(npm run --silent current-version)"
                            npm install --no-progress -P -E genesys-spark-components@${RELEASE_VERSION} --workspace=packages/genesys-spark-components-react
                            npm install --no-progress -P -E genesys-spark-chart-components@${RELEASE_VERSION} --workspace=packages/genesys-spark-chart-components-react
                        ''',
                        label: 'Set exact version dependency in React Components and Chart React Components',
                        )

                    def reactStatCode = sh(script: "npm publish --workspace=packages/genesys-spark-components-react ${publishOptions}",
                        label: 'Publish React Components',
                        returnStatus: true
                        )

                    if(reactStatCode > 0) {
                      failures.add('Publish React Components')
                    }

                    def chartReactStatCode = sh(script: "npm publish --workspace=packages/genesys-spark-chart-components-react ${publishOptions}",
                        label: 'Publish Chart React Components',
                        returnStatus: true
                        )

                    if(chartReactStatCode > 0) {
                      failures.add('Publish Chart React Components')
                    }

                    def notification = new com.genesys.jenkins.Notifications()
                    if (failures.size()) {
                      notification.sendEmailViaMailchomp("Spark NPM Publish failures", mailer, "These packages failed to publish to NPM:\n" + failures.join('\n'))
                    }
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
                string(name: 'COMPONENT_ASSETS_PATH', value: componentAssetsPath),
                string(name: 'CHART_COMPONENT_ASSETS_PATH', value: chartComponentAssetsPath)
               ],
                propagate: false,
                     wait: false)
            }
        }
    }
}
