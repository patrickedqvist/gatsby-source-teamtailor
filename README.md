# Gatsby Source Teamtailor
Source plugin for pulling data into [Gatsby.js](https://www.gatsbyjs.org/) from [Teamtailor](https://www.teamtailor.com/), using the Teamtailor [API](https://docs.teamtailor.com/).


## Install

**yarn**
`yarn add gatsby-source-teamtailor`

**npm**
`npm install --save gatsby-source-teamtailor`

## How to use

Plugin configuration for `gatsby-config.js`:

```
{
   resolve: `gatsby-source-teamtailor`,
   options: {
       token: `abc123abc123`,
       version: `20161108`
   }
}
```

`token`
The token is also the api key - authenticate your account when using the API by including your secret API key in the request. [Manage your API keys](https://www.teamtailor.com/app/settings/integrations/api_keys). Replace `abc123abc123` with your own API Key.

`version`
When Teamtailor make backwards-incompatible changes to the API, they release new, dated versions. Replace `20161108` with the version you want to use.


## How to query

There are currently only one node type available from Teamtailor: Jobs.

Documentation for the full set of fields made available for each resource type can be
found in the [API docs](https://docs.teamtailor.com/).

**Example Post Query**

```
{
  allGhostPost(sort: { order: DESC, fields: [published_at] }) {
    edges {
      node {
        id
        slug
        title
        html
        published_at
        ...
        tags {
          id
          slug
          ...
        }
        primary_tag {
          id
          slug
          ...
        }
        authors {
          id
          slug
          ...
        }
      }
    }
  }
}
```

# Copyright & License

Copyright (c) 2020 Patrick Edqvist - Released under the [MIT license](LICENSE).