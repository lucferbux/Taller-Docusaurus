---
sidebar_position: 5
---

# Integración Continua

## Action Script

```yaml title=".github/workflows/ci.yml"
# Linter work 

name: CI

# Controls when the workflow will run
on:
  pull_request:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:


# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  test:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    env:
      MONGODB_URI: mongodb://localhost:27017/
        
    services:
      mongodb:
        image: mongo
        env:
          MONGO_INITDB_DATABASE: portfolio_db_test
        ports:
          - 27017:27017

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '17.x'
      - run: npm install
      - run: npm run test
      - run: npm run lint
```

![ci job](../../static/img/tutorial/cicd/6_ci.png)
