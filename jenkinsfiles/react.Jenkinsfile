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
                # Set up node with the provided version
                source ./npm-utils/scripts/install-node.sh 16.18.0

                # install and build spark
                npm ci
                npm run build

                # Install and build react binding
                cd common-webcomponents-react
                # Set public npmjs registry with creds
                echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ./.npmrc

                # Set the package.json dependency on genesys-spark-components to the current version that's being published
                npm install --legacy-peer-deps --no-progress --save --save-exact genesys-spark-components@${publishedVersion} &&
                npm run build &&
                npm version ${publishedVersion} &&
                npm publish --tag maintenance
            """
        }
    }
}
