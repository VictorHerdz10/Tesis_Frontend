'use client'

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Download, Plus, Info } from "lucide-react"
import ContractForm from "./ContractForm"
import InvoiceForm from "./InvoiceForm"
import ContractInfo from "./ContractInfo"

export default function ContractManager() {
  const [contracts, setContracts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState(() => {})
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [showContractInfo, setShowContractInfo] = useState(false)
  const [filters, setFilters] = useState({
    entidad: '',
    estado: '',
    direccionEjecuta: '',
    valor: { min: '', max: '' },
    valorDisponible: { min: '', max: '' },
    valorGastado: { min: '', max: '' },
  })

  useEffect(() => {
    // Simulating fetching contracts from an API
    const fetchContracts = () => {
      const dummyContracts = [
        {
          id: '1',
          tipo_contrato: 'Servicios',
          objeto_contrato: 'Desarrollo de software',
          entidad: 'Tech Solutions Inc.',
          direccionEjecuta: 'IT',
          aprovadoCC: new Date(2023, 0, 15),
          firmado: new Date(2023, 1, 1),
          entregadoJuridica: new Date(2023, 1, 5),
          fecharecibido: new Date(2023, 1, 10),
          valor: 100000,
          valorDisponible: 50000,
          valorGastado: 50000,
          facturas: [
            { id: '1', numeroDictamen: 'DICT-001', monto: 25000 },
            { id: '2', numeroDictamen: 'DICT-002', monto: 25000 },
          ],
          vigencia: 12,
          vigenciaTipo: 'mes',
          fechaVencimiento: new Date(2024, 1, 1),
          estado: 'Activo',
          numeroDictamen: 'DICT-2023-001',
          pdf: null,
          createdBy: 'John Doe',
          createdAt: new Date(2023, 0, 1),
          modifiedBy: 'Jane Smith',
          modifiedAt: new Date(2023, 6, 1),
        },
      ]
      setContracts(dummyContracts)
    }
    fetchContracts()
  }, [])

  const handleSubmit = (formData) => {
    setShowConfirmDialog(true)
    setConfirmAction(() => () => {
      if (formData.id) {
        // Update existing contract
        setContracts(contracts.map(contract => contract.id === formData.id ? { ...contract, ...formData } : contract))
      } else {
        // Add new contract
        const newContract = {
          ...formData,
          id: Date.now().toString(),
          facturas: [],
          createdBy: 'Current User',
          createdAt: new Date(),
          modifiedBy: 'Current User',
          modifiedAt: new Date(),
        }
        setContracts([...contracts, newContract])
      }
      setShowForm(false)
    })
  }

  const handleDelete = (id) => {
    setShowConfirmDialog(true)
    setConfirmAction(() => () => {
      setContracts(contracts.filter(contract => contract.id !== id))
    })
  }

  const handleAddInvoice = (invoiceData) => {
    setShowConfirmDialog(true)
    setConfirmAction(() => () => {
      if (selectedContract) {
        const newInvoice = {
          ...invoiceData,
          id: Date.now().toString(),
        }
        const updatedContract = {
          ...selectedContract,
          facturas: [...selectedContract.facturas, newInvoice],
          valorGastado: selectedContract.valorGastado + (invoiceData.monto || 0),
          valorDisponible: selectedContract.valorDisponible - (invoiceData.monto || 0),
        }
        setContracts(contracts.map(contract => contract.id === selectedContract.id ? updatedContract : contract))
        setShowInvoiceForm(false)
      }
    })
  }

  const handleEditInvoice = (contractId, invoiceId) => {
    const contract = contracts.find(c => c.id === contractId)
    const invoice = contract?.facturas.find(f => f.id === invoiceId)
    if (contract && invoice) {
      setSelectedContract(contract)
      setShowInvoiceForm(true)
    }
  }

  const handleDeleteInvoice = (contractId, invoiceId) => {
    setShowConfirmDialog(true)
    setConfirmAction(() => () => {
      const updatedContracts = contracts.map(contract => {
        if (contract.id === contractId) {
          const deletedInvoice = contract.facturas.find(f => f.id === invoiceId)
          return {
            ...contract,
            facturas: contract.facturas.filter(f => f.id !== invoiceId),
            valorGastado: contract.valorGastado - (deletedInvoice?.monto || 0),
            valorDisponible: contract.valorDisponible + (deletedInvoice?.monto || 0),
          }
        }
        return contract
      })
      setContracts(updatedContracts)
    })
  }

  const filteredContracts = contracts.filter(contract => {
    return (
      contract.entidad.toLowerCase().includes(filters.entidad.toLowerCase()) &&
      contract.estado.toLowerCase().includes(filters.estado.toLowerCase()) &&
      contract.direccionEjecuta.toLowerCase().includes(filters.direccionEjecuta.toLowerCase()) &&
      (filters.valor.min === '' || contract.valor >= Number(filters.valor.min)) &&
      (filters.valor.max === '' || contract.valor <= Number(filters.valor.max)) &&
      (filters.valorDisponible.min === '' || contract.valorDisponible >= Number(filters.valorDisponible.min)) &&
      (filters.valorDisponible.max === '' || contract.valorDisponible <= Number(filters.valorDisponible.max)) &&
      (filters.valorGastado.min === '' || contract.valorGastado >= Number(filters.valorGastado.min)) &&
      (filters.valorGastado.max === '' || contract.valorGastado <= Number(filters.valorGastado.max))
    )
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contract Manager</h1>
      
      <Button onClick={() => setShowForm(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New Contract
      </Button>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Filter Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filter-entidad">Entidad</Label>
              <Input
                id="filter-entidad"
                value={filters.entidad}
                onChange={(e) => setFilters({ ...filters, entidad: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="filter-estado">Estado</Label>
              <Input
                id="filter-estado"
                value={filters.estado}
                onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="filter-direccion">Dirección que Ejecuta</Label>
              <Input
                id="filter-direccion"
                value={filters.direccionEjecuta}
                onChange={(e) => setFilters({ ...filters, direccionEjecuta: e.target.value })}
              />
            </div>
            <div>
              <Label>Valor</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  value={filters.valor.min}
                  onChange={(e) => setFilters({ ...filters, valor: { ...filters.valor, min: e.target.value } })}
                />
                <Input
                  placeholder="Max"
                  value={filters.valor.max}
                  onChange={(e) => setFilters({ ...filters, valor: { ...filters.valor, max: e.target.value } })}
                />
              </div>
            </div>
            <div>
              <Label>Valor Disponible</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  value={filters.valorDisponible.min}
                  onChange={(e) => setFilters({ ...filters, valorDisponible: { ...filters.valorDisponible, min: e.target.value } })}
                />
                <Input
                  placeholder="Max"
                  value={filters.valorDisponible.max}
                  onChange={(e) => setFilters({ ...filters, valorDisponible: { ...filters.valorDisponible, max: e.target.value } })}
                />
              </div>
            </div>
            <div>
              <Label>Valor Gastado</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  value={filters.valorGastado.min}
                  onChange={(e) => setFilters({ ...filters, valorGastado: { ...filters.valorGastado, min: e.target.value } })}
                />
                <Input
                  placeholder="Max"
                  value={filters.valorGastado.max}
                  onChange={(e) => setFilters({ ...filters, valorGastado: { ...filters.valorGastado, max: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Contrato</TableHead>
            <TableHead>Objeto del Contrato</TableHead>
            <TableHead>Entidad</TableHead>
            <TableHead>Dirección que Ejecuta</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Valor Disponible</TableHead>
            <TableHead>Valor Gastado</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.tipo_contrato}</TableCell>
              <TableCell>{contract.objeto_contrato}</TableCell>
              <TableCell>{contract.entidad}</TableCell>
              <TableCell>{contract.direccionEjecuta}</TableCell>
              <TableCell>{contract.valor.toLocaleString()}</TableCell>
              <TableCell>{contract.valorDisponible.toLocaleString()}</TableCell>
              <TableCell>{contract.valorGastado.toLocaleString()}</TableCell>
              <TableCell>{contract.estado}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => { setSelectedContract(contract); setShowForm(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(contract.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => { setSelectedContract(contract); setShowContractInfo(true); }}>
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => { setSelectedContract(contract); setShowInvoiceForm(true); }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  {contract.pdf && (
                    <Button variant="outline" size="icon" onClick={() => { /* Handle PDF download */ }}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedContract ? 'Edit Contract' : 'Add New Contract'}</DialogTitle>
          </DialogHeader>
          <ContractForm
            initialData={selectedContract}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showInvoiceForm} onOpenChange={setShowInvoiceForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm onSubmit={handleAddInvoice} />
        </DialogContent>
      </Dialog>

      <Dialog open={showContractInfo} onOpenChange={setShowContractInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contract Information</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <ContractInfo
              contract={selectedContract}
              onEditInvoice={handleEditInvoice}
              onDeleteInvoice={handleDeleteInvoice}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue with this action?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onClick={() => { confirmAction(); setShowConfirmDialog(false); }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}