# Pravega Docs Repository

This repository holds the online documentation for Pravega and the Pravega open-source ecosystem.

This repository uses [Docusaurus](https://docusaurus.io/) to produce a documentation web site that can be hosted on any web server and viewed in a web browser.

## Documentation Sources

| Name                | Source Repository                                                              |
| ------------------- | ------------------------------------------------------------------------------ |
| Pravega             | https://github.com/pravega/pravega/tree/master/documentation/src/docs          |
| Flink Connectors    | https://github.com/pravega/flink-connectors/tree/master/documentation/src/docs |

The external sources (Pravega, Flink Connectors, etc.) are included in this repository as Git submodules.

## Editing Documentation

### Editing Existing Documents with Github

All documents in the published web sites have a link on the bottom called "Edit this page". This will open a text editor in Github. Github will then provide an option to create a new branch and submit a pull request (PR).

### Editing the Navigation Bar

Each documentation source has a file named [sidebars.js](pravega/documentation/src/docs/sidebars.js) which describes the contents of the navigation bar. This must be edited to add new documents or to reorganize them. Note that the directory structure does not impact the navigation bar but it is recommended to keep them consistent. The `sidebars.js` files can be edited using Github. Be careful editing this file because incorrect formatting or broken links will cause the build to fail.

### Using an IDE

For complex editing tasks, it is recommended to use an IDE such as Visual Studio Code. This will allow you to get feedback within a few seconds of making changes, instead of waiting several minutes for Jenkins to build the site. Use the steps below.

1. Clone Git repos.

    ```shell
    git clone -b dev --recursive https://github.com/claudiofahey/pravega-docs
    cd pravega-docs
    ```

    Tip: If you forget to add `--recursive`, you can pull the submodules with `git submodule update --init`.

2. Install Visual Studio Code and then install the following extensions:
   1. Markdown All in One
   2. MDX
   3. Paste Image
      1. Configure settings:
         1. Paste Image: Path: `${currentFileDir}/images`
      2. Install in Ubuntu: `sudo apt-get install xclip`

3. Configure a Docusaurus local development server for previewing documentation.

   1. Using Docker:

      1. Run the command `./serveLocal.sh`.

        ```shell
        > ./serveLocal.sh
        Sending build context to Docker daemon  3.072kB
        Step 1/1 : FROM node:15.11.0
        ---> 56bc674036dc
        Successfully built 56bc674036dc
        Successfully tagged pravega-docs-builder:latest
        yarn install v1.22.5
        [1/4] Resolving packages...
        success Already up-to-date.
        Done in 0.75s.
        yarn run v1.22.5
        $ docusaurus start -p 7071 -h 0.0.0.0 --no-open
        Starting the development server...
        Docusaurus website is running at: http://localhost:7071/
        ...
        ✔ Client
        Compiled successfully in 175.10ms
        ```

   2. Alternative procedure on Ubuntu without Docker:

      1. Install Node.js and Yarn.

            ```shell
            curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
            sudo apt-get install -y nodejs
            sudo npm install --global yarn
            ```

      2. Start a Docusaurus local development web server.

            ```shell
            cd docs-website
            yarn install
            yarn run start -p 7071 -h 0.0.0.0 --no-open

   3. Open your browser to http://localhost:7071.
      Usually, any changes made to the Markdown files will be displayed in your browser in about one second.
      However, sometimes the automatic update doesn't work and you'll have to repeat steps 2 to 3.

## Reference / Advanced

### Base URL Requirement

When building a Docusaurus web site, it must know the directory part of the published URL. This must be passed as the BASE_URL environment variable. If it is not correct, you will see a "Page Not Found" or baseUrl error when viewing the web site. The script `build-website.sh` sets the appropriate BASE_URL for Jenkins.

When opening the web site from Jenkins, do *not* open the web site associated with a specific build number in the history. You may only open the web site for the latest successful build for each branch.

This also means that it is not possible to extract the docs-site.zip and open the files directly in your browser. A workaround for this is to build with a baseUrl of `/` and run a simple HTTP server with `python3 -m http.server`.

### Build and Serve Documentation Web Site

This will build an entire static web site and then serve it. It can be used to troubleshoot build errors. Note that for live previewing, you should use the `./serveLocal.sh` command instead, as described above.

```shell
cd docs-website
yarn run serve -- --build --port 8008 --host 0.0.0.0
```

### Adding a New Documentation Source

The external sources (Pravega, Flink Connectors, etc.) are included in this repository as Git submodules. For each submodule, there is a soft-link in `docs-website/docs` to the subdirectory in the submodule that contains the Markdown files.

```shell
git submodule add https://github.com/pravega/pravega
cd docs-website/docs
ln -s ../../pravega/documentation/src/docs pravega
```

Edit [docs-website/sidebars.js](docs-website/sidebars.js) and [docs-website/docusaurus.config.js](docs-website/docusaurus.config.js).

### Create a New Site From a Template

For reference, to perform one-time creation of web site scaffold, run the following steps.
This has already been done and it should not be run again.

```shell
npx @docusaurus/init@latest init docs-website classic
```
