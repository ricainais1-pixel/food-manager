'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Item } from '../types/types'

const supabase = createClient()

export default function useShopping() {
  const [draftItems, setDraftItems] = useState<Item[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [originalItem, setOriginalItem] = useState<Item | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('shopping_list')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.log(error)
        return
      }

      setItems(data ?? [])
    }

    fetchItems()
  }, [])

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      count: 1,
      category: '',
    }
    setDraftItems([...draftItems, newItem])
  }

  const handleSave = async (draft: Item) => {
    const { data: authData } = await supabase.auth.getUser()
    const user = authData.user

    if (!user) return

    if (!draft.name.trim()) {
      alert('食材名を入力してください')
      return
    }

    const { error } = await supabase.from('shopping_list').insert({
      user_id: user.id,
      name: draft.name,
      count: draft.count,
      category: draft.category || null,
    })

    if (error) {
      console.log(error)
      alert('保存失敗')
      return
    }

    const { data } = await supabase.from('shopping_list').select('*').eq('user_id', user.id)

    setItems(data ?? [])
    setDraftItems(draftItems.filter((item) => item.id !== draft.id))
  }

  const handleDraftNameChange = (id: number, value: string) => {
    setDraftItems(draftItems.map((item) => (item.id === id ? { ...item, name: value } : item)))
  }

  const handleDraftCountChange = (id: number, value: number) => {
    setDraftItems(draftItems.map((item) => (item.id === id ? { ...item, count: value } : item)))
  }

  const handleDraftCategoryChange = (id: number, value: string) => {
    setDraftItems(draftItems.map((item) => (item.id === id ? { ...item, category: value } : item)))
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('shopping_list').delete().eq('id', id)

    if (error) {
      console.log(error)
      return
    }

    setItems(items.filter((item) => item.id !== id))
  }

  const handleDraftDelete = (id: number) => {
    setDraftItems(draftItems.filter((item) => item.id !== id))
  }

  const handleCountChange = (id: number, value: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, count: value } : i)))
  }

  const handleUpdate = async (item: Item) => {
    const { error } = await supabase
      .from('shopping_list')
      .update({
        name: item.name,
        count: item.count,
        category: item.category,
      })
      .eq('id', item.id)

    if (error) {
      console.log(error)
      return
    }

    setEditingId(null)
  }

  const handleCategoryChange = (id: number, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, category: value } : i)))
  }

  const handleEditCountChange = (id: number, value: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, count: value } : i)))
  }

  const handleNameChange = (id: number, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, name: value } : i)))
  }

  const handleCancel = () => {
    if (!originalItem) return

    setItems((prev) => prev.map((i) => (i.id === originalItem.id ? originalItem : i)))

    setEditingId(null)
    setOriginalItem(null)
  }

  return {
    items,
    draftItems,
    editingId,
    originalItem,
    setEditingId,
    setOriginalItem,
    handleAdd,
    handleSave,
    handleDraftNameChange,
    handleDraftCountChange,
    handleDraftCategoryChange,
    handleDraftDelete,
    handleCountChange,
    handleNameChange,
    handleCategoryChange,
    handleEditCountChange,
    handleUpdate,
    handleDelete,
    handleCancel,
  }
}
