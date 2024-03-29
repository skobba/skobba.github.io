# ORM
Object-Relational Mapping is the process of mapping between objects and relational database systems.
ORM helps you maintain objects even when the sources and apps they access change over time.
ORM is commonly used to streamline the migration of data between databases.

When used properly, ORM enables you to:
* Version control on the database and abillity to checkout a specific version
* Avoid redundant code
* Easily switch between databases
* Query for multiple tables (ORM converts the object-oriented query approach to SQL)
* Focus more on business logic and less on writing interfaces

Caveats:
* How does your ORM handle N+1 problem, most ORMs have multiple ways to prevent the N+1 problem
* https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/#whatisorminnodejs
