interface Environment {
  emailjs: {
    serviceId: string | undefined
    templateId: string | undefined
    publicKey: string | undefined
  }
  isProduction: boolean
  isDevelopment: boolean
}

export const env: Environment = {
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
}

// Validate variables inside development mode
if (env.isDevelopment) {
  if (!env.emailjs.serviceId || !env.emailjs.templateId || !env.emailjs.publicKey) {
    console.warn(
      '[Diagnostics Engine]: EmailJS variables missing. Contact form will execute in mock-simulation mode.'
    )
  }
}
