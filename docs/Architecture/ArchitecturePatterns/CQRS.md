# CQRS
CQRS stands for Command Query Responsibility Segregation. It's a pattern that I first heard described by Greg Young. At its heart is the notion that you can use a different model to update information than the model you use to read information. For some situations, this separation can be valuable, but beware that for most systems CQRS adds risky complexity.

![cqrs.png](cqrs.png)

![cqrs-should-i-use.png](cqrs-should-i-use.png)
