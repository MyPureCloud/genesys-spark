@Library('pipeline-library')

def isMainBranch = {
  return env.BRANCH_NAME.equals('main');
}

def isActiveReleaseBranch = {
  return env.BRANCH_NAME.equals('maintenance/v2');
}

def isMaintenanceReleaseBranch = {
  return env.BRANCH_NAME.startsWith('maintenance/');
}

def isFeatureBranch = {
  return env.BRANCH_NAME.startsWith('feature/');
}

def isReleaseBranch = {
  return isMainBranch() || isActiveReleaseBranch() || isMaintenanceReleaseBranch();
}

def isPublicBranch = {
    isReleaseBranch() || isFeatureBranch()
}

webappPipeline {
    projectName = 'common-ui-docs/spark-components'
    team = 'Core UI'
    mailer = 'CoreUI@genesys.com'
    nodeVersion = '14.x'
    testJob = 'no-tests'
    deployConfig = [dev : 'always']
    manifest = customManifest('./docs/dist') {
        sh('./scripts/generate-manifest')
        readJSON(file: 'docs-manifest.json')
    }
    buildType = {
        if(isReleaseBranch()) {
            return 'MAINLINE'
        } else if (isPublicBranch()) {
            return 'FEATURE'
        } else {
            return 'CI'
        }
    }
    buildStep = { assetPrefix ->
        if (isReleaseBranch()) {
            def version = sh(script: 'node -e "console.log(require(\'./package.json\').version)"', returnStdout: true).trim()
            currentBuild.description = version
        } else {
            currentBuild.description = env.BRANCH_NAME
        }
        sh("""
          npm ci
          export CDN_URL=${assetPrefix}
          npm run build
          npm run generate-versions-file
        """)
    }
}
