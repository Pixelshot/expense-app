import { prisma } from './database.server';

// === === === === === EXPENSES CRUD OPERATIONS === === === === ===

export async function addExpense(expenseData, userId) {
  //expenseData is coming from <ExpenseForm>
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, // Even though the type has been defined as number in <Form>, data that we get from a form will always return in string format. This is why we're converting amount to number with the plus sign at the beginning
        date: new Date(expenseData.date),
        User: { connect: { id: userId } }, // This line tells prisma that the creation of the expense should be connected to the existing user with the given id.
      },
    });
  } catch (error) {
    throw new Error('Failed to add expense.');
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error('Failed to get expenses.');
  }
  // Use .findMany() by Prisma to extract all data
  // If no argument is passed inside of .findMany() then Prisma will simply return all data
  // It's based off key/value pair since it's an object
  // Here we're using orderBy key option to return data based on newest to oldest date
  try {
    return prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    throw new Error('Failed to get expenses.');
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (error) {
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error('Failed to updated expense.');
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete expense.');
  }
}
