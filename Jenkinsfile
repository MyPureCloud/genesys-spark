@Library('pipeline-library@master')
import com.genesys.jenkins.Service

def notifications = null
String[] mailingList = [
  "Jeremie.Pichon@genesys.com",
  "Jarrod.Stormo@genesys.com",
  "Matthew.Cheely@genesys.com",
  "Keri.Lawrence@genesys.com",
  "Chris.Covert@genesys.com",
  "Darragh.Kirwan@genesys.com"
]

def isAlpha() {
  return env.SHORT_BRANCH.startsWith('alpha/');
}

def isRelease() {
  return env.SHORT_BRANCH.equals('master');
}

def shouldPublish() {
  return isAlpha() || isRelease();
}

pipeline {
  agent { label 'infra_mesos' }
  options {
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
            if ( isAlpha() ) {
              sh "npm run release -- --prerelease alpha"
            } else {
              sh "npm run release"
            }
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
            export CDN_URL=$(./node_modules/.bin/cdn --ecosystem pc --manifest manifest.json)
            npm run build
            node ./scripts/fix-doc-urls
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
            if ( isAlpha() ) {
              sh "npm publish --tag alpha"
              sshagent(credentials: ['7c2a5698-a932-447a-9727-6852d0994ea0']) {
                sh "git push --follow-tags -u origin ${env.SHORT_BRANCH}"
              }
            } else {
              sh "echo regular publish"
              sh "npm publish"
              sshagent(credentials: ['7c2a5698-a932-447a-9727-6852d0994ea0']) {
                sh "git push --folow-tags -u origin ${env.SHORT_BRANCH}"
              }
            }
          }
        }
      }
    }


    stage('Upload Docs') {
      when {
        expression { isRelease() }
      }
      steps {
        sh "echo Uploading release!"
        dir (env.REPO_DIR) {
          sh './scripts/generate-versions-file'
          sh '''
            ./node_modules/.bin/upload \
                --ecosystem pc \
                --manifest manifest.json \
                --source-dir ./.out
          '''
        }
      }
    }


    stage('Deploy Docs') {
      when {
        expression { isRelease() }
      }
      steps {
        dir (env.REPO_DIR) {
          sh '''
            ./node_modules/.bin/deploy \
                --ecosystem pc \
                --manifest manifest.json \
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
