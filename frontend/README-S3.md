**To upload the frontend to S3 you have 2 options**
- Merge a branch to main or push a commit to main
- Execute the command: `npm run deploy`

**Why?**

The command `npm run deploy` 1) builds the project and then 2) synchronizes the S3 files to contain the updated repo commits.
There is also a `.github/workflows/deploy.yml` file, configured so that Github Actions automatically detects if there is a merge or a commit to main, and triggers the npm run deploy with an ubuntu machine.