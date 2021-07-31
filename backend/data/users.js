import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "razer",
    email: "razer@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    name: "che",
    email: "che@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export default users;
