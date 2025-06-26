'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import Skeleton from '@/components/Skeleton'
import { CustomTable } from '@/components/Table'
import { CaseOption, CaseType } from '@/features/services/api/types'

export default function ServicesAdmin() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<CaseOption[]>([{ title: '', text: '' }])
  const [services, setServices] = useState<CaseType[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cases')
      const json = await res.json()
      if (Array.isArray(json.cases)) {
        setServices(json.cases)
      } else {
        setServices([])
        alert('Ошибка: неожиданный формат данных')
      }
    } catch (err) {
      console.error('Failed to fetch services:', err)
      alert('Ошибка при загрузке услуг')
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => {
    setModalOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setOptions([{ title: '', text: '' }])
  }

  const handleOptionChange = (index: number, field: keyof CaseOption, value: string) => {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
  }

  const addOption = () => setOptions([...options, { title: '', text: '' }])

  const removeOption = (index: number) =>
    setOptions((opts) => opts.filter((_, i) => i !== index) || [{ title: '', text: '' }])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options }),
      })

      if (res.ok) {
        alert('Кейс успешно добавлен.')
      } else {
        const errorData = await res.json()
        alert(`Ошибка при добавлении кейса: ${errorData.error || res.statusText}`)
      }
    } catch (err) {
      console.error('Ошибка при отправке данных:', err)
      alert('Не удалось добавить кейс.')
    } finally {
      closeModal()
      fetchServices()
    }
  }

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/cases?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('Кейс успешно удален.')
      } else {
        const errorData = await res.json()
        alert(`Ошибка при удалении кейса: ${errorData.error || res.statusText}`)
      }
    } catch (err) {
      console.error('Ошибка при удалении кейса:', err)
      alert('Не удалось удалить кейс.')
    } finally {
      fetchServices()
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">Услуги</h1>
        <button className="p-4 bg-blue-500 rounded-xl text-white" onClick={openModal}>
          Добавить
        </button>
      </div>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
            {options.map((opt, i) => (
              <div key={i} className="flex flex-col gap-2 border p-2 rounded bg-gray-50">
                <input
                  type="text"
                  placeholder="Заголовок"
                  value={opt.title}
                  onChange={(e) => handleOptionChange(i, 'title', e.target.value)}
                  className="border px-3 py-2 rounded"
                  required
                />
                <textarea
                  placeholder="Описание"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(i, 'text', e.target.value)}
                  className="border px-3 py-2 rounded"
                  required
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="text-sm text-red-500 self-end"
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addOption}
              className="bg-gray-200 py-1 px-2 rounded text-sm self-start"
            >
              Добавить поле
            </button>

            <button
              type="submit"
              disabled={options.some((o) => !o.title || !o.text)}
              className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              Сохранить
            </button>
          </form>
        </Modal>
      )}

      {loading ? (
        <Skeleton width="100%" height={100} />
      ) : services.length > 0 ? (
        <CustomTable
          data={services}
          columns={[
            {
              header: 'ID',
              render: (r) => r.id,
            },
            {
              header: 'Опции',
              render: (r) => (
                <ul className="text-sm space-y-1">
                  {r.options.map((opt, idx) => (
                    <li key={idx}>
                      <strong>{opt.title}:</strong> {opt.text}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              header: 'Действие',
              render: (r) => (
                <button
                  className="bg-red-500 p-2 text-white rounded-xl"
                  onClick={() => remove(r.id)}
                >
                  Удалить
                </button>
              ),
            },
          ]}
        />
      ) : (
        <p className="text-gray-500 text-center">Нет данных</p>
      )}
    </div>
  )
}
