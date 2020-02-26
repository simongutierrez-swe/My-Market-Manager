<p align="center">
  <img src="./public/icon.gif" height=200 width=200>
</p>

# My-Market-Manager

Welcome to My-Market-Manager a web app that allows users to buy stock and are visually able to see how they are doing in real time. Each user will have access to a portfolio to view stock progress and transactions for a full ledger of thier stock history. This app was made using react, redux, and firestore.


### Setting Up Dev Environment:

- Clone the repo and `npm install` the dependencies.
- Create a Firebase project.
- Set the Firestore db rules to the following rules:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	allow create
      allow read: if request.auth.uid != null
      allow write: if request.auth.uid == userId
    }
    match /notifications/{notifications} {
      allow read: if request.auth.uid != null
    }
  }
}
```

- Fill in your actual keys in `src/config/`.
- Create a secrets file to import your API key and fireStore Config info.
- `npm run start` will run in a dev environment.

Deploy Link: (https://my-market-manager.web.app/signin)