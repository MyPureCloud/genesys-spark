@Library('pipeline-library')

Boolean isMainBranch = env.BRANCH_NAME == 'main'

Boolean isMaintenanceReleaseBranch = env.BRANCH_NAME.startsWith('maintenance/')

Boolean isFeatureBranch = env.BRANCH_NAME.startsWith('feature/')

Boolean isReleaseBranch = isMainBranch || isMaintenanceReleaseBranch

Boolean isPublicBranch = isReleaseBranch || isFeatureBranch

webappPipelineV2 {
    urlPrefix = 'spark-components'
    agentLabel = 'dev_x86_shared'
    nodeVersion = '16.18.0'
    mailer = 'CoreUI@genesys.com'
    chatGroupId = 'adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    manifest = customManifest('./packages/genesys-spark-components/dist') {
        sh('./packages/genesys-spark-components/scripts/generate-manifest.js')
        readJSON(file: './packages/genesys-spark-components/manifest.json')
    }
    releasableBranchPrefixes = ['beta/', 'maintenance/']
    skipDeploy = true
    checkoutStep = {
        checkout(scm)
        sh("git checkout ${env.BRANCH_NAME}")
        // Make sure we have tags, which are required for version bumps
        sshagent(credentials: [constants.credentials.github.inin_dev_evangelists]) {
            sh('git fetch --tags')
        }
    }
    prepareStep = {
        if (isReleaseBranch) {
            sh('npm run devops.create.pipeline.assets.release')
        } else {
            sh('npm run devops.create.pipeline.assets')
        }
        sh('node -v')
        sh('npm --versions')
        sh('npm ci')
    }
    versionClosure = {
        // If this is a release branch, bump the version before reading it. The conditional is not
        // technically required, as the version closure is ignored for feature branches. However,
        // it may protect against problems if the pipeline behavior changes in the future.
        if (isReleaseBranch) {
            sh('''
               npm run release --workspace=packages/genesys-spark-components
               RELEASE_VERSION="$(npm run --silent current-version --workspace=packages/genesys-spark-components)"
               npm run version-sync $RELEASE_VERSION
               npm install
               git add packages/**/package.json web-apps/**/package.json package-lock.json
               git commit --amend --no-edit --no-verify
               git tag -a v$RELEASE_VERSION -m "chore(release): $RELEASE_VERSION"
            ''')
        }

        return readJSON(file: 'package.json').version
    }
    ciTests = {
        sh('npm run build --workspace=packages/genesys-spark-tokens')
        sh('npm run stencil --workspace=packages/genesys-spark-components')
        sh('npm run lint')
        sh('npm run test.ci')
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
    onPromoteSuccess = {
        sh('printenv')

        currentBuild.description = """<a href="https://grandcentral.ininica.com/#/services/spark-components-webui/version/${env.SERVICE_VERSION}" target="_blank">${env.VERSION}@GrandCentral</a></h2>"""
    }
    onSuccess = {
        if (isReleaseBranch) {
            stage('NPM Publish Packages') {
                withCredentials([
                  string(credentialsId: constants.credentials.npm,  variable: 'NPM_TOKEN')
                ]) {
                    sh(script: 'npm publish --tag maintenance --workspace=packages/genesys-spark-components',
                        label: 'Publish Components')

                    sh(script: '''
                            RELEASE_VERSION="$(npm run --silent current-version --workspace=packages/genesys-spark-components)"
                            npm install --legacy-peer-deps --no-progress -P -E genesys-spark-components@${RELEASE_VERSION} --workspace=packages/genesys-spark-components-react
                        ''',
                        label: 'Set exact version dependency in React Components')

                    sh(script: 'npm publish --tag maintenance --workspace=packages/genesys-spark-components-react',
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
