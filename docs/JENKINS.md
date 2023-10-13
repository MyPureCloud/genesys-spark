# Jenkins Jobs

## Spark - Features

- https://jenkins.ininica.com/view/Common%20UI/job/cui-web-component-feature-multi/

This job runs for branches in the https://github.com/MyPureCloud/genesys-spark repo that start with `feature/`.
It creates a time machine version of the project that is useful for reviewing PRs.

## Spark - Releases

- https://jenkins.ininica.com/view/Common%20UI/job/cui-web-component-release-multi/

This job runs for the `main`, `maintenance/v3` and `beta/v4` branches in the https://github.com/MyPureCloud/genesys-spark repo.
It creates and releases a version of the project for public distribution.

## Core UI - Daily build trigger

- https://jenkins.ininica.com/view/Common%20UI/job/daily-build-trigger/

This job runs once a day in quite hours to trigger releases for Core UI projects.
It currently triggers:

- cui-web-component-release-multi/maintenance%2Fv3 (`%2F` = `/` but Jenkins needs the job name to be url encoded)
- cui-web-component-release-multi/beta%2Fv4 (`%2F` = `/` but Jenkins needs the job name to be url encoded)
- contentsquare-self-hosted/main
