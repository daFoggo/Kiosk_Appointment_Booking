'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

import { Button } from "@/components/ui/button"
import { IAppointmentQRProps } from '@/models/AppointmentQR/type'

export default function AppointmentQR({ appointment }: IAppointmentQRProps) {
  const [qrValue, setQrValue] = useState('')

  useEffect(() => {
    const fakeQRValue = `APPT-${appointment.id}-${appointment.staff.name}-${new Date(appointment.datetime).toISOString()}`
    setQrValue(fakeQRValue)
  }, [appointment])

  const handleDownload = () => {
    const svg = document.getElementById('appointment-qr')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `appointment-qr-${appointment.id}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full font-inter gap-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Mã QR cuộc hẹn</h2>
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-violet-400">
        <QRCodeSVG
          id="appointment-qr"
          value={qrValue}
          size={150}
          level="H"
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-500 text-center px-2 sm:px-0 font-semibold">
        Đưa mã QR này cho camera của Kiosk để có thể liên hệ với người được hẹn 
      </p>
      <Button onClick={handleDownload} className=" bg-indigo-400 hover:bg-indigo-500 text-white text-sm sm:text-base font-semibold">
        Tải xuống mã QR
      </Button>
    </div>
  )
}