<center> <h1 align="center"><a href="https://ignitia-website.vercel.app/"> Ignitia</a> </h1></center>
<p align="center">
<img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,ts" />
<br/>
<a href=""><kbd>⚫️ shadcn-ui</kbd></a> <a href=""><kbd>🟡 drizzle</kbd></a> <a href=""><kbd>🔵 better-auth</kbd></a> <a href=""><kbd>🟠 neon</kbd></a>
</p>


# ⚡What is Ignitia?

Ignitia is a comprehensive web platform designed to provide a hub for student startup ideas, made for the design championship competition 25'.
This service offers idea sharing, community feedback, student profiles, and startup analytics, all presented in an intuitive and aesthetic user interface.

# 🔥Features

- Real-time sharing and discovery of startup ideas from students worldwide.
- Detailed user profiles with idea portfolios and community engagement metrics.
- Interactive star system for rating and bookmarking favorite ideas.
- Custom idea submission forms with rich text descriptions and tagging.
- Minimalistic interface that focuses on creativity and inspiration.
- User authentication and secure data management.
- Community-driven feedback and collaboration tools.

## 🍄 Philosophy

This project aims to be a simple and easy-to-use platform for student entrepreneurs and innovators. We focus on providing essential features that are polished and user-friendly.
We strive to keep the project lightweight and efficient, ensuring that hosting is as cheap and simple as possible.
All ideas are stored securely with proper authentication, ensuring that users have a safe space to share their creative concepts.

## ⚠️ Limitations

Database queries can be heavy when loading multiple ideas with user data and engagement metrics.
Authentication relies on external providers which may impact offline functionality.

# 🧬 Self Hosting Guide

To host the Ignitia web app yourself, follow these steps:

1. **Clone the Repository**:

```
git clone https://github.com/avalynndev/ignitia.git
cd ignitia
```

2. **Install Dependencies**:

```
bun install
```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory of the project. You'll need the following environment variables:

```
NEXT_PUBLIC_DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

4. **Set Up Database**:

```
bunx drizzle-kit push
```

5. **Run the Development Server**:

```
bun run dev
```

6. **Build for Production**:

```
bun run build
```

7. **Start the Production Server**:

```
bun start
```

8. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000` to see the application running locally.

> [!NOTE]
> Ensure you have Node.js version 20+ and Bun installed on your machine. Refer to the [Installing Node.js](#installing-nodejs) section for guidance on how to install Node.js.

By following these steps, you can host the Ignitia web app on your own server and make it accessible to users.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Favalynndev%2Fignitia)

## 🥔 Installing Node.js

To install Node.js, follow these steps:

1. **Download Node.js**: Visit the [Node.js download page](https://nodejs.org/) and download the installer for your operating system.
2. **Run the Installer**: Open the downloaded file and follow the installation instructions.
3. **Verify Installation**: Open a terminal or command prompt and run the following commands to verify the installation:

```
node -v
bun -v
```

## 📄 Pages

- [/](https://ignitia-website.vercel.app/)
- [/about](https://ignitia-website.vercel.app/about)
- [/explore](https://ignitia-website.vercel.app/explore)
- [/submit](https://ignitia-website.vercel.app/submit)
- [/stars](https://ignitia-website.vercel.app/stars)
- [/auth/sign-in](https://ignitia-website.vercel.app/auth/sign-in)
- [/auth/sign-up](https://ignitia-website.vercel.app/auth/sign-up)
- [/profile/[username]](https://ignitia-website.vercel.app/profile)
- [/idea/[id]](https://ignitia-website.vercel.app/idea)
- [/account/settings](https://ignitia-website.vercel.app/account/settings)

## 🤝 Thanks to all Contributors

This project would not be possible without our amazing contributors and the community. Thanks a lot! Keep rocking 🍻.

- avalynndev -> main developer

## 📝 Notes and Credits

- Packages used can be viewed in `package.json`, the packages utilize modern web technologies including Next.js 15, React 19, and Drizzle ORM
- Database schema is defined in `/schema/index.ts` with tables for users, ideas, comments, stars, and authentication
- This project utilizes shadcn-ui component library, to make some of the components present in `/components/ui` dir
- Authentication is handled by Better Auth with support for multiple providers
- Database is powered by Neon (PostgreSQL) for reliable and scalable data storage
- For generating favicons this project used [realfavicongenerator](https://realfavicongenerator.net/)
- This project focuses on student entrepreneurship and was built for educational competition purposes
