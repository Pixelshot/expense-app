import { prisma } from './database.server';

export async function addExpense(expenseData) {
  //expenseData is coming from add.jsx
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses() {
  // Use .findMany() by Prisma to extract all data
  // If no argument is passed inside of .findMany() then Prisma will simply return all data
  // Here we're using orderBy key option to return data based of newest to oldest date
  // orderBy is a key option provided by Prisma
  // It's based off key/value since it's in an object
  try {
    return prisma.expense.findMany({ orderBy: { date: 'desc' } });
  } catch (error) {
    console.log(error);
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (error) {
    console.log(error);
  }
}
