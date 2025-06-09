import type { Module } from './types'

export const defaultModules: Module[] = [
  {
    id: 'hero-1',
    type: 'hero',
    props: {
      heading: 'Page.one',
      subheading: 'Genesis Ready.',
    },
  },
  {
    id: 'form-1',
    type: 'form',
    props: {
      title: "Let's talk",
      fields: [
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
        },
      ],
      submitText: 'Send Message',
    },
  },
  {
    id: 'contact-form-1',
    type: 'contact_form',
    props: {
      heading: "Get in Touch",
      subheading: "Let's create something amazing together",
      background: {
        type: 'gradient',
        color: '#000000',
        opacity: 1,
        gradient: {
          from: '#1a1a1a',
          to: '#000000',
          angle: 135
        }
      }
    }
  }
] 