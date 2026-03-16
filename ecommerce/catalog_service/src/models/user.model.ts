export class User {
    constructor(
      public readonly username: string,
      public readonly password: string,
      public readonly profile: string,
      public readonly id: string,
    ) {}
  }