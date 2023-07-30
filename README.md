# TodoAppChallenge

On this project i have used 3 design patterens

1. Singleton pattern : I use singleton to ensure that there's only one instance of the TodoService throughout the application, allowing all components to share the same instance and access the same data.
2. Observable pattern: I use Observable pattern with RxJS to handle asynchronous operations, like when fetching todos from a server or notifying components about changes in todo data.
3. Strategy Pattern: I use Strategy patteren to implement filtering mechanism on the todo app.

For unit testing i have used jasmin and for e2e testing i have used cypress

To run `ng server`
To run unit test `ng test`
To run e2e test `ng e2e`