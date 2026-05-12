

import { Link } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'
import { SiInstagram } from 'react-icons/si';

const footerLinks = {
  services: [
    { name: 'Coworking', href: '/coworking' },
    { name: 'Incubateur', href: '/incubator' },
    { name: 'Formations', href: '/training' },
    { name: 'Lounge', href: '/lounge' },
  ],
  company: [
    { name: 'À propos', href: '/#about' },
    { name: 'Malea Invest Club', href: '/incubator#investors' },
    { name: 'Jobs Week', href: '/training#jobs-week' },
    { name: 'Bibliothèque sociale', href: '/library' },
    { name: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                <span style={{ color: 'var(--primary)' }}>Malea</span>
                <span style={{ color: 'var(--foreground)' }}> Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Innovation hub connecting entrepreneurs, investors and talents in Douala, Cameroon.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=2PH2+X7X,rue koloko bonapriso,immeubesciDouala,Cameroon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <MapPin className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                Bonapriso, Douala Cameroun
              </a>
              <a
                href="mailto:info@maleahub.com"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <Mail className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                info@maleahub.com
              </a>
              <a
                href="https://instagram.com/maleahub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
              >
                <SiInstagram className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                @maleahub
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              Entreprise
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
              Get Started
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Ready to grow your project or invest in innovation?
            </p>
            <a
              href="https://wa.me/237678111022?text=Bonjour, je souhaite rejoindre l'incubateur Malea Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Join Incubator
            </a>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              &copy; {new Date().getFullYear()} Malea Hub. Tous droits réservés.
            </p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Bonapriso, Douala, Cameroun
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}