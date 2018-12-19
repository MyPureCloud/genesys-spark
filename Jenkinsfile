pipeline {
  agent { label 'infra_mesos' }

  environment {
    NPM_UTIL_PATH = "npm-utils"
    REPO_DIR = "repo"
    SHORT_BRANCH = env.GIT_BRANCH.replaceFirst(/^origin\//, '');
  }

  tools {
    nodejs 'NodeJS 10.15.0'
  }

  stages {
    stage('Prep') {
      steps {
        deleteDir()
        sh "git clone --single-branch -b split-version-bump --depth=1 git@bitbucket.org:inindca/npm-utils.git ${env.NPM_UTIL_PATH}"
        dir(env.REPO_DIR) {
          echo "Building Branch: ${env.GIT_BRANCH}"
          checkout scm
          sh "${env.WORKSPACE}/${env.NPM_UTIL_PATH}/scripts/jenkins-create-npmrc.sh"
        }
      }
    }


      stage('Build') {
        steps {
          dir(env.REPO_DIR) {
            // Check to see if we need to bump the version for release
            sh "${env.WORKSPACE}/${env.NPM_UTIL_PATH}/scripts/auto-version-bump.sh"
            sh './scripts/generate-manifest'
            sh '''
              npm ci
              export CDN_URL=$(./node_modules/.bin/cdn --ecosystem gmsc --manifest manifest.json)
              npm run build
            '''
          }
        }
      }

    stage('Publish Library') {
      steps {
        dir(env.REPO_DIR) {
          sh "npm publish"
          // Make a local branch so we can push back to the origin branch.
          sh "git checkout -b ${env.SHORT_BRANCH}"
          sh "git push --tags -u origin ${env.SHORT_BRANCH}"
        }
      }
    }

    stage('Upload Docs') {
      steps {
        dir (env.REPO_DIR) {
          sh './scripts/generate-versions-file'
          sh '''
            ./node_modules/.bin/upload \
                --ecosystem gmsc \
                --manifest manifest.json \
                --source-dir ./.out
          '''
        }
      }
    }

    stage('Deploy Docs') {
      steps {
        dir (env.REPO_DIR) {
          sh '''
            ./node_modules/.bin/deploy \
                --ecosystem gmsc \
                --manifest manifest.json \
                --dest-env dev
          '''
        }
      }
    }

  }
}
