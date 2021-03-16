# Pravega Docs Repository

This repository holds the online documentation for Pravega and the Pravega open-source ecosystem.

## Documentation Sources

| Name                | Source Repository                                                              |
| ------------------- | ------------------------------------------------------------------------------ |
| Pravega             | https://github.com/pravega/pravega/tree/master/documentation/src/docs          |
| Flink Connectors    | https://github.com/pravega/flink-connectors/tree/master/documentation/src/docs |

## Recommended Development Environment

1. Clone Git repos.

    ```shell
    git clone -b feature-docusaurus --recursive https://github.com/pravega/pravega-docs
    cd pravega-docs
    ```

2. Visual Studio Code with the following extensions:
   1. Markdown All in One
   2. MDX
   3. Paste Image
      1. Configure settings:
         1. Paste Image: Path: `${currentFileDir}/images`
      2. Install in Ubuntu: `sudo apt-get install xclip`

3. Configure Docusaurus local server for previewing documentation.

   1. Ubuntu:

      1. Install Docusaurus.

            ```shell
            curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
            sudo apt-get install -y nodejs
            sudo npm install --global yarn
            ```

      2. Start development web server.
            ```shell
            cd docs-website
            yarn install
            yarn run start -p 3001
            ```

         Alternatively, to run a browser on another system, use the following command.
            ```shell
            yarn run start -p 3001 -h 0.0.0.0 --no-open
            ```

      3. Open your browser to http://localhost:3000.
         Any changes made to the Markdown files will be displayed in your browser in about one second.

## Docusaurus

This section describes the experimental Docusaurus documentation system.

See also https://v2.docusaurus.io/docs/installation.

See also https://github.com/nodesource/distributions/blob/master/README.md#debinstall.

### Create a New Site From a Template

For reference, to perform one-time creation of web site scaffold, run the following steps.
This has already been done and it should not be run again.

```shell
npx @docusaurus/init@latest init docs-website classic
```

### Add Documentation from a Git Submodule

```shell
git submodule add https://github.com/pravega/pravega
cd docs-website/docs
ln -s ../../pravega/documentation/src/docs pravega
```

Edit `docs-website/sidebars.js` and `docs-website/docusaurus.config.js`.

### Build and Serve Documentation Web Site

```shell
cd docs-website
yarn run serve -- --build --port 8009 --host 0.0.0.0
```
