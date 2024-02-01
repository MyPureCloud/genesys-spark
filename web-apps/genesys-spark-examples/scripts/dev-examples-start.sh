#!/bin/bash

components_file_path="../../packages/genesys-spark-components/dist/component-specs.json"
chart_components_file_path="../../packages/genesys-spark-chart-components/dist/component-specs.json"

until [[ -f $components_file_path && -f $chart_components_file_path ]];
do
  echo "Waiting for the component-specs files to be created..."
  sleep 1
done
echo "The component-specs files exist. Proceeding..."