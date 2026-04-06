const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasource: {
    url: 'postgres://postgres:1234@localhost:5432/my_app_auth'
  }
});