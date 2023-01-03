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
