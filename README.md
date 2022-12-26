# myJar

myJar is a platform for writers to share their thoughts, experiences, and expertise on a wide range of topics. We aim to provide valuable and informative content that helps our readers learn, grow, and enjoy life to the fullest. We provide a space for readers and writers to connect and share their stories and passions.

[LIVE DEMO](https://myjar-8ff23.web.app/)

<p align="center">  
<img src="https://raw.githubusercontent.com/otto-camp/myJar/master/image/dl.png" width="45%" height="auto">
<img src="https://raw.githubusercontent.com/otto-camp/myJar/master/image/dd.png" width="45%" height="auto">
</p>

## Roadmap

- [x]  Set up a development environment
    - Choose Firebase as BaaS.
    - Choose Bootstrap for styling and components.
- [x]  Implement core functionality
    - Develop core features from Firebase like these
        - Authentication, Firestore, and Storage.
    -  Integrate ESLint, and Prettier to create coding standards and practices.
    - Migrate from JavaScript to TypeScript.
- [x]  Launch project
    - Add Google Analytics to monitor and gather feedback.
    - Improve SEO performance by creating specific meta tags for each page.
- [x]  Migrate new component library
    - Add a dark theme.
    - Replace all Bootstrap and custom CSS components with Mantine components.
- [ ]  Implement additional features and enhancements
    - Add a settings section for user preferences.
    - Develop image optimization.
    - Implement new editor extensions.



## Tech stack

- [React](https://beta.reactjs.org/) : A JavaScript library for building user interfaces with reusable components.,

- [React Router](https://reactrouter.com/en/main): A library for declarative routing in React applications.,

- [Firebase](https://firebase.google.com/): A platform for building mobile and web applications, with a range of backend services including authentication, databases, storage, and more., 

- [Mantine](https://mantine.dev/): Mantine is a React components library focused on providing great user and developer experience. ,

- [Tiptap](https://tiptap.dev/): The headless editor framework for web artisans,

- [React Helmet Async](https://github.com/staylor/react-helmet-async): A library for managing the document head in React applications, with support for asynchronous rendering.

## Installation

Clone Project

```bash
  git clone https://github.com/otto-camp/myJar.git
```

Go to project's directory

```bash
  cd myJar
```

Install necessary packages

```bash
  npm install
```


### Firebase Credentials

Create `.env` file in myJar/ directory

```
REACT_APP_FIREBASE_API_KEY="YOUR_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_KEY"
REACT_APP_FIREBASE_PROJECT_ID="YOUR_KEY"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_KEY"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_KEY"
REACT_APP_FIREBASE_APP_ID="YOUR_KEY"
```

Run the app

```bash
  npm start
```


  