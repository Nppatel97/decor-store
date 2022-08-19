export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      // media: "profilePic",
    },
  },
};
