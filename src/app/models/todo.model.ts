export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
