import { useState } from 'react'
import { NewFood, FixedRow } from './types/newfood'

export default function useFoodState() {
  const [foods, setFoods] = useState<NewFood[]>([])

  const [fixedRows, setFixedRows] = useState<FixedRow[]>([
    {
      id: -1,
      name: '',
      count: 1,
      expiry: new Date().toISOString().split('T')[0],
      category: '冷蔵庫',
      isVisible: true,
    },
    {
      id: -2,
      name: '',
      count: 1,
      expiry: new Date().toISOString().split('T')[0],
      category: '冷蔵庫',
      isVisible: true,
    },
    {
      id: -3,
      name: '',
      count: 1,
      expiry: new Date().toISOString().split('T')[0],
      category: '冷蔵庫',
      isVisible: true,
    },
    {
      id: -4,
      name: '',
      count: 1,
      expiry: new Date().toISOString().split('T')[0],
      category: '冷蔵庫',
      isVisible: true,
    },
  ])

  const deleteFixedRow = (id: number) => {
    setFixedRows(fixedRows.map((row) => (row.id === id ? { ...row, isVisible: false } : row)))
  }

  const updateFixedRow = (id: number, field: string, value: string | number) => {
    setFixedRows(fixedRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const handleAddFood = () => {
    setFoods([
      ...foods,
      {
        id: -Date.now(),
        name: '',
        count: 1,
        expiry: new Date().toISOString().split('T')[0],
        category: '冷蔵庫',
      },
    ])
  }

  const removeFoodLocally = (id: number) => setFoods(foods.filter((food) => food.id !== id))

  return {
    foods,
    fixedRows,
    setFixedRows,
    deleteFixedRow,
    handleAddFood,
    removeFoodLocally,
    updateFixedRow,
    setFoods,
  }
}
