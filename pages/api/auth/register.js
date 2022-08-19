// // import axios from "axios";
// import sanityClient, { config } from "../../../lib/config";
// // import { signToken } from "../../../lib/auth";

// const client = {
//   dataset: config.dataset,
//   projectId: config.projectId,
//   token: config.token,
// };

// export default handler = async (event) => {

//   const {name, email} = JSON.parse(event.body);

//   sanityClient.

// return {
//   statusCode: 200,
//   body: JSON.stringify({
//     name: '',
//     email: '',
//   })
// }
// };

// // const handler = nextConnect();

// // handler.post(async (req, res) => {
// //   const dataset = config.dataset;
// //   const projectId = config.projectId;
// //   const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
// //   const createMutations = [
// //     {
// //       create: {
// //         _type: "user",
// //         name: req.body.name,
// //         email: req.body.email,
// //         isAdmin: false,
// //       },
// //     },
// //   ];
// //   const { data } = axios.post(
// //     `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
// //     {
// //       headers: {
// //         "Content-type": "application/json",
// //         Authorization: `Bearer ${tokenWithWriteAccess}`,
// //       },
// //     }
// //   );
// //   const userId = data.res[0].id;
// //   const user = {
// //     _id: userId,
// //     name: req.body.name,
// //     email: req.body.email,
// //     isAdmin: false,
// //   };
// //   const token = signToken(user);
// //   res.send({ ...user, token });
// // });

// // export default handler;
