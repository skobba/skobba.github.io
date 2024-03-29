# AppSync
* [AppSync Velocity Templates Guide](https://gerard-sans.medium.com/aws-appsync-velocity-templates-guide-55b9d2bff053)

GraphQL based and supports 5 data sources:
* HTTP
* DynamoDB (NoSQL)
* RDS (Aurora Serverless, SQL)
* ElasticSearch
* Lambda

## Basic Schema
```gql
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
# input AMPLIFY { globalAuthRule: AuthRule = { allow: public } } # FOR TESTING ONLY!

type Post
  @model
  @auth(
    rules: [
      # Owner can perform any action on their own Post
      { allow: owner, operations: [create, update, delete, read] }
      # Other signed in users can read everyones posts
      { allow: private, operations: [read] }
      # Non-signed in users (guests) can read everyones posts as well.
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  title: String!
  comments: [Comment] @hasMany
  votes: [Vote!]! @hasMany
}

type Comment
  @model
  @auth(
    rules: [
      { allow: owner, operations: [create, update, delete, read] }
      { allow: private, operations: [read] }
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  post: Post @belongsTo
  content: String!
}

type Vote
  @model
  @auth(
    rules: [
      { allow: owner, operations: [create, update, delete, read] }
      { allow: private, operations: [read] }
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  vote: String!
  post: Post @belongsTo
}
``` 
