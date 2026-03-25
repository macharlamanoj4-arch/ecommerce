export class Profile {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly email: string,
      public readonly address: string,
      public readonly id: string,
      public readonly phone ?: string ,
    ) {}
}
export class User {
    constructor(
      public readonly id: string,
      public readonly username: string,
      public readonly password: string,
      public readonly profile?: Profile,
    ) {}
}