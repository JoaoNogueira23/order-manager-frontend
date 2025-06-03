'use client'

import { useState } from 'react'

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export interface Product {
  id_product: string
  name: string
  price: number
  voulume: number
  describe: string
  isactive: boolean
  Ispromotion: boolean
  url_image: string
  category: 'Bebidas' | 'Sobremesa' | 'Aperitivos'
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (product: Product) => void
}

export default function ProductModal({ isOpen, onClose, onCreate }: ProductModalProps) {
  /* const [form, setForm] = useState<Omit<Product, 'id_product'>>({
    name: '',
    price: 0,
    voulume: 0,
    describe: '',
    isactive: true,
    Ispromotion: false,
    url_image: '',
    category: 'Bebidas',
  }) */

  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(newValue as string) : newValue,
    }))
  }

  const handleSubmit = () => {
    const newProduct: Product = {
      id_product: crypto.randomUUID(),
      ...form,
    }
    onCreate(newProduct)
    onClose()
  } */

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" defaultValue="Pedro Duarte" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="@peduarte" />
          </fieldset>
          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
