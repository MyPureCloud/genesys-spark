@Library('pipeline-library')
import com.genesys.pipelines.Common

Common common = new Common()

node(nodelabels.getCombinedExecutorLabelForEnv('dev')) {
    common.workspace {
        deleteDir()
        checkout(scm)

        common.shallowClone('git@bitbucket.org:inindca/npm-utils.git', constants.credentials.bitbucket.devops_ssh, 'master', 'npm-utils')

        withCredentials([
            string(credentialsId: constants.credentials.npm,  variable: 'NPM_TOKEN')
        ]) {
            def publishedVersion = sh(script: 'node -e "console.log(require(\'./package.json\').version)"', returnStdout: true).trim()
            currentBuild.description = publishedVersion

            // Compile react components to JS, match version to parent lib, publish
            sh """
                cd common-webcomponents-react
                echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ./.npmrc
                npm install --legacy-peer-deps --no-progress &&
                npm run build &&
                npm version ${publishedVersion}
                # && npm publish
            """
        }
    }
}
