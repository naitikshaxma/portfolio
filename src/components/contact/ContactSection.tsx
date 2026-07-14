import { useState } from 'react'
import { useSystemStore } from '@/app/store/useSystemStore'
import { Input, Textarea } from '@/shared/Input'
import { Button } from '@/shared/Button'
import { trackEvent } from '@/utils/analytics'

export function ContactSection() {
  const addToast = useSystemStore((state) => state.addToast)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // spam prevention
  })
  
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      addToast('Message flagged as spam', 'error')
      return
    }

    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields', 'warning')
      return
    }

    setIsLoading(true)
    trackEvent('contact_submit_attempt', { email: formData.email })

    try {
      // Simulate API endpoint dispatch delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      addToast('Message dispatched successfully', 'success')
      trackEvent('contact_submit_success')
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' })
    } catch {
      addToast('Failed to dispatch message', 'error')
      trackEvent('contact_submit_error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id="contact" className="w-full text-white space-y-12 select-none">
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-display-md font-bold tracking-tight font-display">Get In Touch</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          CONTACT // CONNECTION // DISPATCH CORE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-[#11141a]/60 border border-[#2b303c]/60 rounded-2xl p-6 shadow-xl relative">
          {/* Honeypot field (hidden from screen reader and screen) */}
          <div className="absolute opacity-0 pointer-events-none -z-10 h-0 overflow-hidden">
            <label htmlFor="honeypot">If you see this, leave it blank</label>
            <input
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              label="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <div className="space-y-1">
            <Textarea
              name="message"
              label="Message *"
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              required
            />
            <div className="text-right text-[10px] font-mono text-gray-500">
              {formData.message.length} / 500 CHARS
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-xs uppercase tracking-wider"
            isLoading={isLoading}
          >
            DISPATCH MESSAGE
          </Button>
        </form>

        {/* Right Info Column */}
        <div className="lg:col-span-5 border border-[#2b303c] bg-[#11141a]/65 backdrop-blur-md rounded-xl p-6 font-mono text-xs text-gray-400 space-y-4 shadow-xl select-none">
          <div className="flex justify-between items-center pb-2 border-b border-[#2b303c]">
            <span className="font-bold text-[#00b4d8] tracking-widest text-[9px]">CONNECTION METRICS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b4d8] animate-pulse" />
          </div>

          <div className="space-y-4 text-[10px] uppercase">
            <div>
              <span className="text-gray-500 block text-[9px] mb-0.5">EMAIL:</span>
              <a href="mailto:sharmanaitik8113@gmail.com" className="text-[#00b4d8] hover:underline select-text normal-case">
                sharmanaitik8113@gmail.com
              </a>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] mb-0.5">PHONE:</span>
              <span className="text-white select-text">+91 7409643155</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] mb-0.5">LOCATION:</span>
              <span className="text-white">AGRA, INDIA</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] mb-0.5">AVAILABILITY:</span>
              <span className="text-white">OPEN TO ROLES / CONTRACTS</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[9px] mb-0.5">RESPONSE_TIME:</span>
              <span className="text-green-400 font-bold">WITHIN 24 HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export {}
