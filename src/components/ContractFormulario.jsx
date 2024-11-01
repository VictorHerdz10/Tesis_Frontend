import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function ContractForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date })
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({ ...formData, pdf: e.target.files[0] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="tipo_contrato">Tipo de Contrato</Label>
          <Input
            id="tipo_contrato"
            name="tipo_contrato"
            value={formData.tipo_contrato || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="objeto_contrato">Objeto del Contrato</Label>
          <Textarea
            id="objeto_contrato"
            name="objeto_contrato"
            value={formData.objeto_contrato || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="entidad">Entidad</Label>
          <Input
            id="entidad"
            name="entidad"
            value={formData.entidad || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="direccionEjecuta">Dirección que Ejecuta</Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, direccionEjecuta: value })}
            value={formData.direccionEjecuta}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="aprovadoCC">Aprobado por el CC</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.aprovadoCC && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.aprovadoCC ? format(formData.aprovadoCC, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.aprovadoCC}
                onSelect={(date) => handleDateChange(date, 'aprovadoCC')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="firmado">Firmado</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.firmado && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.firmado ? format(formData.firmado, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.firmado}
                onSelect={(date) => handleDateChange(date, 'firmado')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="entregadoJuridica">Entregado a Jurídica</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.entregadoJuridica && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.entregadoJuridica ? format(formData.entregadoJuridica, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.entregadoJuridica}
                onSelect={(date) => handleDateChange(date, 'entregadoJuridica')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="fecharecibido">Fecha Recibido</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.fecharecibido && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.fecharecibido ? format(formData.fecharecibido, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.fecharecibido}
                onSelect={(date) => handleDateChange(date, 'fecharecibido')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="valor">Valor</Label>
          <Input
            id="valor"
            name="valor"
            type="number"
            value={formData.valor || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="vigencia">Vigencia</Label>
            <Input
              id="vigencia"
              name="vigencia"
              type="number"
              value={formData.vigencia || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <Label htmlFor="vigenciaTipo">Tipo</Label>
            <Select
              onValueChange={(value) => setFormData({ ...formData, vigenciaTipo: value })}
              value={formData.vigenciaTipo}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dia">Día</SelectItem>
                <SelectItem value="mes">Mes</SelectItem>
                <SelectItem value="año">Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, estado: value })}
            value={formData.estado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="numeroDictamen">Número de Dictamen</Label>
          <Input
            id="numeroDictamen"
            name="numeroDictamen"
            value={formData.numeroDictamen || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="pdf">Subir PDF</Label>
          <Input
            id="pdf"
            name="pdf"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <Button type="submit">Save Contract</Button>
    </form>
  )
}