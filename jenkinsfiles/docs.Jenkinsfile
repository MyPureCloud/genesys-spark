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
    projectName = 'common-ui-docs/genesys-webcomponents'
    team = 'Core UI'
    mailer = 'matthew.cheely@genesys.com, daragh.king@genesys.com, jordan.stith@genesys.com, thomas.dillon@genesys.com, katie.bobbe@genesys.com, gavin.everett@genesys.com, jason.evans@genesys.com'
    chatGroupId='adhoc-30ab1aa8-d42e-4590-b2a4-c9f7cef6d51c'
    nodeVersion = '16.18.0'
    testJob = 'no-tests'
    deployConfig = [dev : 'always']
    manifest = customManifest('./docs/dist') {
        sh('./scripts/generate-manifest')
        readJSON(file: 'docs-manifest.json')
    }
    skipCommitsFrom = []
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
          export DOCS_CDN_URL=${assetPrefix}
          npm run build
          npm run generate-versions-file
        """)
    }
}
