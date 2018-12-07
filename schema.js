exports.typeDefs =`

type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    username: String! @unique
    passwored: String!
    email: String!
    joinDate: String
    favorite: [Recipe]
}

type Query {
    getAllRecipes: [Recipe]
}

`;