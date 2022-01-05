#!/bin/bash

# Set up npm link so react-component-lib points at the local copy of the main repo

PROJ_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/.."
REACT_DIR="${PROJ_DIR}/common-webcomponents-react"

echo "Setting up link for @genesys/common-webcomponents"
pushd $PROJ_DIR > /dev/null
npm link
echo "Linking @genesys/common-webcomponents from @genesys/common-webcomponents-react"
pushd $REACT_DIR > /dev/null
npm link @genesys/common-webcomponents
# restore back to their original directory
popd > /dev/null; popd > /dev/null;
