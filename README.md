# How do I start developing with PO Adaptive Network Project?

Just fork the repository and run the below commands on you machine.

##Using Docker:
Note that Docker installation running propertly will be needed inside the computer to execute these commands.

Command to build PO Adaptive Network docker image:
```
docker build --build-arg GH_TOKEN -t microapp .
or
npm run docker:build
```

Command to run PO Sample Adaptive Network docker image:
```
docker run -it --rm --cap-add=SYS_ADMIN --name microapp-run -v ${PWD}:/po-adaptive-network -p 9090:9090 microapp bash ./docker-run.sh
or
npm run docker:start
```
(docker-run.sh should have LF as end of line on Windows environments)

After these commands, the project will be available for developing on http://localhost:9090 .

##Using YARN:
Note that Node v8.12.0 and YARN installations will be needed inside the computer.

Commands to install globally vue-cli libraries:
```
npm install @vue/cli --global
```

Command to install PO Adaptive Network dependencies and serve for developing on http://localhost:9090 :
```
npm install
npm run serve
```

## How can I run prettier on the project?
```
npm run prettier
```

## How can I generate the library for Shell-UI project?
```
npm run build:library
```
This command also generates package.json for the library (package-library.json). To generate this file, it is necessary previously, install jq and yajl.

yajl library is necessary to give format package.json. And jq library it is necessary to obtain information on the original package.json

## How can I export my own component for sharing it?
```
npm run build:component --name <<componentName>> --dest <<outputFolder>>

ex: npm run build:component --name componentSample --dest output-component
```
Please note that we need to indicate on component-library.ts file which component or components we would like to export as a library.

## Want to know more?
All the latest documentation on how to develop and use the MicroApps can be found in README files at [po-enterprise-shell](https://github.com/CenturyLinkCloud/po-enterprise-shell) repository.
