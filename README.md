# Manage Acronyms and GoLinks

## Introduction

Quick implementation for managing Acronyms and Go Links at one place, using Node.js (& Express/EJS), SqlLite3 and Bootstrap.

Implemented as monolithic app so it can be easiliy setup and run by small groups. Can have database file in a shared location and ensure it's backed up frequently as part of Ops task. For small teams/companies, this may be sufficient.

This web application may be hosted within the intranet of a company and so the company specific Acronyms and Go Links can be maintained at one place. Then this same application helps the users to lookup the acronym definitions by their short name and to follow the go links when referred by thier short name.

By having NO authorization implemented (by default), any employee can help collaborate to build the database of Acronyms and GoLinks specific to the domain of the company, which could greatly help for e.g. the new joinees of the company to quickly lookup and understand various acronyms that they come across.


If the application is hosted by DevOps, for e.g. as `http://service-a.company-b.com` (by default, the code base starts as `http://localhost:8080` in dev environment) then:

* A given acronym for e.g. `PST` can be accessed as `http://service-a.company-b.com/a/PST` which would redirect to `http://service-a.company-b.com/acronyms/view/PST` which in turn displays the expansion form of the acronym  (assuming such mapping exists in the database).
* A given golink for e.g. `enteg` can be accessed as `http://service-a.company-b.com/go/enteg` which would redirect to `https://entegrations.io` (assuming such mapping exists in the databse).


Then, the DevOps can setup a an internal DNS URL redirect to translate for e.g. to `http://service-a.company-b.com/go` from a short name like `go/` so when users just type in the browser's address bar `go/enteg`, it would redirect to `http://service-a.company-b.com/go/enteg`, which would in turn redirect to the underlying long url i.e. `https://entegrations.io`.

If another redirect may be setup to translate for e.g. to `http://service-a.company-b.com/a` from a short name like `acr/` so when users just type in the browser `acr/PST` it would ultimately redirect to `http://service-a.company-b.com/acronyms/view/PST` to show the expanded form of the PST acronym.



## Installation

1. Install all the required dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Navigate to the app:

```
http://localhost:8080/
```

### Using nodemon
```
npm install -g --save-dev nodemon
nodemon index.js
```

## Docker
```
docker build -t manage-acronyms-and-golinks-app .
docker run -dti -p 8080:8080 manage-acronyms-and-golinks-app
```


## TODOs
1. Pagination & Elegant handling of UK violations.
2. Import CSV of acryonyms along with handling duplicates-merging.
3. Export feature as quick backup of the Database. Periodic auto export may be. The export may later be retreived as clean-db during import.
4. Shared mount in Dockerfile
5. Refactor to potentially build plugins for other platforms.
6. Authorization / Audit Trail
7. Other misc. UI features for user convenience


## Misc.

The file acronymsANDgolinks.db is the database that's maintained on the same host as the website and this can be backed up periodically for any restore / recovery operation.
