#!/bin/bash

components_file_path="../../packages/genesys-spark-components/build/component-specs/component-specs.json"
chart_components_file_path="../../packages/genesys-spark-chart-components/build/component-specs/component-specs.json"
general_components_file_path="../../packages/genesys-spark/build/component-specs/component-specs.json"

until [[ -f $components_file_path && -f $chart_components_file_path && -f $general_components_file_path ]];
do
  echo "Waiting for the component-specs files to be created..."
  sleep 1
done
