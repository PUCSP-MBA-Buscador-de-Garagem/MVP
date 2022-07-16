# Project build

Steps to run this project:

1. Run `npm i` command
2. Setup credentials inside `packages/server/credentials.ts` file:

```javascript
export const google = {
  distanceMatrix: {
    apiKey: "YOUR_GOOGLE_API_KEY"
  }
}
```

3. Run `npm start` command on `packages/server`
