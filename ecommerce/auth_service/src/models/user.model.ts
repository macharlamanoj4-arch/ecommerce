export class Profile {
    constructor(
      public readonly id: string,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly email: string,
      public readonly address?: string,
      public readonly phone ?: string ,
      public readonly image ?: string ,
    ) {}
}
export class Token {
    constructor(
      public readonly id: string,
      public readonly userId: string,
      public readonly type: string,
      public readonly token: string,
      public readonly blacklisted?: boolean,
    ) {}
}
export class User {
    constructor(
      public readonly id: string,
      public readonly username: string,
      public readonly password: string,
      public readonly email: string,
      public readonly profile?: Profile,
      public readonly token?: Token[],
    ) {}
}