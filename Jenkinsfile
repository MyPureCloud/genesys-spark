@Library('pipeline-library')
import com.genesys.jenkins.Service

def notifications = null
String[] mailingList = [
  "Matthew.Cheely@genesys.com",
  "Daragh.King@genesys.com"
]

def isRelease() {
  return env.SHORT_BRANCH.equals('master');
}
def isFeature() {
  return env.SHORT_BRANCH.startsWith('feature/');
}

def shouldPublish() {
  return isRelease();
}

def shouldUploadAssets() { 
  isRelease() || isFeature();
}

pipeline {
  agent { label 'infra_mesos_v2' }
  options {
    quietPeriod(480)
    disableConcurrentBuilds()
  }

  environment {
    NPM_UTIL_PATH = "npm-utils"
    REPO_DIR = "repo"
    SHORT_BRANCH = env.GIT_BRANCH.replaceFirst(/^origin\//, '');
  }

  tools {
    nodejs 'NodeJS 10.15.3'
  }

  stages {
    stage('Import notifications lib') {
      steps {
        script {
          // clone pipelines repo
          dir('pipelines') {
            git branch: 'master',
                url: 'git@bitbucket.org:inindca/pipeline-library.git',
                changelog: false

            notifications = load 'src/com/genesys/jenkins/Notifications.groovy'
          }
        }
      }
    }

    stage('Prep') {
      steps {
        deleteDir()
        sh "env"
        sh "git clone --single-branch -b master --depth=1 git@bitbucket.org:inindca/npm-utils.git ${env.NPM_UTIL_PATH}"
        dir(env.REPO_DIR) {
          echo "Building branch: ${env.GIT_BRANCH}"
          checkout scm
          // Make a local branch so we can work with history and push (there's probably a better way to do this)
          sh "git checkout -b ${env.SHORT_BRANCH}"
          sh "${env.WORKSPACE}/${env.NPM_UTIL_PATH}/scripts/jenkins-create-npmrc.sh"
          sh "cp .npmrc docs/.npmrc"
          sh "npm ci"
        }
      }
    }

    stage('Check') {
      steps {
        dir(env.REPO_DIR) {
          sh "npm run test.unit"
        }
      }
    }

    stage('Bump Version') {
      when {
        expression { shouldPublish() }
      }
      steps {
        dir(env.REPO_DIR) {
          script {
            sh "npm run release"
          }
        }
      }
    }

    stage('Build') {
      steps {
        dir(env.REPO_DIR) {
          // Generate manifest file with deployment metadata
          sh './scripts/generate-manifest'
          // Generate the CDN_URL for use in the docs and build everything.
          sh '''
            export DOCS_CDN_URL=$(./node_modules/.bin/cdn --ecosystem pc --manifest docs-manifest.json)
            export CDN_URL=$(./node_modules/.bin/cdn --ecosystem pc --manifest library-manifest.json)
            npm run build
          '''
          // Re-generate manifest file after building docs - required to find *.html in docs
          sh './scripts/generate-manifest'
        }
      }
    }

    stage('Upload Assets') {
      when {
        expression { shouldUploadAssets() }
      }
      steps {
        dir(env.REPO_DIR) {
          sh "echo Uploading static assets!"
          sh '''
            ./node_modules/.bin/upload \
                --ecosystem pc \
                --manifest library-manifest.json \
                --source-dir ./dist/genesys-webcomponents
          '''
        }
      }
    }


    stage('Publish Library') {
      when {
        expression { shouldPublish()  }
      }
      steps {
        dir(env.REPO_DIR) {
          script {
            sh "npm publish"
            sshagent(credentials: ['3aa16916-868b-4290-a9ee-b1a05343667e']) {
              sh "git push --follow-tags -u origin ${env.SHORT_BRANCH}"
            }
          }
        }
      }
    }


    stage('Upload Docs') {
      when {
        expression { shouldPublish() }
      }
      steps {
        sh "echo Uploading release!"
        dir (env.REPO_DIR) {
          sh './scripts/generate-versions-file'
          sh '''
            ./node_modules/.bin/upload \
                --ecosystem pc \
                --manifest docs-manifest.json \
                --source-dir ./docs/dist
          '''
        }
      }
    }


    stage('Deploy Docs') {
      when {
        expression { shouldPublish() }
      }
      steps {
        dir (env.REPO_DIR) {
          sh '''
            ./node_modules/.bin/deploy \
                --ecosystem pc \
                --manifest docs-manifest.json \
                --dest-env dev
          '''
        }
      }
    }
  }

  post {
    fixed {
      script {
        notifications.emailResults(mailingList.join(" "))
      }
    }

    failure {
      script {
        notifications.emailResults(mailingList.join(" "))
      }
    }
  }

}
