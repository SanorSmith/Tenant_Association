import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BudgetItem } from '@/types'

export const useBudgetStore = defineStore('budget', () => {
  const budgetItems = ref<BudgetItem[]>([])

  const totalIncome = computed(() =>
    budgetItems.value
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
  )

  const totalExpenses = computed(() =>
    budgetItems.value
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpenses.value)

  const incomeItems = computed(() =>
    budgetItems.value.filter(item => item.type === 'income')
  )

  const expenseItems = computed(() =>
    budgetItems.value.filter(item => item.type === 'expense')
  )

  const initDemoData = () => {
    budgetItems.value = []
  }

  const addBudgetItem = (item: BudgetItem) => {
    budgetItems.value.unshift(item)
  }

  return {
    budgetItems,
    totalIncome,
    totalExpenses,
    balance,
    incomeItems,
    expenseItems,
    initDemoData,
    addBudgetItem
  }
})
