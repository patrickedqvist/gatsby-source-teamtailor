# Gatsby Source Teamtailor
Source plugin for pulling data into [Gatsby.js](https://www.gatsbyjs.org/) from [Teamtailor](https://www.teamtailor.com/), using the Teamtailor [API](https://docs.teamtailor.com/).


## Install

`yarn add gatsby-source-teamtailor`    

`npm install --save gatsby-source-teamtailor`

## How to use

Plugin configuration for `gatsby-config.js`:

```
{
   resolve: `gatsby-source-teamtailor`,
   options: {
       token: `abc123abc123`,
       version: `20161108`
       status: `published`
   }
}
```

`token`
The token is also the api key - authenticate your account when using the API by including your secret API key in the request. [Manage your API keys](https://www.teamtailor.com/app/settings/integrations/api_keys). Replace `abc123abc123` with your own API Key.

`version`
When Teamtailor make backwards-incompatible changes to the API, they release new, dated versions. Replace `20161108` with the version you want to use.

`status`
Filter by job status. Default is "all". Available statuses are: published, unlisted, archived, draft, scheduled and all. Depending on your permission you may not be able to use certain of these statuses. Read more about [Teamtailor Permissions](https://docs.teamtailor.com/#permissions).

## How to query

There are currently only two node type available from Teamtailor: Jobs, Users.

Documentation for the full set of fields made available for each resource type can be
found in the [API docs](https://docs.teamtailor.com/).

**Example Jobs Query**

```
{
  allTeamTailorJob {
    edges {
      node {
        id
        attributes {
            tags
        }
      }
    }
  }
}
```

**Example Users Query**

```
{
  allTeamTailorUser {
    edges {
      node {
        id
        attributes {
          title
          email
          name
        }
      }
    }
  }
}
```



# Copyright & License

Copyright (c) 2020 Patrick Edqvist - Released under the [MIT license](LICENSE).
