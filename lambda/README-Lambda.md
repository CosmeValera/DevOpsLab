## Lambda

**How to deploy the AWS Lambda function**

1-> First you need to have the node_modules folder.
```sh
npm install
```

2-> Pack into a `zip` folder the following files:
- `index.js`
- `node_modules`
- `package.json`
- `package-lock.json`

3-> And then in the lambda AWS interface select:
- Upload from
- .zip file