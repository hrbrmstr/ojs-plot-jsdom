@default:
  npm run --silent plot > roci.svg
  npm run --silent plot | svgo --quiet --pretty --indent 2 --input - --output roci-svgo.svg 
