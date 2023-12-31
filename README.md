## Welcome

This is a basic Next.js application that lets users log in using:

- Credentials (email and password)
- Google
- GitHub

I've used MongoDB for storing the users and accounts. In the code, I've written lots of comments to make it easy to understand what each part does, helpful for anyone looking at it later.

This repository was based on: https://www.youtube.com/watch?v=PrdbyNYq-z4

## What I used

Authentication: [Next Auth](https://next-auth.js.org/)

Toast notifications: [react-hot-toast](https://react-hot-toast.com/)

Styling: [TailwindCSS](tailwindcss.com) (I also used their sign in form component)

## Understanding callbacks

When we use the credentials provider we have the following callbacks in the following order.

1. Authorize function is called
2. JWT callback func tion is called
3. Session callback function is called

## Misc things to remember

When you update your `schema.prisma` file, remember to stop your development server and run `npx prisma generate`

## Extra features

On the `/login-google`` page, I've set up a Google login example that uses a popup. This method is great for keeping users on the same page, avoiding the typical redirect process.

It's a straightforward yet effective way to handle logins, ensuring users don't lose their current page context.
